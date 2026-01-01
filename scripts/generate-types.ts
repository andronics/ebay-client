#!/usr/bin/env tsx
/**
 * WSDL Type Generation Script
 *
 * This script:
 * 1. Downloads the eBay Trading API WSDL
 * 2. Generates TypeScript types using wsdl-tsclient
 * 3. Post-processes the types to clean up naming conventions
 * 4. Fixes imports for ESM compatibility
 *
 * Usage:
 *   npm run generate:types
 *
 * Note: This is meant to supplement the manually defined types in src/types/trading/
 * For most use cases, the manual types are sufficient.
 */

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
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
 * Clean up generated type names.
 *
 * The WSDL generator creates messy names like:
 * - NsaddItemResponseType -> AddItemResponse
 * - NsgetTokenStatusRequestType -> GetTokenStatusRequest
 */
function cleanupTypeNames(): void {
  console.log('Cleaning up type names...');

  const files = getAllTypeScriptFiles(OUTPUT_DIR);

  for (const file of files) {
    let content = readFileSync(file, 'utf-8');

    // Remove 'Ns' prefix and 'Type' suffix from type names
    content = content.replace(/\bNs([a-zA-Z]+)Type\b/g, (_, name) => {
      // Capitalize first letter
      return name.charAt(0).toUpperCase() + name.slice(1);
    });

    // Remove 'Ns' prefix from other identifiers
    content = content.replace(/\bNs([A-Z][a-zA-Z]*)\b/g, '$1');

    // Fix imports for ESM (add .js extension)
    content = content.replace(/from ['"]\.\/([^'"]+)['"]/g, "from './$1.js'");
    content = content.replace(/from ['"]\.\.\/([^'"]+)['"]/g, "from '../$1.js'");

    writeFileSync(file, content);
  }
}

/**
 * Get all TypeScript files recursively.
 */
function getAllTypeScriptFiles(dir: string): string[] {
  const files: string[] = [];

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
 * Generate barrel export file.
 */
function generateBarrelExport(): void {
  console.log('Generating barrel export...');

  const files = getAllTypeScriptFiles(OUTPUT_DIR);
  const exports: string[] = [];

  for (const file of files) {
    const relativePath = file.replace(OUTPUT_DIR + '/', '').replace('.ts', '.js');
    if (relativePath !== 'index.js') {
      exports.push(`export * from './${relativePath}';`);
    }
  }

  const indexContent = `// Auto-generated barrel export
// Do not edit manually - regenerate with: npm run generate:types

${exports.join('\n')}
`;

  writeFileSync(join(OUTPUT_DIR, 'index.ts'), indexContent);
}

/**
 * Main entry point.
 */
async function main(): Promise<void> {
  console.log('=== eBay WSDL Type Generation ===\n');

  try {
    await downloadWsdl();
    generateTypes();
    cleanupTypeNames();
    generateBarrelExport();

    console.log('\n✓ Type generation complete!');
    console.log(`  Output: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('\n✗ Type generation failed:', error);
    process.exit(1);
  }
}

main();
