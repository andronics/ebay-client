/**
 * Sample Inventory API JSON responses for testing.
 */

export const GET_INVENTORY_ITEM_SUCCESS = {
  sku: 'TEST-SKU-001',
  locale: 'en_GB',
  product: {
    title: 'Test Product',
    description: 'A test product description',
    aspects: {
      Brand: ['Test Brand'],
      Size: ['Medium'],
    },
    imageUrls: ['https://example.com/image.jpg'],
  },
  condition: 'NEW',
  availability: {
    shipToLocationAvailability: {
      quantity: 10,
    },
  },
};

export const GET_INVENTORY_ITEMS_SUCCESS = {
  href: 'https://api.ebay.com/sell/inventory/v1/inventory_item?limit=25',
  total: 2,
  limit: 25,
  offset: 0,
  inventoryItems: [
    {
      sku: 'TEST-SKU-001',
      product: { title: 'Test Product 1' },
      condition: 'NEW',
    },
    {
      sku: 'TEST-SKU-002',
      product: { title: 'Test Product 2' },
      condition: 'USED_EXCELLENT',
    },
  ],
};

export const GET_INVENTORY_ITEMS_EMPTY = {
  href: 'https://api.ebay.com/sell/inventory/v1/inventory_item?limit=25',
  total: 0,
  limit: 25,
  offset: 0,
  inventoryItems: [],
};

export const CREATE_OFFER_SUCCESS = {
  offerId: 'OFF-12345678',
  warnings: [],
};

export const GET_OFFER_SUCCESS = {
  offerId: 'OFF-12345678',
  sku: 'TEST-SKU-001',
  marketplaceId: 'EBAY_GB',
  format: 'FIXED_PRICE',
  availableQuantity: 10,
  categoryId: '11450',
  pricingSummary: {
    price: { value: '29.99', currency: 'GBP' },
  },
  listingPolicies: {
    fulfillmentPolicyId: 'FUL-001',
    paymentPolicyId: 'PAY-001',
    returnPolicyId: 'RET-001',
  },
  status: 'UNPUBLISHED',
};

export const GET_OFFERS_SUCCESS = {
  href: 'https://api.ebay.com/sell/inventory/v1/offer?limit=25',
  total: 2,
  limit: 25,
  offset: 0,
  offers: [
    {
      offerId: 'OFF-12345678',
      sku: 'TEST-SKU-001',
      marketplaceId: 'EBAY_GB',
      status: 'PUBLISHED',
    },
    {
      offerId: 'OFF-12345679',
      sku: 'TEST-SKU-002',
      marketplaceId: 'EBAY_GB',
      status: 'UNPUBLISHED',
    },
  ],
};

export const GET_OFFERS_EMPTY = {
  href: 'https://api.ebay.com/sell/inventory/v1/offer?limit=25',
  total: 0,
  limit: 25,
  offset: 0,
  offers: [],
};

export const PUBLISH_OFFER_SUCCESS = {
  listingId: '123456789012',
  warnings: [],
};

export const API_ERROR_NOT_FOUND = {
  errors: [
    {
      errorId: 25001,
      domain: 'INVENTORY',
      category: 'REQUEST',
      message: 'Item not found',
      longMessage: 'The specified inventory item was not found.',
    },
  ],
};

export const API_ERROR_INVALID_SKU = {
  errors: [
    {
      errorId: 25002,
      domain: 'INVENTORY',
      category: 'REQUEST',
      message: 'Invalid SKU',
      longMessage: 'The SKU contains invalid characters.',
    },
  ],
};

export const API_ERROR_UNAUTHORIZED = {
  errors: [
    {
      errorId: 1001,
      domain: 'API_AUTH',
      category: 'REQUEST',
      message: 'Access denied',
      longMessage: 'Access token is invalid or expired.',
    },
  ],
};
