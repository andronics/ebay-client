# CLAUDE.md

> Context document for AI assistants working on this project.

## Project Overview

**@andronics/ebay-client** is a pure TypeScript library for eBay API integration. It is **NOT a server** - it's designed to be used by serverless functions (Google Cloud Functions, AWS Lambda, etc.) and other Node.js applications.

### Three Core Capabilities

1. **Outbound** - Make API calls to eBay
   - Trading API (legacy XML-based)
   - Fulfillment API (modern REST-based)
   - Inventory API (modern REST-based)

2. **Inbound** - Handle eBay notifications
   - Parse notification XML
   - Verify signatures
   - Validate schemas
   - Build acknowledgment responses

### Key Constraints

- **Provider-agnostic**: No Node.js-specific APIs where avoidable
- **Serverless-friendly**: Stateless, fast initialization, no singletons
- **Constructor injection**: All configuration passed explicitly, no env var magic
- **Tree-shakeable**: Import only what you need

## Architecture

```
@andronics/ebay-client/
├── trading/        → TradingClient (XML over HTTP)
├── fulfillment/    → FulfillmentClient (REST)
├── inventory/      → InventoryClient (REST)
├── notifications/  → Parse, validate, verify inbound events
├── auth/           → Auth'n'Auth + OAuth implementations
├── types/          → Clean WSDL/OpenAPI-generated types
├── errors/         → Error class hierarchy
└── utils/          → XML utilities, HTTP wrapper
```

### Module Relationships

```
Consumer Code
     │
     ├── TradingClient ──────┬── auth/auth-n-auth
     │        │              └── utils/xml
     │        └── utils/http ────── errors/
     │
     ├── FulfillmentClient ──┬── auth/oauth
     │        │              └── utils/http
     │        └── errors/
     │
     ├── InventoryClient ────┬── auth/oauth
     │        │              └── utils/http
     │        └── errors/
     │
     └── notifications/ ─────┬── utils/xml
              │              └── errors/
              └── zod schemas
```

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Plain XML, not SOAP | eBay Trading API doesn't actually use SOAP despite providing WSDL. SOAP libraries fail; plain XML works. |
| Constructor injection | Library used in serverless - caller controls config, credentials, lifecycle |
| No env var access | Provider-agnostic, explicit configuration, testable |
| `fast-xml-parser` | Fast, well-maintained, handles eBay's XML quirks |
| `zod` for validation | Runtime schema validation for notifications |
| WSDL for types only | Generate TypeScript types, don't use for transport |

## eBay API Mechanics

### Trading API (Legacy XML)

The Trading API uses plain XML over HTTP with custom headers:

```
POST https://api.sandbox.ebay.com/ws/api.dll
Headers:
  X-EBAY-API-COMPATIBILITY-LEVEL: 1225
  X-EBAY-API-SITEID: 3 (UK)
  X-EBAY-API-CALL-NAME: GetTokenStatus
  X-EBAY-API-APP-NAME: <app-id>
  X-EBAY-API-DEV-NAME: <dev-id>
  X-EBAY-API-CERT-NAME: <cert-id>
Body:
  <?xml version="1.0"?>
  <GetTokenStatusRequest xmlns="urn:ebay:apis:eBLBaseComponents">
    <RequesterCredentials>
      <eBayAuthToken>...</eBayAuthToken>
    </RequesterCredentials>
  </GetTokenStatusRequest>
```

**NOT SOAP** - No envelope, no namespaced prefixes, just plain XML with the eBay namespace.

### Fulfillment API (Modern REST)

Standard REST with OAuth 2.0 bearer tokens:

```
GET https://api.ebay.com/sell/fulfillment/v1/order
Headers:
  Authorization: Bearer <access-token>
  Content-Type: application/json
```

### Inventory API (Modern REST)

REST API for managing inventory items and offers:

```
PUT https://api.ebay.com/sell/inventory/v1/inventory_item/{sku}
Headers:
  Authorization: Bearer <access-token>
  Content-Type: application/json
Body:
  {
    "product": { "title": "Item Title", ... },
    "condition": "NEW",
    "availability": { "shipToLocationAvailability": { "quantity": 10 } }
  }
```

**Inventory workflow:**
1. Create/update inventory item (product data, condition, availability)
2. Create offer (pricing, policies, marketplace)
3. Publish offer (makes listing live on eBay)

### Notification Flow

eBay sends platform notifications as XML POSTs:

1. eBay POSTs SOAP-like XML to your endpoint
2. Parse XML, extract event type and data
3. Optionally verify signature (eBay signs notifications)
4. Process event
5. Respond 200 OK quickly (eBay times out ~20s)

## Development Commands

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Type checking
npm run typecheck

# Watch mode during development
npm run dev

# Generate types from eBay specs
npm run generate:trading      # Trading API (WSDL)
npm run generate:fulfillment  # Fulfillment API (OpenAPI)
npm run generate:inventory    # Inventory API (OpenAPI)
npm run generate:all          # All APIs
```

## Common Tasks

### Adding a New Trading Operation

1. Add request/response types to `src/types/trading/`
2. Add operation method to `src/trading/operations.ts`
3. Export from `src/trading/index.ts`
4. Add tests in `tests/trading/`

### Adding a New Fulfillment Operation

1. Add request/response types to `src/types/fulfillment/`
2. Add operation method to `src/fulfillment/operations.ts`
3. Export from `src/fulfillment/index.ts`
4. Add tests in `tests/fulfillment/`

### Adding a New Inventory Operation

1. Add request/response types to `src/types/inventory/`
2. Add operation method to `src/inventory/client.ts`
3. Export from `src/inventory/index.ts`
4. Add tests in `tests/unit/inventory/` and `tests/integration/mock/inventory.test.ts`

### Adding a New Notification Event Type

1. Add typed interface to `src/types/notifications/`
2. Add to union type in `src/types/notifications/events.ts`
3. Add Zod schema in `src/notifications/validator.ts`
4. Add tests in `tests/notifications/`

### Regenerating API Types

Two type generation pipelines exist for the different API specs:

**Trading API (WSDL → TypeScript)**
```bash
npm run generate:trading
```
- Downloads WSDL from `developer.ebay.com/webservices/latest/ebaySvc.wsdl`
- Uses `wsdl-tsclient` to generate raw types
- Post-processes to clean names (`NsaddItemResponseType` → `AddItemResponse`)
- Adds `.js` extensions for ESM
- Output: `src/types/trading/generated/`

**Fulfillment API (OpenAPI → TypeScript)**
```bash
npm run generate:fulfillment
```
- Downloads OpenAPI spec from eBay Developer Portal
- Uses `openapi-typescript` to generate types
- Output: `src/types/fulfillment/generated/`

**Inventory API (OpenAPI → TypeScript)**
```bash
npm run generate:inventory
```
- Downloads OpenAPI spec from eBay Developer Portal
- Uses `openapi-typescript` to generate types
- Output: `src/types/inventory/generated/`

**All APIs at once:**
```bash
npm run generate:all
```

Access generated types via the `Generated` namespace:
```typescript
import { Generated } from '@andronics/ebay-client/types/trading';
import { Generated } from '@andronics/ebay-client/types/fulfillment';
import { Generated } from '@andronics/ebay-client/types/inventory';
```

## Gotchas & Edge Cases

### eBay API Quirks

- **SOAP is a lie**: Despite WSDL, Trading API is plain XML. SOAP libraries fail.
- **GTC required**: Fixed price listings must use `ListingDuration: "GTC"` (Good 'Til Cancelled)
- **ItemSpecifics**: Most categories require specific attributes (Brand, Size, etc.) - eBay returns errors listing which are missing
- **Sandbox unreliable**: Production API more stable; expect sandbox timeouts
- **Notification delays**: Can be minutes to hours in sandbox

### Type Generation Quirks

- WSDL generates messy names: `NsaddItemResponseType` → `AddItemResponse`
- Some types have circular references - be careful with deep nesting
- Optional vs required fields don't always match docs

### Auth Token Notes

- Auth'n'Auth tokens can contain `#` - ensure proper quoting
- Tokens are long-lived (~18 months) but can be revoked
- OAuth tokens expire and need refresh logic

## File Tree

```
@andronics/ebay-client/
├── CLAUDE.md           # This file
├── README.md           # User documentation
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
├── src/
│   ├── index.ts                    # Main exports
│   ├── trading/
│   │   ├── index.ts
│   │   ├── client.ts               # TradingClient class
│   │   ├── operations.ts           # Typed operation methods
│   │   └── xml.ts                  # XML builder/parser
│   ├── fulfillment/
│   │   ├── index.ts
│   │   └── client.ts               # FulfillmentClient class
│   ├── inventory/
│   │   ├── index.ts
│   │   └── client.ts               # InventoryClient class
│   ├── notifications/
│   │   ├── index.ts
│   │   ├── parser.ts               # Parse notification XML
│   │   ├── validator.ts            # Schema validation
│   │   ├── signature.ts            # Signature verification
│   │   └── response.ts             # Build ack response
│   ├── auth/
│   │   ├── index.ts
│   │   ├── auth-n-auth.ts          # Legacy token auth
│   │   └── oauth.ts                # OAuth 2.0
│   ├── types/
│   │   ├── index.ts
│   │   ├── config.ts               # Configuration types
│   │   ├── trading/                # Trading types + generated/
│   │   ├── fulfillment/            # Fulfillment types + generated/
│   │   ├── inventory/              # Inventory types + generated/
│   │   └── notifications/          # Notification event types
│   ├── errors/
│   │   ├── index.ts
│   │   ├── ebay-error.ts           # Base error
│   │   ├── api-error.ts            # API response errors
│   │   ├── validation-error.ts     # Schema validation
│   │   └── signature-error.ts      # Signature verification
│   └── utils/
│       ├── http.ts                 # Fetch wrapper with retry
│       └── xml.ts                  # Shared XML utilities
├── scripts/
│   ├── generate-trading-types.ts   # WSDL type generation
│   ├── generate-fulfillment-types.ts # OpenAPI type generation
│   └── generate-inventory-types.ts # OpenAPI type generation
└── tests/
    ├── unit/
    │   ├── trading/
    │   ├── fulfillment/
    │   ├── inventory/
    │   └── notifications/
    └── integration/
        └── mock/
            ├── handlers/           # MSW request handlers
            ├── trading.test.ts
            ├── inventory.test.ts
            └── notifications.test.ts
```

## Related Context

This library was extracted from the `ebay-poc` Express.js proof of concept. Key learnings from that project are incorporated here, particularly around XML handling and the discovery that eBay's Trading API is not actually SOAP.

The library is designed to be used with:
- Google Cloud Functions for notification handling
- Firebase backend for order processing
- Any serverless or traditional Node.js environment
