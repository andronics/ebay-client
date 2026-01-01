# @andronics/ebay-client

A pure TypeScript library for eBay API integration. Supports both the Trading API (XML) and Fulfillment API (REST), plus inbound notification handling.

**This is a library, not a server.** Use it in your serverless functions, Express apps, or any Node.js environment.

## Installation

```bash
npm install @andronics/ebay-client
```

## Quick Start

### Trading API (Listings, Orders via XML)

```typescript
import { TradingClient } from '@andronics/ebay-client/trading';

const trading = new TradingClient({
  sandbox: true,
  siteId: 3, // UK
  auth: {
    type: 'auth-n-auth',
    appId: 'your-app-id',
    devId: 'your-dev-id',
    certId: 'your-cert-id',
    authToken: 'your-auth-token',
  },
});

// Check API connectivity
const status = await trading.getTokenStatus();
console.log('Token expires:', status.TokenStatus?.ExpirationTime);

// Create a listing
const result = await trading.addItem({
  Item: {
    Title: 'Test Item',
    Description: 'A test listing',
    PrimaryCategory: { CategoryID: '11483' },
    StartPrice: 9.99,
    Quantity: 1,
    ListingDuration: 'GTC',
    // ...
  },
});

// Get listing details
const item = await trading.getItem({ ItemID: '123456789' });

// End a listing
await trading.endItem({ ItemID: '123456789', EndingReason: 'NotAvailable' });
```

### Fulfillment API (Order Management via REST)

```typescript
import { FulfillmentClient } from '@andronics/ebay-client/fulfillment';

const fulfillment = new FulfillmentClient({
  sandbox: false,
  auth: {
    type: 'oauth',
    accessToken: 'your-access-token',
  },
});

// Get orders
const orders = await fulfillment.getOrders({ limit: 50 });

// Get specific order
const order = await fulfillment.getOrder({ orderId: '123-456-789' });

// Create shipment
await fulfillment.createShipment({
  orderId: '123-456-789',
  trackingNumber: 'ABC123',
  carrier: 'ROYAL_MAIL',
});
```

### Handling Notifications

```typescript
import {
  parseNotification,
  verifySignature,
  validateNotification,
  buildAckResponse,
} from '@andronics/ebay-client/notifications';

// In your Cloud Function or Express handler:
export async function handleNotification(req, res) {
  const rawXml = req.rawBody; // or req.body if already parsed

  // 1. Parse XML to typed object
  const notification = parseNotification(rawXml);

  // 2. Verify signature (recommended)
  const isValid = await verifySignature(rawXml, req.headers, {
    certId: 'your-cert-id',
  });

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  // 3. Validate schema (optional)
  const validation = validateNotification(notification);
  if (!validation.success) {
    console.warn('Validation issues:', validation.errors);
  }

  // 4. Process by event type
  switch (notification.eventType) {
    case 'ItemSold':
      await handleItemSold(notification);
      break;
    case 'FixedPriceTransaction':
      await handleTransaction(notification);
      break;
  }

  // 5. Acknowledge receipt
  res.status(200).send(buildAckResponse());
}
```

## Configuration

### Trading Client Config

```typescript
interface TradingClientConfig {
  sandbox: boolean;              // true for sandbox, false for production
  siteId: number;                // 0=US, 3=UK, etc.
  compatibilityLevel?: number;   // API version (default: 1225)
  auth: AuthNAuthConfig;
  retry?: {
    maxRetries: number;          // Default: 3
    delayMs: number;             // Default: 1000
  };
}

interface AuthNAuthConfig {
  type: 'auth-n-auth';
  appId: string;
  devId: string;
  certId: string;
  authToken: string;
}
```

### Fulfillment Client Config

```typescript
interface FulfillmentClientConfig {
  sandbox: boolean;
  auth: OAuthConfig;
  retry?: {
    maxRetries: number;
    delayMs: number;
  };
}

interface OAuthConfig {
  type: 'oauth';
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}
```

## Type Imports

The library exports clean, typed interfaces generated from eBay's WSDL:

```typescript
// Import specific types
import type {
  AddItemRequest,
  AddItemResponse,
  Item,
  ShippingDetails,
  ItemSpecifics,
} from '@andronics/ebay-client/types/trading';

// Import notification types
import type {
  EbayNotification,
  ItemSoldNotification,
  FixedPriceTransactionNotification,
} from '@andronics/ebay-client/types/notifications';

// Import all trading types
import type * as Trading from '@andronics/ebay-client/types/trading';
```

## Error Handling

The library uses a hierarchy of error classes:

```typescript
import {
  EbayError,
  ApiError,
  ValidationError,
  SignatureError,
} from '@andronics/ebay-client/errors';

try {
  await trading.addItem({ /* ... */ });
} catch (error) {
  if (error instanceof ApiError) {
    // eBay API returned an error
    console.error('eBay error:', error.ebayErrorCode, error.message);
  } else if (error instanceof ValidationError) {
    // Request validation failed
    console.error('Validation errors:', error.errors);
  } else if (error instanceof EbayError) {
    // Other eBay-related error
    console.error('Error:', error.message);
  }
}
```

## API Reference

### TradingClient Methods

| Method | Description |
|--------|-------------|
| `getTokenStatus()` | Check auth token validity and expiration |
| `addItem(request)` | Create a new listing |
| `verifyAddItem(request)` | Validate listing without creating |
| `reviseItem(request)` | Update an existing listing |
| `endItem(request)` | End a listing early |
| `getItem(request)` | Get listing details |
| `setNotificationPreferences(request)` | Configure notification subscriptions |
| `getNotificationPreferences(level)` | Get current notification settings |

### FulfillmentClient Methods

| Method | Description |
|--------|-------------|
| `getOrders(params)` | List orders with filtering |
| `getOrder(params)` | Get specific order details |
| `createShipment(request)` | Add shipment tracking |

### Notification Functions

| Function | Description |
|----------|-------------|
| `parseNotification(xml)` | Parse XML to typed notification object |
| `verifySignature(xml, headers, config)` | Verify eBay's signature |
| `validateNotification(notification)` | Validate against Zod schema |
| `buildAckResponse()` | Build acknowledgment response |

## Site IDs

Common eBay site IDs:

| ID | Site |
|----|------|
| 0 | US |
| 2 | Canada |
| 3 | UK |
| 15 | Australia |
| 77 | Germany |
| 71 | France |

## Requirements

- Node.js >= 18.0.0
- TypeScript >= 5.0 (for development)

## License

MIT
