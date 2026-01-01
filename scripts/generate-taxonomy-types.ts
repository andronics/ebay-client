#!/usr/bin/env tsx
/**
 * OpenAPI Type Generation Script for eBay Taxonomy API
 *
 * This script:
 * 1. Downloads the eBay Taxonomy API OpenAPI spec
 * 2. Generates TypeScript types using openapi-typescript
 * 3. Outputs to src/types/taxonomy/generated/
 *
 * Usage:
 *   npm run generate:taxonomy
 */

import openapiTS, { astToString } from 'openapi-typescript';
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OPENAPI_DIR = join(ROOT_DIR, 'openapi');
const OPENAPI_FILE = join(OPENAPI_DIR, 'commerce_taxonomy_v1_oas3.json');
const OUTPUT_DIR = join(ROOT_DIR, 'src', 'types', 'taxonomy', 'generated');

const OPENAPI_URL =
  'https://developer.ebay.com/api-docs/master/commerce/taxonomy/openapi/3/commerce_taxonomy_v1_oas3.json';

/**
 * Download the OpenAPI spec if it doesn't exist.
 */
async function downloadSpec(): Promise<void> {
  if (existsSync(OPENAPI_FILE)) {
    console.log('OpenAPI spec already exists, skipping download.');
    return;
  }

  console.log('Downloading OpenAPI spec from eBay...');
  mkdirSync(OPENAPI_DIR, { recursive: true });

  const response = await fetch(OPENAPI_URL);
  if (!response.ok) {
    throw new Error(`Failed to download OpenAPI spec: ${response.status}`);
  }

  const specContent = await response.text();
  writeFileSync(OPENAPI_FILE, specContent);
  console.log('OpenAPI spec downloaded successfully.');
}

/**
 * Generate TypeScript types from OpenAPI spec.
 */
async function generateTypes(): Promise<void> {
  console.log('Generating TypeScript types...');

  // Clean output directory
  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true });
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Generate types from local file
  const ast = await openapiTS(new URL(`file://${OPENAPI_FILE}`), {
    exportType: true,
    alphabetize: true,
  });

  const content = astToString(ast);

  // Add header comment
  const header = `// Auto-generated from eBay Taxonomy API OpenAPI spec
// Do not edit manually - regenerate with: npm run generate:taxonomy
//
// These are the full OpenAPI-generated types for eBay Taxonomy API.
// Import via:
//   import type { components, operations } from '@andronics/ebay-client/types/taxonomy/generated';

`;

  writeFileSync(join(OUTPUT_DIR, 'index.ts'), header + content);
  console.log(`  Generated types to ${OUTPUT_DIR}/index.ts`);
}

/**
 * Main entry point.
 */
async function main(): Promise<void> {
  console.log('=== eBay Taxonomy API Type Generation ===\n');

  try {
    await downloadSpec();
    await generateTypes();

    console.log('\n✓ Type generation complete!');
    console.log(`  Output: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('\n✗ Type generation failed:', error);
    process.exit(1);
  }
}

main();
