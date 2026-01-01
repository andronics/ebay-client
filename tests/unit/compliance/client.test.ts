import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComplianceClient } from '../../../src/compliance/client.js';
import { ApiError } from '../../../src/errors/api-error.js';
import { EbayError } from '../../../src/errors/ebay-error.js';
import type { ComplianceClientConfig } from '../../../src/types/config.js';
import * as http from '../../../src/utils/http.js';
import * as fixtures from '../fixtures/compliance-responses.js';

// Mock the http module
vi.mock('../../../src/utils/http.js', async () => {
  const actual = await vi.importActual<typeof http>('../../../src/utils/http.js');
  return {
    ...actual,
    httpRequest: vi.fn(),
  };
});

const mockHttpRequest = vi.mocked(http.httpRequest);

// Valid auth config for testing
const validAuthConfig: ComplianceClientConfig['auth'] = {
  type: 'oauth',
  accessToken: 'test-access-token',
};

const createConfig = (overrides?: Partial<ComplianceClientConfig>): ComplianceClientConfig => ({
  sandbox: true,
  auth: validAuthConfig,
  ...overrides,
});

describe('ComplianceClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('creates client with valid config', () => {
      const client = new ComplianceClient(createConfig());
      expect(client).toBeInstanceOf(ComplianceClient);
    });

    it('validates OAuth config', () => {
      expect(() => {
        new ComplianceClient(
          createConfig({
            auth: {
              ...validAuthConfig,
              accessToken: '',
            },
          })
        );
      }).toThrow('OAuth config missing accessToken');
    });

    it('uses sandbox endpoint when sandbox is true', () => {
      const client = new ComplianceClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toContain('sandbox');
    });

    it('uses production endpoint when sandbox is false', () => {
      const client = new ComplianceClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).not.toContain('sandbox');
    });

    it('uses custom retry config', () => {
      const client = new ComplianceClient(
        createConfig({
          retry: { maxRetries: 5, delayMs: 2000 },
        })
      );
      expect(client).toBeDefined();
    });
  });

  describe('getBaseUrl', () => {
    it('returns sandbox endpoint', () => {
      const client = new ComplianceClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/sell/compliance/v1');
    });

    it('returns production endpoint', () => {
      const client = new ComplianceClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).toBe('https://api.ebay.com/sell/compliance/v1');
    });
  });

  describe('isSandbox', () => {
    it('returns true for sandbox config', () => {
      const client = new ComplianceClient(createConfig({ sandbox: true }));
      expect(client.isSandbox()).toBe(true);
    });

    it('returns false for production config', () => {
      const client = new ComplianceClient(createConfig({ sandbox: false }));
      expect(client.isSandbox()).toBe(false);
    });
  });

  describe('getListingViolationsSummary', () => {
    it('returns violation summary on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      const result = await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
      });

      expect(result?.violationSummaries).toHaveLength(3);
      expect(result?.violationSummaries?.[0].complianceType).toBe('HTTPS');
      expect(result?.violationSummaries?.[0].listingCount).toBe(5);
    });

    it('calls httpRequest with correct URL and marketplace header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        'https://api.sandbox.ebay.com/sell/compliance/v1/listing_violation_summary',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB',
          }),
        })
      );
    });

    it('includes single compliance type in query', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('compliance_type=HTTPS'),
        expect.any(Object)
      );
    });

    it('includes multiple compliance types in query', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
        complianceType: ['HTTPS', 'RETURNS_POLICY'],
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('compliance_type=HTTPS%2CRETURNS_POLICY'),
        expect.any(Object)
      );
    });

    it('returns empty summary when no violations found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_EMPTY,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_EMPTY),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      const result = await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
      });

      expect(result?.violationSummaries).toHaveLength(0);
    });
  });

  describe('getListingViolations', () => {
    it('returns violations on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      const result = await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
      });

      expect(result?.listingViolations).toHaveLength(2);
      expect(result?.total).toBe(2);
    });

    it('calls httpRequest with required compliance_type parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('compliance_type=HTTPS'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB',
          }),
        })
      );
    });

    it('includes limit parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        limit: 50,
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=50'),
        expect.any(Object)
      );
    });

    it('clamps limit to maximum 200', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        limit: 500,
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=200'),
        expect.any(Object)
      );
    });

    it('clamps limit to minimum 1', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        limit: -5,
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=1'),
        expect.any(Object)
      );
    });

    it('includes offset parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_WITH_PAGINATION,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_WITH_PAGINATION),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        offset: 50,
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('offset=50'),
        expect.any(Object)
      );
    });

    it('includes compliance state filter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        complianceState: 'OUT_OF_COMPLIANCE',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('filter=complianceState%3A%7BOUT_OF_COMPLIANCE%7D'),
        expect.any(Object)
      );
    });

    it('returns empty list when no violations found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_EMPTY,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_EMPTY),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      const result = await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
      });

      expect(result?.listingViolations).toHaveLength(0);
      expect(result?.total).toBe(0);
    });

    it('returns violations with variation details', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_WITH_VARIATION,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_WITH_VARIATION),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      const result = await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'ASPECTS_ADOPTION',
      });

      const violation = result?.listingViolations?.[0];
      expect(violation?.offerId).toBe('OFFER-12345678');
      expect(violation?.violations?.[0].variation?.sku).toBe('VARIATION-SKU-RED');
      expect(violation?.violations?.[0].correctiveRecommendations?.aspectRecommendations).toBeDefined();
    });
  });

  describe('request headers', () => {
    it('includes OAuth Authorization header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-access-token',
          }),
        })
      );
    });

    it('includes JSON Content-Type', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('includes JSON Accept header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: 'application/json',
          }),
        })
      );
    });

    it('includes marketplace header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_VIOLATIONS_SUMMARY_SUCCESS),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());
      await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_US',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          }),
        })
      );
    });
  });

  describe('error handling', () => {
    it('throws ApiError on non-OK response', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        data: fixtures.API_ERROR_UNAUTHORIZED,
        raw: JSON.stringify(fixtures.API_ERROR_UNAUTHORIZED),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.getListingViolationsSummary({
          marketplaceId: 'EBAY_GB',
        });
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect(caughtError?.message).toMatch(/invalid or expired/);
    });

    it('extracts error message from response', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: fixtures.API_ERROR_BAD_REQUEST,
        raw: JSON.stringify(fixtures.API_ERROR_BAD_REQUEST),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
        });
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect(caughtError?.message).toBe('The specified compliance type is not valid.');
    });

    it('uses shortMessage when longMessage missing', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: {
          errors: [{ message: 'Short message only' }],
        },
        raw: '{}',
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());

      await expect(
        client.getListingViolationsSummary({ marketplaceId: 'EBAY_GB' })
      ).rejects.toThrow('Short message only');
    });

    it('uses default message when no messages available', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        data: { errors: [{}] },
        raw: '{}',
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());

      await expect(
        client.getListingViolationsSummary({ marketplaceId: 'EBAY_GB' })
      ).rejects.toThrow('eBay API error');
    });

    it('propagates HTTP errors', async () => {
      mockHttpRequest.mockRejectedValueOnce(new EbayError('Network error'));

      const client = new ComplianceClient(createConfig());

      await expect(
        client.getListingViolationsSummary({ marketplaceId: 'EBAY_GB' })
      ).rejects.toThrow(EbayError);
    });

    it('includes path in ApiError operation', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: fixtures.API_ERROR_BAD_REQUEST,
        raw: JSON.stringify(fixtures.API_ERROR_BAD_REQUEST),
        headers: new Headers(),
      });

      const client = new ComplianceClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
        });
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect((caughtError as ApiError).operation).toContain('/listing_violation');
    });
  });
});
