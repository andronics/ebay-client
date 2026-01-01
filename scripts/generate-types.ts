#!/usr/bin/env tsx
/**
 * WSDL Type Generation Script
 *
 * This script:
 * 1. Downloads the eBay Trading API WSDL
 * 2. Generates TypeScript types using wsdl-tsclient
 * 3. Post-processes the types to clean up naming conventions
 * 4. Renames files to match cleaned type names
 * 5. Fixes imports for ESM compatibility
 *
 * Usage:
 *   npm run generate:types
 */

import { execSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
  renameSync,
  unlinkSync,
} from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const WSDL_DIR = join(ROOT_DIR, 'wsdl');
const WSDL_FILE = join(WSDL_DIR, 'ebaySvc.wsdl');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'types', 'trading', 'generated');

const WSDL_URL = 'https://developer.ebay.com/webservices/latest/ebaySvc.wsdl';

/**
 * Download the WSDL file if it doesn't exist.
 */
async function downloadWsdl(): Promise<void> {
  if (existsSync(WSDL_FILE)) {
    console.log('WSDL file already exists, skipping download.');
    return;
  }

  console.log('Downloading WSDL from eBay...');
  mkdirSync(WSDL_DIR, { recursive: true });

  const response = await fetch(WSDL_URL);
  if (!response.ok) {
    throw new Error(`Failed to download WSDL: ${response.status}`);
  }

  const wsdlContent = await response.text();
  writeFileSync(WSDL_FILE, wsdlContent);
  console.log('WSDL downloaded successfully.');
}

/**
 * Generate types using wsdl-tsclient.
 */
function generateTypes(): void {
  console.log('Generating TypeScript types...');

  // Clean output directory
  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true });
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });

  try {
    execSync(`npx wsdl-tsclient "${WSDL_FILE}" -o "${OUTPUT_DIR}"`, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Failed to generate types. Make sure wsdl-tsclient is installed.');
    throw error;
  }
}

/**
 * Get all TypeScript files recursively.
 */
function getAllTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) return files;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllTypeScriptFiles(fullPath));
    } else if (entry.name.endsWith('.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Convert messy type name to clean name.
 * NsaddItemRequestType -> AddItemRequest
 * NsgetTokenStatusResponseType -> GetTokenStatusResponse
 */
function cleanTypeName(name: string): string {
  // Remove Ns prefix and Type suffix
  let clean = name.replace(/^Ns/, '').replace(/Type$/, '');
  // Capitalize first letter
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

/**
 * Determine new filename from old filename.
 */
function getNewFilename(oldFilename: string): string {
  const name = basename(oldFilename, '.ts');

  // Skip non-Ns prefixed files
  if (!name.startsWith('Ns')) {
    return oldFilename;
  }

  const cleanName = cleanTypeName(name);
  return join(dirname(oldFilename), `${cleanName}.ts`);
}

/**
 * Build a mapping of old filenames to new filenames.
 */
function buildFileRenameMap(files: string[]): Map<string, string> {
  const renameMap = new Map<string, string>();
  const usedNames = new Set<string>();

  for (const file of files) {
    const name = basename(file, '.ts');

    if (name.startsWith('Ns')) {
      const newPath = getNewFilename(file);
      const newName = basename(newPath, '.ts');

      // Check for conflicts
      if (usedNames.has(newName)) {
        // Skip duplicate - the first one wins
        console.log(`  Skipping duplicate: ${name} -> ${newName}`);
        renameMap.set(file, ''); // Mark for deletion
      } else {
        usedNames.add(newName);
        renameMap.set(file, newPath);
      }
    } else {
      usedNames.add(name);
    }
  }

  return renameMap;
}

/**
 * Clean up file contents and rename files.
 */
function cleanupAndRenameFiles(): void {
  console.log('Cleaning up type names and renaming files...');

  const files = getAllTypeScriptFiles(OUTPUT_DIR);
  const renameMap = buildFileRenameMap(files);

  // First pass: update all file contents
  for (const file of files) {
    let content = readFileSync(file, 'utf-8');

    // Clean type names in content
    content = content.replace(/\bNs([a-zA-Z]+)Type\b/g, (_, name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    });

    // Clean Ns prefix from other identifiers
    content = content.replace(/\bNs([A-Z][a-zA-Z]*)\b/g, '$1');

    // Fix import paths - update to use clean filenames
    content = content.replace(
      /from ['"]\.\/([^'"]+)['"]/g,
      (match, path) => {
        // Handle Ns-prefixed imports
        const pathWithoutExt = path.replace(/\.js$/, '');
        if (pathWithoutExt.startsWith('Ns')) {
          const cleanName = cleanTypeName(pathWithoutExt);
          return `from './${cleanName}.js'`;
        }
        // Ensure .js extension
        if (!path.endsWith('.js')) {
          return `from './${path}.js'`;
        }
        return match;
      }
    );

    content = content.replace(
      /from ['"]\.\.\/([^'"]+)['"]/g,
      (match, path) => {
        const parts = path.split('/');
        const filename = parts[parts.length - 1]?.replace(/\.js$/, '') ?? '';
        if (filename.startsWith('Ns')) {
          const cleanName = cleanTypeName(filename);
          parts[parts.length - 1] = cleanName + '.js';
          return `from '../${parts.join('/')}'`;
        }
        if (!path.endsWith('.js')) {
          return `from '../${path}.js'`;
        }
        return match;
      }
    );

    writeFileSync(file, content);
  }

  // Second pass: rename files
  let renamed = 0;
  let deleted = 0;

  for (const [oldPath, newPath] of renameMap) {
    if (newPath === '') {
      // Delete duplicate
      unlinkSync(oldPath);
      deleted++;
    } else if (oldPath !== newPath) {
      // Check if target already exists (non-Ns file with same name)
      if (existsSync(newPath)) {
        console.log(`  Target exists, skipping: ${basename(oldPath)}`);
        unlinkSync(oldPath);
        deleted++;
      } else {
        renameSync(oldPath, newPath);
        renamed++;
      }
    }
  }

  console.log(`  Renamed ${renamed} files, removed ${deleted} duplicates`);
}

/**
 * Generate barrel export file.
 */
function generateBarrelExport(): void {
  console.log('Generating barrel export...');

  const definitionsDir = join(OUTPUT_DIR, 'ebaysvc', 'definitions');
  const files = existsSync(definitionsDir) ? getAllTypeScriptFiles(definitionsDir) : [];

  // Export only from definitions (skip client, ports, services which have issues)
  const exports: string[] = [];
  const exportedTypes = new Set<string>();

  for (const file of files.sort()) {
    const name = basename(file, '.ts');
    // Skip if we've already exported this type (handles any remaining duplicates)
    if (exportedTypes.has(name)) continue;
    exportedTypes.add(name);

    exports.push(`export * from './ebaysvc/definitions/${name}.js';`);
  }

  const indexContent = `// Auto-generated barrel export
// Do not edit manually - regenerate with: npm run generate:types
//
// These are the full WSDL-generated types for eBay Trading API.
// Import specific types:
//   import type { Item, AddItemRequest } from '@andronics/ebay-client/types/trading/generated';

${exports.join('\n')}
`;

  writeFileSync(join(OUTPUT_DIR, 'index.ts'), indexContent);
  console.log(`  Exported ${exports.length} type definitions`);
}

/**
 * Remove problematic generated files (client, ports, services).
 */
function removeProblematicFiles(): void {
  console.log('Removing problematic generated files...');

  const toRemove = [
    join(OUTPUT_DIR, 'ebaysvc', 'client.ts'),
    join(OUTPUT_DIR, 'ebaysvc', 'index.ts'),
  ];

  // Remove ports and services directories
  const portsDir = join(OUTPUT_DIR, 'ebaysvc', 'ports');
  const servicesDir = join(OUTPUT_DIR, 'ebaysvc', 'services');

  if (existsSync(portsDir)) {
    rmSync(portsDir, { recursive: true });
  }
  if (existsSync(servicesDir)) {
    rmSync(servicesDir, { recursive: true });
  }

  for (const file of toRemove) {
    if (existsSync(file)) {
      unlinkSync(file);
    }
  }
}

/**
 * Main entry point.
 */
async function main(): Promise<void> {
  console.log('=== eBay WSDL Type Generation ===\n');

  try {
    await downloadWsdl();
    generateTypes();
    cleanupAndRenameFiles();
    removeProblematicFiles();
    generateBarrelExport();

    console.log('\n✓ Type generation complete!');
    console.log(`  Output: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('\n✗ Type generation failed:', error);
    process.exit(1);
  }
}

main();
