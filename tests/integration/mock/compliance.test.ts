import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { ComplianceClient } from '../../../src/clients/compliance.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { ComplianceClientConfig } from '../../../src/types/config.js';
import { server } from './setup.js';
import {
  capturedRequests,
  clearCapturedRequests,
  unauthorizedSummaryHandler,
  unauthorizedViolationsHandler,
} from './handlers/compliance.js';

/**
 * Test configuration for Compliance API integration tests.
 */
const testConfig: ComplianceClientConfig = {
  sandbox: true,
  auth: {
    type: 'oauth',
    accessToken: 'test-access-token',
  },
};

describe('Compliance API Integration (MSW)', () => {
  let client: ComplianceClient;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    client = new ComplianceClient(testConfig);
  });

  afterEach(() => {
    server.resetHandlers();
    clearCapturedRequests();
  });

  afterAll(() => {
    server.close();
  });

  // ===========================================================================
  // Listing Violation Summary Operations
  // ===========================================================================

  describe('Listing Violation Summary', () => {
    describe('getListingViolationsSummary', () => {
      it('retrieves violation summary for marketplace', async () => {
        const result = await client.getListingViolationsSummary({
          marketplaceId: 'EBAY_GB',
        });

        expect(result?.violationSummaries).toHaveLength(3);
        expect(result?.violationSummaries?.[0].complianceType).toBe('HTTPS');
        expect(result?.violationSummaries?.[0].listingCount).toBe(5);
      });

      it('sends GET request with marketplace header', async () => {
        await client.getListingViolationsSummary({
          marketplaceId: 'EBAY_GB',
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].path).toBe('/listing_violation_summary');
        expect(capturedRequests[0].headers['x-ebay-c-marketplace-id']).toBe('EBAY_GB');
      });

      it('sends correct authorization header', async () => {
        await client.getListingViolationsSummary({
          marketplaceId: 'EBAY_GB',
        });

        const headers = capturedRequests[0].headers;
        expect(headers['authorization']).toBe('Bearer test-access-token');
        expect(headers['content-type']).toBe('application/json');
      });

      it('includes compliance type filter in query', async () => {
        await client.getListingViolationsSummary({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
        });

        expect(capturedRequests[0].query).toMatchObject({
          compliance_type: 'HTTPS',
        });
      });

      it('includes multiple compliance types in query', async () => {
        await client.getListingViolationsSummary({
          marketplaceId: 'EBAY_GB',
          complianceType: ['HTTPS', 'RETURNS_POLICY'],
        });

        expect(capturedRequests[0].query?.compliance_type).toBe('HTTPS,RETURNS_POLICY');
      });
    });
  });

  // ===========================================================================
  // Listing Violations Operations
  // ===========================================================================

  describe('Listing Violations', () => {
    describe('getListingViolations', () => {
      it('retrieves HTTPS violations', async () => {
        const result = await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
        });

        expect(result?.listingViolations).toHaveLength(2);
        expect(result?.total).toBe(2);
        expect(result?.listingViolations?.[0].complianceType).toBe('HTTPS');
      });

      it('sends GET request with compliance type parameter', async () => {
        await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].path).toBe('/listing_violation');
        expect(capturedRequests[0].query?.compliance_type).toBe('HTTPS');
      });

      it('includes marketplace header', async () => {
        await client.getListingViolations({
          marketplaceId: 'EBAY_US',
          complianceType: 'HTTPS',
        });

        expect(capturedRequests[0].headers['x-ebay-c-marketplace-id']).toBe('EBAY_US');
      });

      it('includes limit parameter', async () => {
        await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
          limit: 50,
        });

        expect(capturedRequests[0].query?.limit).toBe('50');
      });

      it('includes offset parameter', async () => {
        await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
          offset: 100,
        });

        expect(capturedRequests[0].query?.offset).toBe('100');
      });

      it('includes compliance state filter', async () => {
        await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
          complianceState: 'OUT_OF_COMPLIANCE',
        });

        expect(capturedRequests[0].query?.filter).toBe('complianceState:{OUT_OF_COMPLIANCE}');
      });

      it('retrieves OUTSIDE_EBAY_BUYING_AND_SELLING violations', async () => {
        const result = await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'OUTSIDE_EBAY_BUYING_AND_SELLING',
        });

        expect(result?.listingViolations).toHaveLength(1);
        expect(result?.listingViolations?.[0].complianceType).toBe('OUTSIDE_EBAY_BUYING_AND_SELLING');
      });

      it('returns empty list when no violations found', async () => {
        const result = await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'RETURNS_POLICY',
        });

        expect(result?.listingViolations).toHaveLength(0);
        expect(result?.total).toBe(0);
      });
    });
  });

  // ===========================================================================
  // Error Handling
  // ===========================================================================

  describe('Error Handling', () => {
    it('throws ApiError on 401 unauthorized for summary', async () => {
      server.use(unauthorizedSummaryHandler);

      await expect(
        client.getListingViolationsSummary({ marketplaceId: 'EBAY_GB' })
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError on 401 unauthorized for violations', async () => {
      server.use(unauthorizedViolationsHandler);

      await expect(
        client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType: 'HTTPS',
        })
      ).rejects.toThrow(ApiError);
    });

    it('includes error details from API response', async () => {
      server.use(unauthorizedSummaryHandler);

      try {
        await client.getListingViolationsSummary({ marketplaceId: 'EBAY_GB' });
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toContain('Access token is invalid');
        expect(apiError.hasErrorCode('1001')).toBe(true);
      }
    });
  });

  // ===========================================================================
  // Client Configuration
  // ===========================================================================

  describe('Client Configuration', () => {
    it('uses sandbox endpoint', () => {
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/sell/compliance/v1');
    });

    it('reports sandbox mode', () => {
      expect(client.isSandbox()).toBe(true);
    });

    it('uses production endpoint when sandbox=false', () => {
      const prodClient = new ComplianceClient({
        ...testConfig,
        sandbox: false,
      });
      expect(prodClient.getBaseUrl()).toBe('https://api.ebay.com/sell/compliance/v1');
    });
  });

  // ===========================================================================
  // Complete Workflows
  // ===========================================================================

  describe('Complete Compliance Workflow', () => {
    it('get summary then fetch violations for each type', async () => {
      // Step 1: Get violation summary
      const summary = await client.getListingViolationsSummary({
        marketplaceId: 'EBAY_GB',
      });
      expect(summary?.violationSummaries).toBeDefined();

      // Step 2: Get violations for each type with violations
      const httpsViolations = await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
      });
      expect(httpsViolations?.listingViolations).toHaveLength(2);

      // Verify the workflow sequence
      expect(capturedRequests.map((r) => r.path)).toEqual([
        '/listing_violation_summary',
        '/listing_violation',
      ]);
    });

    it('get violations with pagination parameters', async () => {
      // Request first page
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        limit: 50,
        offset: 0,
      });

      // Request second page
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        limit: 50,
        offset: 50,
      });

      expect(capturedRequests).toHaveLength(2);
      expect(capturedRequests[0].query?.offset).toBe('0');
      expect(capturedRequests[1].query?.offset).toBe('50');
    });

    it('filter violations by compliance state', async () => {
      // Get only OUT_OF_COMPLIANCE violations
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        complianceState: 'OUT_OF_COMPLIANCE',
      });

      // Get only AT_RISK violations
      await client.getListingViolations({
        marketplaceId: 'EBAY_GB',
        complianceType: 'HTTPS',
        complianceState: 'AT_RISK',
      });

      expect(capturedRequests[0].query?.filter).toBe('complianceState:{OUT_OF_COMPLIANCE}');
      expect(capturedRequests[1].query?.filter).toBe('complianceState:{AT_RISK}');
    });

    it('check multiple compliance types in sequence', async () => {
      const types = ['HTTPS', 'OUTSIDE_EBAY_BUYING_AND_SELLING', 'RETURNS_POLICY'] as const;

      for (const complianceType of types) {
        await client.getListingViolations({
          marketplaceId: 'EBAY_GB',
          complianceType,
        });
      }

      expect(capturedRequests).toHaveLength(3);
      expect(capturedRequests.map((r) => r.query?.compliance_type)).toEqual([
        'HTTPS',
        'OUTSIDE_EBAY_BUYING_AND_SELLING',
        'RETURNS_POLICY',
      ]);
    });
  });
});
