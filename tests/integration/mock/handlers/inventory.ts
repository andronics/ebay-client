import { http, HttpResponse } from 'msw';

/**
 * eBay Inventory API endpoints (sandbox).
 */
const INVENTORY_API_URL = 'https://api.sandbox.ebay.com/sell/inventory/v1';

/**
 * Sample JSON responses for Inventory API operations.
 */
const responses = {
  getInventoryItem: {
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
  },

  getInventoryItems: {
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
  },

  createOffer: {
    offerId: 'OFF-12345678',
    warnings: [],
  },

  getOffer: {
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
  },

  getOffers: {
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
  },

  publishOffer: {
    listingId: '123456789012',
    warnings: [],
  },

  notFound: {
    errors: [
      {
        errorId: 25001,
        domain: 'INVENTORY',
        category: 'REQUEST',
        message: 'Item not found',
        longMessage: 'The specified inventory item was not found.',
      },
    ],
  },

  unauthorized: {
    errors: [
      {
        errorId: 1001,
        domain: 'API_AUTH',
        category: 'REQUEST',
        message: 'Access denied',
        longMessage: 'Access token is invalid or expired.',
      },
    ],
  },
};

/**
 * Tracked requests for assertion in tests.
 */
export const capturedRequests: Array<{
  method: string;
  path: string;
  body?: unknown;
  headers: Record<string, string>;
}> = [];

/**
 * Clear captured requests between tests.
 */
export function clearCapturedRequests() {
  capturedRequests.length = 0;
}

/**
 * MSW handlers for Inventory API.
 */
export const inventoryHandlers = [
  // GET /inventory_item/:sku
  http.get(`${INVENTORY_API_URL}/inventory_item/:sku`, async ({ request, params }) => {
    const sku = params.sku as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'GET', path: `/inventory_item/${sku}`, headers });

    if (sku === 'NOT-FOUND-SKU') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return HttpResponse.json({ ...responses.getInventoryItem, sku });
  }),

  // PUT /inventory_item/:sku
  http.put(`${INVENTORY_API_URL}/inventory_item/:sku`, async ({ request, params }) => {
    const sku = params.sku as string;
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'PUT', path: `/inventory_item/${sku}`, body, headers });

    return new HttpResponse(null, { status: 204 });
  }),

  // DELETE /inventory_item/:sku
  http.delete(`${INVENTORY_API_URL}/inventory_item/:sku`, async ({ request, params }) => {
    const sku = params.sku as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'DELETE', path: `/inventory_item/${sku}`, headers });

    if (sku === 'NOT-FOUND-SKU') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // GET /inventory_item (list)
  http.get(`${INVENTORY_API_URL}/inventory_item`, async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    const headers = captureHeaders(request);
    capturedRequests.push({
      method: 'GET',
      path: `/inventory_item`,
      body: { limit, offset },
      headers
    });

    return HttpResponse.json(responses.getInventoryItems);
  }),

  // POST /offer
  http.post(`${INVENTORY_API_URL}/offer`, async ({ request }) => {
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'POST', path: '/offer', body, headers });

    return HttpResponse.json(responses.createOffer, { status: 201 });
  }),

  // GET /offer/:offerId
  http.get(`${INVENTORY_API_URL}/offer/:offerId`, async ({ request, params }) => {
    const offerId = params.offerId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'GET', path: `/offer/${offerId}`, headers });

    if (offerId === 'NOT-FOUND-OFFER') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return HttpResponse.json({ ...responses.getOffer, offerId });
  }),

  // PUT /offer/:offerId
  http.put(`${INVENTORY_API_URL}/offer/:offerId`, async ({ request, params }) => {
    const offerId = params.offerId as string;
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'PUT', path: `/offer/${offerId}`, body, headers });

    return new HttpResponse(null, { status: 204 });
  }),

  // POST /offer/:offerId/publish
  http.post(`${INVENTORY_API_URL}/offer/:offerId/publish`, async ({ request, params }) => {
    const offerId = params.offerId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'POST', path: `/offer/${offerId}/publish`, headers });

    return HttpResponse.json(responses.publishOffer);
  }),

  // GET /offer (list by SKU)
  http.get(`${INVENTORY_API_URL}/offer`, async ({ request }) => {
    const url = new URL(request.url);
    const sku = url.searchParams.get('sku');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    const headers = captureHeaders(request);
    capturedRequests.push({
      method: 'GET',
      path: '/offer',
      body: { sku, limit, offset },
      headers
    });

    return HttpResponse.json(responses.getOffers);
  }),
];

/**
 * Helper to capture request headers.
 */
function captureHeaders(request: Request): Record<string, string> {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}

/**
 * Handler that simulates a 401 unauthorized error.
 */
export const unauthorizedHandler = http.get(`${INVENTORY_API_URL}/inventory_item/:sku`, () => {
  return HttpResponse.json(responses.unauthorized, { status: 401 });
});

/**
 * Handler that simulates a 500 server error.
 */
export const error500Handler = http.get(`${INVENTORY_API_URL}/inventory_item/:sku`, () => {
  return new HttpResponse(null, { status: 500 });
});

/**
 * Handler that simulates a 429 rate limit.
 */
export const rateLimitHandler = http.get(`${INVENTORY_API_URL}/inventory_item/:sku`, () => {
  return new HttpResponse(null, { status: 429 });
});
