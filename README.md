# @andronics/ebay-client

[![CI](https://github.com/andronics/ebay-client/actions/workflows/ci.yml/badge.svg)](https://github.com/andronics/ebay-client/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@andronics/ebay-client.svg)](https://www.npmjs.com/package/@andronics/ebay-client)

A pure TypeScript library for eBay API integration. Supports Trading API (XML), Fulfillment API (REST), Inventory API (REST), Account API (REST), and Taxonomy API (REST), plus inbound notification handling.

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

### Inventory API (Product & Offer Management via REST)

```typescript
import { InventoryClient } from '@andronics/ebay-client/inventory';

const inventory = new InventoryClient({
  sandbox: false,
  auth: {
    accessToken: 'your-access-token',
  },
});

// Create or update an inventory item
await inventory.createOrReplaceInventoryItem('MY-SKU-001', {
  product: {
    title: 'Premium Widget',
    description: 'A high-quality widget for all your needs',
    aspects: {
      Brand: ['WidgetCo'],
      Type: ['Standard'],
    },
    imageUrls: ['https://example.com/widget.jpg'],
  },
  condition: 'NEW',
  availability: {
    shipToLocationAvailability: {
      quantity: 100,
    },
  },
});

// Get inventory item
const item = await inventory.getInventoryItem('MY-SKU-001');

// List all inventory items
const items = await inventory.getInventoryItems({ limit: 50 });

// Create an offer for the item
const { offerId } = await inventory.createOffer({
  sku: 'MY-SKU-001',
  marketplaceId: 'EBAY_GB',
  format: 'FIXED_PRICE',
  listingPolicies: {
    fulfillmentPolicyId: 'your-fulfillment-policy-id',
    paymentPolicyId: 'your-payment-policy-id',
    returnPolicyId: 'your-return-policy-id',
  },
  pricingSummary: {
    price: { value: '29.99', currency: 'GBP' },
  },
  categoryId: '11450',
});

// Publish the offer (makes listing live)
const { listingId } = await inventory.publishOffer(offerId);

// Get/update offers
const offer = await inventory.getOffer(offerId);
const offers = await inventory.getOffers({ sku: 'MY-SKU-001' });
await inventory.updateOffer(offerId, {
  pricingSummary: { price: { value: '24.99', currency: 'GBP' } },
});

// Delete inventory item
await inventory.deleteInventoryItem('MY-SKU-001');
```

### Account API (Business Policies via REST)

```typescript
import { AccountClient } from '@andronics/ebay-client/account';

const account = new AccountClient({
  sandbox: false,
  auth: {
    accessToken: 'your-access-token',
  },
});

// Get seller privileges
const privileges = await account.getPrivileges();
console.log('Selling limit:', privileges.sellingLimit?.quantity);

// Create a fulfillment (shipping) policy
const { fulfillmentPolicyId } = await account.createFulfillmentPolicy({
  name: 'Standard UK Shipping',
  marketplaceId: 'EBAY_GB',
  handlingTime: { unit: 'DAY', value: 1 },
  shippingOptions: [
    {
      optionType: 'DOMESTIC',
      costType: 'FLAT_RATE',
      shippingServices: [
        {
          shippingCarrierCode: 'Royal Mail',
          shippingServiceCode: 'UK_RoyalMailFirstClassStandard',
          shippingCost: { value: '3.99', currency: 'GBP' },
        },
      ],
    },
  ],
});

// Create a payment policy
const { paymentPolicyId } = await account.createPaymentPolicy({
  name: 'Immediate Payment Required',
  marketplaceId: 'EBAY_GB',
  immediatePay: true,
});

// Create a return policy
const { returnPolicyId } = await account.createReturnPolicy({
  name: '30 Day Returns',
  marketplaceId: 'EBAY_GB',
  returnsAccepted: true,
  returnPeriod: { unit: 'DAY', value: 30 },
  returnShippingCostPayer: 'BUYER',
  refundMethod: 'MONEY_BACK',
});

// Get all policies for a marketplace
const fulfillmentPolicies = await account.getFulfillmentPolicies('EBAY_GB');
const paymentPolicies = await account.getPaymentPolicies('EBAY_GB');
const returnPolicies = await account.getReturnPolicies('EBAY_GB');

// Update a policy
await account.updateFulfillmentPolicy(fulfillmentPolicyId, {
  name: 'Express UK Shipping',
  marketplaceId: 'EBAY_GB',
  handlingTime: { unit: 'DAY', value: 0 },
});

// Delete a policy
await account.deleteFulfillmentPolicy(fulfillmentPolicyId);
```

### Taxonomy API (Category Discovery via REST)

```typescript
import { TaxonomyClient } from '@andronics/ebay-client/taxonomy';

const taxonomy = new TaxonomyClient({
  sandbox: false,
  auth: {
    accessToken: 'your-access-token',
  },
});

// Get the default category tree ID for a marketplace
const { categoryTreeId } = await taxonomy.getDefaultCategoryTreeId('EBAY_GB');

// Get category suggestions based on product keywords
const suggestions = await taxonomy.getCategorySuggestions({
  categoryTreeId,
  query: 'iPhone 15 Pro Max 256GB',
});

// The first suggestion is usually the best match
const bestCategory = suggestions.categorySuggestions?.[0];
console.log('Category:', bestCategory?.category?.categoryName);
console.log('Category ID:', bestCategory?.category?.categoryId);

// Get required/recommended aspects (attributes) for the category
const aspects = await taxonomy.getItemAspectsForCategory({
  categoryTreeId,
  categoryId: bestCategory?.category?.categoryId!,
});

// Find required aspects
const requiredAspects = aspects.aspects?.filter(
  a => a.aspectConstraint?.aspectRequired
);
console.log('Required aspects:', requiredAspects?.map(a => a.localizedAspectName));

// Get valid values for an aspect (e.g., Brand)
const brandAspect = aspects.aspects?.find(a => a.localizedAspectName === 'Brand');
console.log('Valid brands:', brandAspect?.aspectValues?.map(v => v.localizedValue));

// For vehicle parts: get compatibility properties
const compatProps = await taxonomy.getCompatibilityProperties({
  categoryTreeId: '100', // eBay Motors
  categoryId: '6016',    // Car & Truck Parts
});

// Get Toyota models for 2018
const models = await taxonomy.getCompatibilityPropertyValues({
  categoryTreeId: '100',
  categoryId: '6016',
  compatibilityProperty: 'Model',
  filter: 'Year:2018,Make:Toyota',
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
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}
```

### Inventory Client Config

```typescript
interface InventoryClientConfig {
  sandbox: boolean;
  auth: OAuthConfig;
  retry?: {
    maxRetries: number;
    delayMs: number;
  };
}
```

### Account Client Config

```typescript
interface AccountClientConfig {
  sandbox: boolean;
  auth: OAuthConfig;
  retry?: {
    maxRetries: number;
    delayMs: number;
  };
}
```

### Taxonomy Client Config

```typescript
interface TaxonomyClientConfig {
  sandbox: boolean;
  auth: OAuthConfig;
  retry?: {
    maxRetries: number;
    delayMs: number;
  };
}
```

## Type Imports

The library exports clean, typed interfaces generated from eBay's specs:

```typescript
// Import trading types
import type {
  AddItemRequest,
  AddItemResponse,
  Item,
} from '@andronics/ebay-client/types/trading';

// Import inventory types
import type {
  InventoryItem,
  Offer,
  CreateOfferRequest,
  CreateOfferResponse,
} from '@andronics/ebay-client/types/inventory';

// Import account types
import type {
  FulfillmentPolicy,
  PaymentPolicy,
  ReturnPolicy,
  SellingPrivileges,
} from '@andronics/ebay-client/types/account';

// Import taxonomy types
import type {
  CategoryTree,
  CategorySuggestionResponse,
  Aspect,
  AspectMetadata,
} from '@andronics/ebay-client/types/taxonomy';

// Import notification types
import type {
  EbayNotification,
  ItemSoldNotification,
  FixedPriceTransactionNotification,
} from '@andronics/ebay-client/types/notifications';

// Import all types from a namespace
import type * as Trading from '@andronics/ebay-client/types/trading';
import type * as Inventory from '@andronics/ebay-client/types/inventory';
import type * as Account from '@andronics/ebay-client/types/account';
import type * as Taxonomy from '@andronics/ebay-client/types/taxonomy';
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

### InventoryClient Methods

| Method | Description |
|--------|-------------|
| `createOrReplaceInventoryItem(sku, item)` | Create or update an inventory item |
| `getInventoryItem(sku)` | Get inventory item by SKU |
| `deleteInventoryItem(sku)` | Delete an inventory item |
| `getInventoryItems(params)` | List inventory items with pagination |
| `createOffer(offer)` | Create an offer for an inventory item |
| `getOffer(offerId)` | Get offer details |
| `updateOffer(offerId, offer)` | Update an existing offer |
| `publishOffer(offerId)` | Publish offer to make listing live |
| `getOffers(params)` | List offers for a SKU |

### AccountClient Methods

| Method | Description |
|--------|-------------|
| `createFulfillmentPolicy(policy)` | Create a fulfillment (shipping) policy |
| `getFulfillmentPolicy(policyId)` | Get fulfillment policy by ID |
| `getFulfillmentPolicies(marketplaceId)` | List all fulfillment policies |
| `updateFulfillmentPolicy(policyId, policy)` | Update a fulfillment policy |
| `deleteFulfillmentPolicy(policyId)` | Delete a fulfillment policy |
| `createPaymentPolicy(policy)` | Create a payment policy |
| `getPaymentPolicy(policyId)` | Get payment policy by ID |
| `getPaymentPolicies(marketplaceId)` | List all payment policies |
| `updatePaymentPolicy(policyId, policy)` | Update a payment policy |
| `deletePaymentPolicy(policyId)` | Delete a payment policy |
| `createReturnPolicy(policy)` | Create a return policy |
| `getReturnPolicy(policyId)` | Get return policy by ID |
| `getReturnPolicies(marketplaceId)` | List all return policies |
| `updateReturnPolicy(policyId, policy)` | Update a return policy |
| `deleteReturnPolicy(policyId)` | Delete a return policy |
| `getPrivileges()` | Get seller privileges and selling limits |

### TaxonomyClient Methods

| Method | Description |
|--------|-------------|
| `getDefaultCategoryTreeId(marketplaceId)` | Get default category tree ID for a marketplace |
| `getCategoryTree(categoryTreeId)` | Get the full category tree |
| `getCategorySubtree(params)` | Get a subtree starting from a category |
| `getCategorySuggestions(params)` | Get category suggestions based on keywords |
| `getExpiredCategories(categoryTreeId)` | Get expired category mappings |
| `getItemAspectsForCategory(params)` | Get aspects (attributes) for a leaf category |
| `fetchItemAspects(categoryTreeId)` | Fetch all aspects for all leaf categories |
| `getCompatibilityProperties(params)` | Get vehicle parts compatibility properties |
| `getCompatibilityPropertyValues(params)` | Get values for a compatibility property |

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
