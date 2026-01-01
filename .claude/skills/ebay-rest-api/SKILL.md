---
name: ebay-rest-api
description: Implement a new eBay REST API client following established patterns. Use when adding new eBay APIs like Marketing, Analytics, Account, or any other REST-based API. Handles type generation, client implementation, testing, and documentation.
---

# Implement New eBay REST API

This skill guides the implementation of new eBay REST API clients following the established `FulfillmentClient` pattern.

## Prerequisites

Before starting, gather:
1. **API Name** (e.g., "Marketing", "Analytics", "Account")
2. **OpenAPI Spec URL** from eBay Developer Portal
3. **Base URL Path** (e.g., `/sell/marketing/v1`)
4. **OAuth Scope** required for the API
5. **Operations to implement** (list of endpoints)

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

Create `src/{api}/client.ts` following this structure:

```typescript
import type { {Api}ClientConfig } from '../types/config.js';
import { get{Api}Endpoint } from '../types/config.js';
import { buildOAuthHeaders, validateOAuthConfig } from '../auth/oauth.js';
import { httpRequest, type RetryConfig, DEFAULT_RETRY_CONFIG } from '../utils/http.js';
import { ApiError } from '../errors/api-error.js';

// Parameter types for operations
export interface Get{Resources}Params {
  limit?: number;
  offset?: number;
  // ... query params
}

// API Error response type
interface {Api}ApiError {
  errors?: Array<{
    errorId?: number;
    domain?: string;
    category?: string;
    message?: string;
    longMessage?: string;
  }>;
}

export class {Api}Client {
  private readonly config: {Api}ClientConfig;
  private readonly baseUrl: string;
  private readonly retryConfig: RetryConfig;

  constructor(config: {Api}ClientConfig) {
    validateOAuthConfig(config.auth);
    this.config = config;
    this.baseUrl = get{Api}Endpoint(config.sandbox);
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config.retry };
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: object
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers = buildOAuthHeaders(this.config.auth);

    const response = await httpRequest<T | {Api}ApiError>(url, {
      method,
      headers,
      body,
      retry: this.retryConfig,
    });

    if (!response.ok) {
      const errorData = response.data as {Api}ApiError;
      const error = errorData.errors?.[0];
      throw new ApiError(
        error?.longMessage ?? error?.message ?? '{Api} API error',
        {
          ErrorCode: String(error?.errorId ?? 'UNKNOWN'),
          ShortMessage: error?.message,
          LongMessage: error?.longMessage,
        },
        path
      );
    }

    return response.data as T;
  }

  // Operations follow patterns:
  // GET single: async get{Resource}(id: string): Promise<{Resource}>
  // GET list: async get{Resources}(params?: Get{Resources}Params): Promise<{Resources}Response>
  // POST: async create{Resource}(data: Create{Resource}Request): Promise<Create{Resource}Response>
  // PUT: async update{Resource}(id: string, data: Update{Resource}Request): Promise<void>
  // DELETE: async delete{Resource}(id: string): Promise<void>

  getBaseUrl(): string { return this.baseUrl; }
  isSandbox(): boolean { return this.config.sandbox; }
}
```

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

## Reference Files

These existing files are the patterns to follow:
- `src/fulfillment/client.ts` - Client structure
- `src/types/fulfillment/` - Type organization
- `scripts/generate-fulfillment-types.ts` - Type generation
- `tests/unit/fulfillment/client.test.ts` - Unit test patterns
- `tests/integration/mock/handlers/` - MSW handler patterns

## eBay REST API Specs

Find OpenAPI specs at:
`https://developer.ebay.com/api-docs/master/sell/{api}/openapi/3/sell_{api}_v1_oas3.json`

Common eBay REST APIs:
- Marketing: `/sell/marketing/v1`
- Analytics: `/sell/analytics/v1`
- Account: `/sell/account/v1`
- Metadata: `/sell/metadata/v1`
- Recommendation: `/sell/recommendation/v1`
