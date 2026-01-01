/**
 * Sample Fulfillment API JSON responses for testing.
 */

export const GET_ORDERS_SUCCESS = {
  href: 'https://api.ebay.com/sell/fulfillment/v1/order?limit=50',
  total: 2,
  orders: [
    {
      orderId: '12-34567-89012',
      creationDate: '2024-01-15T10:30:00.000Z',
      lastModifiedDate: '2024-01-15T11:00:00.000Z',
      orderFulfillmentStatus: 'NOT_STARTED',
      orderPaymentStatus: 'PAID',
      pricingSummary: {
        total: { value: '29.99', currency: 'GBP' },
      },
      buyer: {
        username: 'testbuyer123',
      },
    },
    {
      orderId: '12-34567-89013',
      creationDate: '2024-01-14T09:00:00.000Z',
      lastModifiedDate: '2024-01-14T14:00:00.000Z',
      orderFulfillmentStatus: 'FULFILLED',
      orderPaymentStatus: 'PAID',
      pricingSummary: {
        total: { value: '49.99', currency: 'GBP' },
      },
    },
  ],
};

export const GET_ORDERS_EMPTY = {
  href: 'https://api.ebay.com/sell/fulfillment/v1/order?limit=50',
  total: 0,
  orders: [],
};

export const GET_ORDER_SUCCESS = {
  orderId: '12-34567-89012',
  creationDate: '2024-01-15T10:30:00.000Z',
  lastModifiedDate: '2024-01-15T11:00:00.000Z',
  orderFulfillmentStatus: 'NOT_STARTED',
  orderPaymentStatus: 'PAID',
  pricingSummary: {
    priceSubtotal: { value: '24.99', currency: 'GBP' },
    deliveryCost: { value: '5.00', currency: 'GBP' },
    total: { value: '29.99', currency: 'GBP' },
  },
  buyer: {
    username: 'testbuyer123',
    email: 'buyer@example.com',
  },
  fulfillmentStartInstructions: [
    {
      shippingStep: {
        shipTo: {
          fullName: 'Test Buyer',
          contactAddress: {
            addressLine1: '123 Test Street',
            city: 'London',
            postalCode: 'SW1A 1AA',
            country: 'GB',
          },
        },
      },
    },
  ],
  lineItems: [
    {
      lineItemId: '8888888888',
      title: 'Test Product',
      quantity: 1,
      lineItemCost: { value: '24.99', currency: 'GBP' },
      sku: 'TEST-SKU-001',
    },
  ],
};

export const GET_ORDER_ERROR = {
  errors: [
    {
      errorId: 25001,
      domain: 'FULFILLMENT',
      category: 'REQUEST',
      message: 'Order not found',
      longMessage: 'The specified order was not found.',
    },
  ],
};

export const CREATE_SHIPMENT_SUCCESS = {
  fulfillmentId: 'FUL-12345678',
  shipmentTrackingNumber: '1Z999AA10123456784',
  shippingCarrierCode: 'UPS',
  shippedDate: '2024-01-16T10:00:00.000Z',
  lineItems: [
    {
      lineItemId: '8888888888',
      quantity: 1,
    },
  ],
};

export const GET_SHIPMENTS_SUCCESS = {
  fulfillments: [
    {
      fulfillmentId: 'FUL-12345678',
      shipmentTrackingNumber: '1Z999AA10123456784',
      shippingCarrierCode: 'UPS',
      shippedDate: '2024-01-16T10:00:00.000Z',
    },
    {
      fulfillmentId: 'FUL-12345679',
      shipmentTrackingNumber: 'JD012345678GB',
      shippingCarrierCode: 'ROYAL_MAIL',
      shippedDate: '2024-01-17T09:00:00.000Z',
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

export const API_ERROR_RATE_LIMIT = {
  errors: [
    {
      errorId: 2001,
      domain: 'API_FULFILLMENT',
      category: 'BUSINESS',
      message: 'Rate limit exceeded',
      longMessage: 'You have exceeded the rate limit for this API.',
    },
  ],
};
