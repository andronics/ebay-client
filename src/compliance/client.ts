import type { ComplianceClientConfig } from '../types/config.js';
import { BaseRestClient } from '../base/index.js';

import type {
  ComplianceType,
  ComplianceState,
  MarketplaceId,
  ComplianceSummary,
  PagedComplianceViolationCollection,
} from '../types/compliance/index.js';

/**
 * API path for the Compliance API.
 */
const API_PATH = '/sell/compliance/v1';

/**
 * Parameters for getListingViolationsSummary.
 */
export interface GetListingViolationsSummaryParams {
  /**
   * eBay marketplace ID (required header).
   * Identifies the seller's eBay marketplace.
   */
  marketplaceId: MarketplaceId;
  /**
   * Compliance type(s) to filter by.
   * Multiple values can be provided as an array.
   * If not specified, counts for all compliance types are returned.
   */
  complianceType?: ComplianceType | ComplianceType[];
}

/**
 * Parameters for getListingViolations.
 */
export interface GetListingViolationsParams {
  /**
   * eBay marketplace ID (required header).
   * Identifies the seller's eBay marketplace.
   */
  marketplaceId: MarketplaceId;
  /**
   * Compliance type to retrieve violations for (required).
   * Only one compliance type can be specified per call.
   */
  complianceType: ComplianceType;
  /**
   * Maximum number of violations to return per page.
   * Default: 100, Maximum: 200
   */
  limit?: number;
  /**
   * Zero-based offset for pagination.
   * Default: 0
   */
  offset?: number;
  /**
   * Filter by compliance state.
   * Use to retrieve only OUT_OF_COMPLIANCE or AT_RISK violations.
   */
  complianceState?: ComplianceState;
}

/**
 * Client for eBay Compliance API (REST-based).
 *
 * The Compliance API helps sellers identify and fix listing policy violations.
 * It provides two main operations:
 * - Get violation summary counts by marketplace and compliance type
 * - Get detailed listing violations for a specific compliance type
 *
 * @example
 * ```typescript
 * const client = new ComplianceClient({
 *   sandbox: false,
 *   auth: {
 *     type: 'oauth',
 *     accessToken: 'your-access-token',
 *   },
 * });
 *
 * // Get summary of violations
 * const summary = await client.getListingViolationsSummary({
 *   marketplaceId: 'EBAY_GB',
 * });
 *
 * // Get detailed violations for HTTPS compliance
 * const violations = await client.getListingViolations({
 *   marketplaceId: 'EBAY_GB',
 *   complianceType: 'HTTPS',
 *   limit: 50,
 * });
 * ```
 */
export class ComplianceClient extends BaseRestClient<ComplianceClientConfig> {
  constructor(config: ComplianceClientConfig) {
    super(config, API_PATH);
  }

  // ===========================================================================
  // Listing Violation Summary
  // ===========================================================================

  /**
   * Get a summary of listing violation counts.
   *
   * Returns the number of active listings violating one or more compliance types,
   * grouped by marketplace and compliance type combination.
   *
   * @param params - Query parameters including marketplace ID
   * @returns Violation count summary, or undefined if no violations found (204 response)
   *
   * @example
   * ```typescript
   * // Get all violation counts for UK marketplace
   * const summary = await client.getListingViolationsSummary({
   *   marketplaceId: 'EBAY_GB',
   * });
   *
   * // Get counts for specific compliance types
   * const summary = await client.getListingViolationsSummary({
   *   marketplaceId: 'EBAY_GB',
   *   complianceType: ['HTTPS', 'RETURNS_POLICY'],
   * });
   * ```
   */
  async getListingViolationsSummary(
    params: GetListingViolationsSummaryParams
  ): Promise<ComplianceSummary | undefined> {
    const queryParams = new URLSearchParams();

    if (params.complianceType) {
      const types = Array.isArray(params.complianceType)
        ? params.complianceType.join(',')
        : params.complianceType;
      queryParams.set('compliance_type', types);
    }

    const queryString = queryParams.toString();
    const path = `/listing_violation_summary${queryString ? `?${queryString}` : ''}`;

    return this.request<ComplianceSummary | undefined>('GET', path, {
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': params.marketplaceId,
      },
    });
  }

  // ===========================================================================
  // Listing Violations
  // ===========================================================================

  /**
   * Get detailed listing violations for a compliance type.
   *
   * Returns specific listing violations for the supported compliance types.
   * Violations are grouped by eBay listing ID.
   *
   * @param params - Query parameters including marketplace ID and compliance type
   * @returns Paginated list of violations, or undefined if none found (204 response)
   *
   * @remarks
   * - Maximum of 2000 violations returned per result set
   * - If total equals 2000, there may be more violations that need correction
   *   before additional ones are returned
   *
   * @example
   * ```typescript
   * // Get HTTPS violations
   * const violations = await client.getListingViolations({
   *   marketplaceId: 'EBAY_GB',
   *   complianceType: 'HTTPS',
   *   limit: 100,
   * });
   *
   * // Get only OUT_OF_COMPLIANCE violations
   * const outOfCompliance = await client.getListingViolations({
   *   marketplaceId: 'EBAY_GB',
   *   complianceType: 'OUTSIDE_EBAY_BUYING_AND_SELLING',
   *   complianceState: 'OUT_OF_COMPLIANCE',
   * });
   *
   * // Paginate through results
   * const page2 = await client.getListingViolations({
   *   marketplaceId: 'EBAY_GB',
   *   complianceType: 'RETURNS_POLICY',
   *   limit: 50,
   *   offset: 50,
   * });
   * ```
   */
  async getListingViolations(
    params: GetListingViolationsParams
  ): Promise<PagedComplianceViolationCollection | undefined> {
    const queryParams = new URLSearchParams();

    // Required parameter
    queryParams.set('compliance_type', params.complianceType);

    if (params.limit !== undefined) {
      queryParams.set('limit', String(Math.min(Math.max(1, params.limit), 200)));
    }
    if (params.offset !== undefined) {
      queryParams.set('offset', String(params.offset));
    }
    if (params.complianceState) {
      queryParams.set('filter', `complianceState:{${params.complianceState}}`);
    }

    const queryString = queryParams.toString();
    const path = `/listing_violation?${queryString}`;

    return this.request<PagedComplianceViolationCollection | undefined>('GET', path, {
      headers: {
        'X-EBAY-C-MARKETPLACE-ID': params.marketplaceId,
      },
    });
  }
}
