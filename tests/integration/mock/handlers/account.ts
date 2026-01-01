import { http, HttpResponse } from 'msw';

/**
 * eBay Account API endpoints (sandbox).
 */
const ACCOUNT_API_URL = 'https://api.sandbox.ebay.com/sell/account/v1';

/**
 * Sample JSON responses for Account API operations.
 */
const responses = {
  getFulfillmentPolicy: {
    fulfillmentPolicyId: 'FUL-12345678',
    name: 'Standard UK Shipping',
    marketplaceId: 'EBAY_GB',
    categoryTypes: [{ name: 'ALL_EXCLUDING_MOTORS_VEHICLES', default: true }],
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
            freeShipping: false,
          },
        ],
      },
    ],
  },

  getFulfillmentPolicies: {
    total: 2,
    fulfillmentPolicies: [
      {
        fulfillmentPolicyId: 'FUL-12345678',
        name: 'Standard UK Shipping',
        marketplaceId: 'EBAY_GB',
      },
      {
        fulfillmentPolicyId: 'FUL-87654321',
        name: 'Express UK Shipping',
        marketplaceId: 'EBAY_GB',
      },
    ],
  },

  createFulfillmentPolicy: {
    fulfillmentPolicyId: 'FUL-NEW-12345',
    name: 'New Shipping Policy',
    marketplaceId: 'EBAY_GB',
    warnings: [],
  },

  getPaymentPolicy: {
    paymentPolicyId: 'PAY-12345678',
    name: 'Standard Payment',
    marketplaceId: 'EBAY_GB',
    categoryTypes: [{ name: 'ALL_EXCLUDING_MOTORS_VEHICLES', default: true }],
    immediatePay: true,
    paymentMethods: [],
  },

  getPaymentPolicies: {
    total: 2,
    paymentPolicies: [
      {
        paymentPolicyId: 'PAY-12345678',
        name: 'Standard Payment',
        marketplaceId: 'EBAY_GB',
      },
      {
        paymentPolicyId: 'PAY-87654321',
        name: 'Motors Payment',
        marketplaceId: 'EBAY_GB',
      },
    ],
  },

  createPaymentPolicy: {
    paymentPolicyId: 'PAY-NEW-12345',
    name: 'New Payment Policy',
    marketplaceId: 'EBAY_GB',
    warnings: [],
  },

  getReturnPolicy: {
    returnPolicyId: 'RET-12345678',
    name: 'Standard Returns',
    marketplaceId: 'EBAY_GB',
    categoryTypes: [{ name: 'ALL_EXCLUDING_MOTORS_VEHICLES', default: true }],
    returnsAccepted: true,
    returnPeriod: { unit: 'DAY', value: 30 },
    returnShippingCostPayer: 'BUYER',
    refundMethod: 'MONEY_BACK',
  },

  getReturnPolicies: {
    total: 2,
    returnPolicies: [
      {
        returnPolicyId: 'RET-12345678',
        name: 'Standard Returns',
        marketplaceId: 'EBAY_GB',
      },
      {
        returnPolicyId: 'RET-87654321',
        name: 'Extended Returns',
        marketplaceId: 'EBAY_GB',
      },
    ],
  },

  createReturnPolicy: {
    returnPolicyId: 'RET-NEW-12345',
    name: 'New Return Policy',
    marketplaceId: 'EBAY_GB',
    warnings: [],
  },

  getPrivileges: {
    sellerRegistrationCompleted: true,
    sellingLimit: {
      amount: { value: '25000.00', currency: 'GBP' },
      quantity: 500,
    },
  },

  notFound: {
    errors: [
      {
        errorId: 25001,
        domain: 'ACCOUNT',
        category: 'REQUEST',
        message: 'Policy not found',
        longMessage: 'The specified policy was not found.',
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

  invalidPolicy: {
    errors: [
      {
        errorId: 25002,
        domain: 'ACCOUNT',
        category: 'REQUEST',
        message: 'Invalid policy',
        longMessage: 'The policy data is invalid.',
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
 * MSW handlers for Account API.
 */
export const accountHandlers = [
  // ===========================================================================
  // Fulfillment Policy
  // ===========================================================================

  // GET /fulfillment_policy/:policyId
  http.get(`${ACCOUNT_API_URL}/fulfillment_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'GET', path: `/fulfillment_policy/${policyId}`, headers });

    if (policyId === 'NOT-FOUND-ID') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return HttpResponse.json({ ...responses.getFulfillmentPolicy, fulfillmentPolicyId: policyId });
  }),

  // GET /fulfillment_policy (list)
  http.get(`${ACCOUNT_API_URL}/fulfillment_policy`, async ({ request }) => {
    const url = new URL(request.url);
    const marketplaceId = url.searchParams.get('marketplace_id');
    const headers = captureHeaders(request);
    capturedRequests.push({
      method: 'GET',
      path: '/fulfillment_policy',
      body: { marketplace_id: marketplaceId },
      headers,
    });

    return HttpResponse.json(responses.getFulfillmentPolicies);
  }),

  // POST /fulfillment_policy/
  http.post(`${ACCOUNT_API_URL}/fulfillment_policy/`, async ({ request }) => {
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'POST', path: '/fulfillment_policy/', body, headers });

    return HttpResponse.json(responses.createFulfillmentPolicy, { status: 201 });
  }),

  // PUT /fulfillment_policy/:policyId
  http.put(`${ACCOUNT_API_URL}/fulfillment_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'PUT', path: `/fulfillment_policy/${policyId}`, body, headers });

    return HttpResponse.json({ ...responses.createFulfillmentPolicy, fulfillmentPolicyId: policyId });
  }),

  // DELETE /fulfillment_policy/:policyId
  http.delete(`${ACCOUNT_API_URL}/fulfillment_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'DELETE', path: `/fulfillment_policy/${policyId}`, headers });

    if (policyId === 'NOT-FOUND-ID') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // ===========================================================================
  // Payment Policy
  // ===========================================================================

  // GET /payment_policy/:policyId
  http.get(`${ACCOUNT_API_URL}/payment_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'GET', path: `/payment_policy/${policyId}`, headers });

    if (policyId === 'NOT-FOUND-ID') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return HttpResponse.json({ ...responses.getPaymentPolicy, paymentPolicyId: policyId });
  }),

  // GET /payment_policy (list)
  http.get(`${ACCOUNT_API_URL}/payment_policy`, async ({ request }) => {
    const url = new URL(request.url);
    const marketplaceId = url.searchParams.get('marketplace_id');
    const headers = captureHeaders(request);
    capturedRequests.push({
      method: 'GET',
      path: '/payment_policy',
      body: { marketplace_id: marketplaceId },
      headers,
    });

    return HttpResponse.json(responses.getPaymentPolicies);
  }),

  // POST /payment_policy
  http.post(`${ACCOUNT_API_URL}/payment_policy`, async ({ request }) => {
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'POST', path: '/payment_policy', body, headers });

    return HttpResponse.json(responses.createPaymentPolicy, { status: 201 });
  }),

  // PUT /payment_policy/:policyId
  http.put(`${ACCOUNT_API_URL}/payment_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'PUT', path: `/payment_policy/${policyId}`, body, headers });

    return HttpResponse.json({ ...responses.createPaymentPolicy, paymentPolicyId: policyId });
  }),

  // DELETE /payment_policy/:policyId
  http.delete(`${ACCOUNT_API_URL}/payment_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'DELETE', path: `/payment_policy/${policyId}`, headers });

    if (policyId === 'NOT-FOUND-ID') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // ===========================================================================
  // Return Policy
  // ===========================================================================

  // GET /return_policy/:policyId
  http.get(`${ACCOUNT_API_URL}/return_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'GET', path: `/return_policy/${policyId}`, headers });

    if (policyId === 'NOT-FOUND-ID') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return HttpResponse.json({ ...responses.getReturnPolicy, returnPolicyId: policyId });
  }),

  // GET /return_policy (list)
  http.get(`${ACCOUNT_API_URL}/return_policy`, async ({ request }) => {
    const url = new URL(request.url);
    const marketplaceId = url.searchParams.get('marketplace_id');
    const headers = captureHeaders(request);
    capturedRequests.push({
      method: 'GET',
      path: '/return_policy',
      body: { marketplace_id: marketplaceId },
      headers,
    });

    return HttpResponse.json(responses.getReturnPolicies);
  }),

  // POST /return_policy/
  http.post(`${ACCOUNT_API_URL}/return_policy/`, async ({ request }) => {
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'POST', path: '/return_policy/', body, headers });

    return HttpResponse.json(responses.createReturnPolicy, { status: 201 });
  }),

  // PUT /return_policy/:policyId
  http.put(`${ACCOUNT_API_URL}/return_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const body = await request.json();
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'PUT', path: `/return_policy/${policyId}`, body, headers });

    return HttpResponse.json({ ...responses.createReturnPolicy, returnPolicyId: policyId });
  }),

  // DELETE /return_policy/:policyId
  http.delete(`${ACCOUNT_API_URL}/return_policy/:policyId`, async ({ request, params }) => {
    const policyId = params.policyId as string;
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'DELETE', path: `/return_policy/${policyId}`, headers });

    if (policyId === 'NOT-FOUND-ID') {
      return HttpResponse.json(responses.notFound, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // ===========================================================================
  // Privilege
  // ===========================================================================

  // GET /privilege
  http.get(`${ACCOUNT_API_URL}/privilege`, async ({ request }) => {
    const headers = captureHeaders(request);
    capturedRequests.push({ method: 'GET', path: '/privilege', headers });

    return HttpResponse.json(responses.getPrivileges);
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
export const unauthorizedHandler = http.get(`${ACCOUNT_API_URL}/privilege`, () => {
  return HttpResponse.json(responses.unauthorized, { status: 401 });
});

/**
 * Handler that simulates a 500 server error.
 */
export const error500Handler = http.get(`${ACCOUNT_API_URL}/privilege`, () => {
  return new HttpResponse(null, { status: 500 });
});

/**
 * Handler that simulates a 400 invalid policy error.
 */
export const invalidPolicyHandler = http.post(`${ACCOUNT_API_URL}/fulfillment_policy/`, () => {
  return HttpResponse.json(responses.invalidPolicy, { status: 400 });
});
