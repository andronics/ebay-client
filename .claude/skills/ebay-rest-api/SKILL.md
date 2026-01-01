---
name: ebay-rest-api
description: Implement a new eBay REST API client following established patterns. Use when adding new eBay APIs like Marketing, Analytics, Account, or any other REST-based API. Handles type generation, client implementation, testing, and documentation.
---

# Implement New eBay REST API

This skill guides the implementation of new eBay REST API clients by extending `BaseRestClient`. All REST clients inherit common functionality (OAuth, request handling, error handling) from the base class.

## Prerequisites

Before starting, gather:
1. **API Name** (e.g., "Marketing", "Analytics", "Account")
2. **OpenAPI Spec URL** from eBay Developer Portal
3. **Base URL Path** (e.g., `/sell/marketing/v1`)
4. **OAuth Scope** required for the API
5. **Operations to implement** (list of endpoints)

## Feature Branch

Before starting implementation, create a feature branch:

```bash
git checkout -b feature/{api}-api
```

## Implementation Checklist

### 1. Type Generation Infrastructure

Create `scripts/generate-{api}-types.ts`:
- Follow `scripts/generate-fulfillment-types.ts` pattern exactly
- Download OpenAPI spec from eBay
- Cache at `openapi/sell_{api}_v1_oas3.json`
- Generate to `src/types/{api}/generated/index.ts`

Update `package.json`:
```json
"generate:{api}": "tsx scripts/generate-{api}-types.ts"
```

### 2. Type Definitions

Create curated types at `src/types/{api}/`:
- `{resource}.ts` - Domain-specific types for each resource
- `index.ts` - Export curated types + `* as Generated`

Pattern for curated types:
```typescript
// Enums as union types
export type StatusEnum = 'ACTIVE' | 'INACTIVE' | 'DELETED';

// Interfaces with JSDoc
/** Description of the resource */
export interface Resource {
  id: string;
  name?: string;
  // ... fields
}

// Request/Response types
export interface CreateResourceRequest { ... }
export interface ResourceResponse { ... }
export interface ResourcesResponse {
  href?: string;
  limit?: number;
  offset?: number;
  total?: number;
  resources?: Resource[];
}
```

### 3. Configuration

Update `src/types/config.ts`:
```typescript
export interface {Api}ClientConfig {
  sandbox: boolean;
  auth: OAuthConfig;
  retry?: Partial<RetryConfig>;
}

export function get{Api}Endpoint(sandbox: boolean): string {
  return sandbox
    ? 'https://api.sandbox.ebay.com/sell/{api}/v1'
    : 'https://api.ebay.com/sell/{api}/v1';
}
```

### 4. Client Implementation

Create `src/{api}/client.ts` extending `BaseRestClient`:

```typescript
import type { {Api}ClientConfig } from '../types/config.js';
import { BaseRestClient } from '../base/index.js';

import type {
  // Import domain types from ../types/{api}/index.js
} from '../types/{api}/index.js';

// Parameter types for operations
export interface Get{Resources}Params {
  limit?: number;
  offset?: number;
  // ... query params
}

/**
 * API path for the {Api} API.
 */
const API_PATH = '/sell/{api}/v1';

/**
 * Client for eBay {Api} API (REST-based).
 */
export class {Api}Client extends BaseRestClient<{Api}ClientConfig> {
  constructor(config: {Api}ClientConfig) {
    super(config, API_PATH);
  }

  // Operations use inherited request() method from BaseRestClient:
  //
  // GET single:
  //   async get{Resource}(id: string): Promise<{Resource}> {
  //     return this.request<{Resource}>('GET', `/{resource}/${id}`);
  //   }
  //
  // GET list:
  //   async get{Resources}(params?: Get{Resources}Params): Promise<{Resources}Response> {
  //     const query = buildQueryString(params);
  //     return this.request<{Resources}Response>('GET', `/{resources}${query}`);
  //   }
  //
  // POST (note the { body } wrapper):
  //   async create{Resource}(data: Create{Resource}Request): Promise<Create{Resource}Response> {
  //     return this.request<Create{Resource}Response>('POST', '/{resource}', { body: data });
  //   }
  //
  // PUT (note the { body } wrapper):
  //   async update{Resource}(id: string, data: Update{Resource}Request): Promise<void> {
  //     await this.request<void>('PUT', `/{resource}/${id}`, { body: data });
  //   }
  //
  // DELETE:
  //   async delete{Resource}(id: string): Promise<void> {
  //     await this.request<void>('DELETE', `/{resource}/${id}`);
  //   }
  //
  // With custom headers (e.g., Accept-Encoding):
  //   return this.request<T>('GET', path, { headers: { 'Accept-Encoding': 'gzip' } });

  // Inherited from BaseRestClient:
  // - getBaseUrl(): string
  // - getEndpoint(): string
  // - isSandbox(): boolean
}
```

**Note:** The `BaseRestClient` provides:
- OAuth authentication (validates config, builds headers)
- JSON request/response handling with retry logic
- Standard eBay REST API error handling
- `getBaseUrl()`, `getEndpoint()`, and `isSandbox()` utility methods

Create `src/{api}/index.ts`:
```typescript
export { {Api}Client, type Get{Resources}Params } from './client.js';
export type { {Api}ClientConfig, OAuthConfig } from '../types/config.js';
// Re-export domain types
```

### 5. Main Exports & Build Config

Update `src/index.ts`:
- Add `export { {Api}Client } from './{api}/index.js'`

Update `src/types/index.ts`:
- Add config and type exports

Update `tsup.config.ts` entry array:
- Add `'src/{api}/index.ts'`
- Add `'src/types/{api}/index.ts'`

Update `package.json` exports:
```json
"./{api}": { "types": "./dist/{api}/index.d.ts", "import": "./dist/{api}/index.js" },
"./types/{api}": { "types": "./dist/types/{api}/index.d.ts", "import": "./dist/types/{api}/index.js" }
```

### 6. Unit Tests

Create `tests/unit/fixtures/{api}-responses.ts`:
- Success responses for each operation
- Empty list responses
- Error responses (NOT_FOUND, UNAUTHORIZED, etc.)

Create `tests/unit/{api}/client.test.ts`:
- Constructor validation
- Endpoint selection (sandbox/production)
- Each operation with mocked httpRequest
- Error handling
- Header assertions

### 7. Integration Tests (MSW)

Create `tests/integration/mock/handlers/{api}.ts`:
- MSW handlers for all endpoints
- Request capture array for assertions

Create `tests/integration/mock/{api}.test.ts`:
- Full workflow tests
- Error scenarios

Update `tests/integration/mock/setup.ts`:
- Import and spread `{api}Handlers`

### 8. Documentation

Update `CLAUDE.md`:
- Add to architecture diagram
- Add to file tree
- Add "Adding a New {Api} Operation" section

Update `README.md`:
- Add {Api} API section with examples
- Add {Api}Client methods table

## Git Workflow

### Commit Strategy

Make logical commits after completing each phase:

```bash
# After Phase 2 (Types)
git add scripts/generate-{api}-types.ts src/types/{api}/ package.json
git commit -m "feat({api}): add type generation and curated types"

# After Phase 4-5 (Client + Exports)
git add src/{api}/ src/index.ts src/types/config.ts src/types/index.ts tsup.config.ts
git commit -m "feat({api}): implement {Api}Client with operations"

# After Phase 6-7 (Tests)
git add tests/
git commit -m "test({api}): add unit and integration tests"

# After Phase 8 (Docs)
git add CLAUDE.md README.md
git commit -m "docs({api}): update documentation"
```

### Merge to Main

After all phases complete and tests pass:

```bash
git checkout main
git merge --no-ff feature/{api}-api -m "Merge branch 'feature/{api}-api'"
git branch -d feature/{api}-api
```

## Reference Files

These existing files are the patterns to follow:
- `src/base/base-rest-client.ts` - Base class with request handling and error handling
- `src/fulfillment/client.ts` - Example REST client extending BaseRestClient
- `src/types/fulfillment/` - Type organization
- `scripts/generate-fulfillment-types.ts` - Type generation
- `tests/unit/fulfillment/client.test.ts` - Unit test patterns
- `tests/integration/mock/handlers/` - MSW handler patterns
- `tests/utils/test-helpers.ts` - Shared test utilities

## eBay REST API Specs

Find OpenAPI specs at:
`https://developer.ebay.com/api-docs/master/sell/{api}/openapi/3/sell_{api}_v1_oas3.json`

Common eBay REST APIs:
- Marketing: `/sell/marketing/v1`
- Analytics: `/sell/analytics/v1`
- Account: `/sell/account/v1`
- Metadata: `/sell/metadata/v1`
- Recommendation: `/sell/recommendation/v1`
