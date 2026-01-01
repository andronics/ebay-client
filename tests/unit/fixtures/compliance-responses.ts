/**
 * Sample Compliance API JSON responses for testing.
 */

export const GET_VIOLATIONS_SUMMARY_SUCCESS = {
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
};

export const GET_VIOLATIONS_SUMMARY_EMPTY = {
  violationSummaries: [],
};

export const GET_VIOLATIONS_SUCCESS = {
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
          violationData: [
            {
              name: 'NonSecureUrl',
              value: 'http://example.com/product.jpg',
            },
          ],
        },
      ],
    },
  ],
};

export const GET_VIOLATIONS_WITH_PAGINATION = {
  href: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=HTTPS&limit=50&offset=50',
  total: 150,
  limit: 50,
  offset: 50,
  next: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=HTTPS&limit=50&offset=100',
  prev: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=HTTPS&limit=50&offset=0',
  listingViolations: [
    {
      complianceType: 'HTTPS',
      listingId: '223456789012',
      violations: [
        {
          complianceState: 'OUT_OF_COMPLIANCE',
          message: 'Listing description contains non-secure HTTP links.',
          reasonCode: 'NON_SECURE_HTTP_LINK_IN_LISTING',
        },
      ],
    },
  ],
};

export const GET_VIOLATIONS_OUTSIDE_EBAY = {
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
          violationData: [
            {
              name: 'PhoneNumber',
              value: '+44 123 456 7890',
            },
          ],
        },
        {
          complianceState: 'OUT_OF_COMPLIANCE',
          message: 'Listing contains email address.',
          reasonCode: 'EMAIL_ADDRESS_IN_LISTING',
          violationData: [
            {
              name: 'EmailAddress',
              value: 'seller@example.com',
            },
          ],
        },
      ],
    },
  ],
};

export const GET_VIOLATIONS_WITH_VARIATION = {
  href: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=ASPECTS_ADOPTION',
  total: 1,
  limit: 100,
  offset: 0,
  listingViolations: [
    {
      complianceType: 'ASPECTS_ADOPTION',
      listingId: '423456789012',
      sku: 'PARENT-SKU',
      offerId: 'OFFER-12345678',
      violations: [
        {
          complianceState: 'AT_RISK',
          message: 'Missing required aspects for variation.',
          reasonCode: 'MISSING_OR_INVALID_REQUIRED_ASPECTS',
          variation: {
            sku: 'VARIATION-SKU-RED',
            variationAspects: [
              { name: 'Color', value: 'Red' },
              { name: 'Size', value: 'Large' },
            ],
          },
          violationData: [
            { name: 'Brand', value: '' },
          ],
          correctiveRecommendations: {
            aspectRecommendations: [
              {
                localizedAspectName: 'Brand',
                suggestedValues: ['Generic', 'Unbranded'],
              },
            ],
          },
        },
      ],
    },
  ],
};

export const GET_VIOLATIONS_EMPTY = {
  href: 'https://api.ebay.com/sell/compliance/v1/listing_violation?compliance_type=HTTPS',
  total: 0,
  limit: 100,
  offset: 0,
  listingViolations: [],
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

export const API_ERROR_BAD_REQUEST = {
  errors: [
    {
      errorId: 25001,
      domain: 'COMPLIANCE',
      category: 'REQUEST',
      message: 'Invalid compliance type',
      longMessage: 'The specified compliance type is not valid.',
    },
  ],
};

export const API_ERROR_MISSING_MARKETPLACE = {
  errors: [
    {
      errorId: 25002,
      domain: 'COMPLIANCE',
      category: 'REQUEST',
      message: 'Missing marketplace ID',
      longMessage: 'The X-EBAY-C-MARKETPLACE-ID header is required.',
    },
  ],
};
