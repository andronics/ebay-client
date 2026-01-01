import { http, HttpResponse } from 'msw';

/**
 * eBay Compliance API endpoints (sandbox).
 */
const COMPLIANCE_API_URL = 'https://api.sandbox.ebay.com/sell/compliance/v1';

/**
 * Sample JSON responses for Compliance API operations.
 */
const responses = {
  getViolationsSummary: {
    violationSummaries: [
      {
        complianceType: 'HTTPS',
        listingCount: 5,
        marketplaceId: 'EBAY_GB',
      },
      {
        complianceType: 'OUTSIDE_EBAY_BUYING_AND_SELLING',
        listingCount: 3,
        marketplaceId: 'EBAY_GB',
      },
      {
        complianceType: 'RETURNS_POLICY',
        listingCount: 2,
        marketplaceId: 'EBAY_GB',
      },
    ],
  },

  getViolationsHttps: {
    href: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=HTTPS&limit=100',
    total: 2,
    limit: 100,
    offset: 0,
    listingViolations: [
      {
        complianceType: 'HTTPS',
        listingId: '123456789012',
        sku: 'TEST-SKU-001',
        violations: [
          {
            complianceState: 'OUT_OF_COMPLIANCE',
            message: 'Listing description contains non-secure HTTP links.',
            reasonCode: 'NON_SECURE_HTTP_LINK_IN_LISTING',
            violationData: [
              {
                name: 'NonSecureUrl',
                value: 'http://example.com/image.jpg',
              },
            ],
          },
        ],
      },
      {
        complianceType: 'HTTPS',
        listingId: '123456789013',
        sku: 'TEST-SKU-002',
        violations: [
          {
            complianceState: 'AT_RISK',
            message: 'Product data contains non-secure HTTP links.',
            reasonCode: 'NON_SECURE_HTTP_LINK_IN_PRODUCT',
          },
        ],
      },
    ],
  },

  getViolationsOutsideEbay: {
    href: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=OUTSIDE_EBAY_BUYING_AND_SELLING',
    total: 1,
    limit: 100,
    offset: 0,
    listingViolations: [
      {
        complianceType: 'OUTSIDE_EBAY_BUYING_AND_SELLING',
        listingId: '323456789012',
        violations: [
          {
            complianceState: 'OUT_OF_COMPLIANCE',
            message: 'Listing contains phone number.',
            reasonCode: 'PHONE_NUMBER_IN_LISTING',
          },
        ],
      },
    ],
  },

  getViolationsEmpty: {
    href: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=RETURNS_POLICY',
    total: 0,
    limit: 100,
    offset: 0,
    listingViolations: [],
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

  badRequest: {
    errors: [
      {
        errorId: 25001,
        domain: 'COMPLIANCE',
        category: 'REQUEST',
        message: 'Invalid compliance type',
        longMessage: 'The specified compliance type is not valid.',
      },
    ],
  },

  missingMarketplace: {
    errors: [
      {
        errorId: 25002,
        domain: 'COMPLIANCE',
        category: 'REQUEST',
        message: 'Missing marketplace ID',
        longMessage: 'The X-EBAY-C-MARKETPLACE-ID header is required.',
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
  query?: Record<string, string>;
  headers: Record<string, string>;
}> = [];

/**
 * Clear captured requests between tests.
 */
export function clearCapturedRequests() {
  capturedRequests.length = 0;
}

/**
 * MSW handlers for Compliance API.
 */
export const complianceHandlers = [
  // ===========================================================================
  // Listing Violation Summary
  // ===========================================================================

  // GET /listing_violation_summary
  http.get(`${COMPLIANCE_API_URL}/listing_violation_summary`, async ({ request }) => {
    const url = new URL(request.url);
    const complianceType = url.searchParams.get('compliance_type');
    const headers = captureHeaders(request);

    capturedRequests.push({
      method: 'GET',
      path: '/listing_violation_summary',
      query: complianceType ? { compliance_type: complianceType } : {},
      headers,
    });

    // Check for missing marketplace header
    if (!headers['x-ebay-c-marketplace-id']) {
      return HttpResponse.json(responses.missingMarketplace, { status: 400 });
    }

    return HttpResponse.json(responses.getViolationsSummary);
  }),

  // ===========================================================================
  // Listing Violations
  // ===========================================================================

  // GET /listing_violation
  http.get(`${COMPLIANCE_API_URL}/listing_violation`, async ({ request }) => {
    const url = new URL(request.url);
    const complianceType = url.searchParams.get('compliance_type');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    const filter = url.searchParams.get('filter');
    const headers = captureHeaders(request);

    capturedRequests.push({
      method: 'GET',
      path: '/listing_violation',
      query: {
        ...(complianceType ? { compliance_type: complianceType } : {}),
        ...(limit ? { limit } : {}),
        ...(offset ? { offset } : {}),
        ...(filter ? { filter } : {}),
      },
      headers,
    });

    // Check for missing marketplace header
    if (!headers['x-ebay-c-marketplace-id']) {
      return HttpResponse.json(responses.missingMarketplace, { status: 400 });
    }

    // Check for missing compliance_type (required)
    if (!complianceType) {
      return HttpResponse.json(responses.badRequest, { status: 400 });
    }

    // Return different responses based on compliance type
    switch (complianceType) {
      case 'HTTPS':
        return HttpResponse.json(responses.getViolationsHttps);
      case 'OUTSIDE_EBAY_BUYING_AND_SELLING':
        return HttpResponse.json(responses.getViolationsOutsideEbay);
      case 'RETURNS_POLICY':
        return HttpResponse.json(responses.getViolationsEmpty);
      default:
        return HttpResponse.json(responses.badRequest, { status: 400 });
    }
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
 * Handler that simulates a 401 unauthorized error for summary.
 */
export const unauthorizedSummaryHandler = http.get(
  `${COMPLIANCE_API_URL}/listing_violation_summary`,
  () => {
    return HttpResponse.json(responses.unauthorized, { status: 401 });
  }
);

/**
 * Handler that simulates a 401 unauthorized error for violations.
 */
export const unauthorizedViolationsHandler = http.get(
  `${COMPLIANCE_API_URL}/listing_violation`,
  () => {
    return HttpResponse.json(responses.unauthorized, { status: 401 });
  }
);

/**
 * Handler that simulates a 500 server error.
 */
export const error500Handler = http.get(`${COMPLIANCE_API_URL}/listing_violation_summary`, () => {
  return new HttpResponse(null, { status: 500 });
});
