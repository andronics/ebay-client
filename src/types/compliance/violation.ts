/**
 * Compliance API violation types.
 *
 * These types represent listing violations and compliance states
 * returned by the eBay Compliance API.
 */

// =============================================================================
// Enums as Union Types
// =============================================================================

/**
 * Compliance type enumeration.
 *
 * Identifies the type of policy violation for listings.
 *
 * @remarks
 * Note: ASPECTS_ADOPTION is deprecated and will be decommissioned on September 9th, 2025.
 */
export type ComplianceType =
  | 'ASPECTS_ADOPTION'
  | 'HTTPS'
  | 'OUTSIDE_EBAY_BUYING_AND_SELLING'
  | 'PRODUCT_ADOPTION'
  | 'PRODUCT_ADOPTION_CONFORMANCE'
  | 'RETURNS_POLICY';

/**
 * Compliance state enumeration.
 *
 * Indicates whether a listing is out of compliance or at risk.
 */
export type ComplianceState = 'OUT_OF_COMPLIANCE' | 'AT_RISK';

/**
 * eBay marketplace identifiers for Compliance API.
 */
export type MarketplaceId =
  | 'EBAY_US'
  | 'EBAY_GB'
  | 'EBAY_DE'
  | 'EBAY_AU'
  | 'EBAY_AT'
  | 'EBAY_BE_FR'
  | 'EBAY_BE_NL'
  | 'EBAY_CA'
  | 'EBAY_CH'
  | 'EBAY_ES'
  | 'EBAY_FR'
  | 'EBAY_HK'
  | 'EBAY_IE'
  | 'EBAY_IN'
  | 'EBAY_IT'
  | 'EBAY_MY'
  | 'EBAY_NL'
  | 'EBAY_PH'
  | 'EBAY_PL'
  | 'EBAY_SG'
  | 'EBAY_TW';

// =============================================================================
// Core Types
// =============================================================================

/**
 * Name-value pair for aspect data and violation details.
 */
export interface NameValueList {
  /** The name of the aspect or information category */
  name?: string;
  /** The value of the aspect or information category */
  value?: string;
}

/**
 * Details of a product variation within a multi-variation listing.
 */
export interface VariationDetails {
  /** Seller-defined SKU for the variation */
  sku?: string;
  /** Aspects that define this specific variation (e.g., color, size) */
  variationAspects?: NameValueList[];
}

/**
 * Recommended aspect values to fix ASPECTS_ADOPTION violations.
 */
export interface AspectRecommendations {
  /** Localized name of the item aspect */
  localizedAspectName?: string;
  /** Suggested valid values for the aspect */
  suggestedValues?: string[];
}

/**
 * Recommended eBay catalog product for PRODUCT_ADOPTION violations.
 *
 * @remarks
 * Product adoption is not currently enforced, so this will not be returned.
 */
export interface ProductRecommendation {
  /** eBay Product ID (ePID) of the recommended catalog product */
  epid?: string;
}

/**
 * Corrective recommendations to fix listing violations.
 */
export interface CorrectiveRecommendations {
  /** Recommended aspects for ASPECTS_ADOPTION violations */
  aspectRecommendations?: AspectRecommendations[];
  /** Recommended product for PRODUCT_ADOPTION violations (not currently returned) */
  productRecommendation?: ProductRecommendation;
}

/**
 * Detailed information about a specific listing violation.
 */
export interface ComplianceDetail {
  /**
   * Compliance state of the violation.
   *
   * - OUT_OF_COMPLIANCE: Prevents revising listing until fixed
   * - AT_RISK: Should be fixed to prevent future blocking
   */
  complianceState?: ComplianceState;
  /** Recommendations for fixing the violation */
  correctiveRecommendations?: CorrectiveRecommendations;
  /** Human-readable description of the violation */
  message?: string;
  /**
   * Reason code identifying the specific violation type.
   *
   * Common values:
   * - MISSING_OR_INVALID_REQUIRED_ASPECTS
   * - MISSING_OR_INVALID_PREFERRED_ASPECTS
   * - NON_SECURE_HTTP_LINK_IN_LISTING
   * - UNAPPROVED_DOMAIN_WEBLINK_IN_LISTING
   * - PHONE_NUMBER_IN_LISTING
   * - EMAIL_ADDRESS_IN_LISTING
   * - UNSUPPORTED_RETURNS_PERIOD
   */
  reasonCode?: string;
  /** Variation details if violation is for a specific variation */
  variation?: VariationDetails;
  /** Additional violation data (e.g., missing aspects) */
  violationData?: NameValueList[];
}

/**
 * Compliance violation for an eBay listing.
 */
export interface ComplianceViolation {
  /** Type of compliance violation */
  complianceType?: ComplianceType;
  /** eBay listing ID with the violation(s) */
  listingId?: string;
  /** Offer ID (only for Inventory API listings) */
  offerId?: string;
  /** Seller-defined SKU value */
  sku?: string;
  /** Array of violations for this listing */
  violations?: ComplianceDetail[];
}

// =============================================================================
// Response Types
// =============================================================================

/**
 * Violation count summary for a specific marketplace and compliance type.
 */
export interface ComplianceSummaryInfo {
  /** Type of compliance violation */
  complianceType?: ComplianceType;
  /** Number of listings with violations */
  listingCount?: number;
  /** eBay marketplace ID */
  marketplaceId?: MarketplaceId;
}

/**
 * Response from getListingViolationsSummary.
 */
export interface ComplianceSummary {
  /** Array of violation counts by marketplace and compliance type */
  violationSummaries?: ComplianceSummaryInfo[];
}

/**
 * Paginated response from getListingViolations.
 */
export interface PagedComplianceViolationCollection {
  /** URI of the current request */
  href?: string;
  /** Maximum violations per page (default: 100, max: 200) */
  limit?: number;
  /** Array of listing violations */
  listingViolations?: ComplianceViolation[];
  /** URI for next page of results */
  next?: string;
  /** Zero-based offset of current page */
  offset?: number;
  /** URI for previous page of results */
  prev?: string;
  /**
   * Total number of violations.
   *
   * @remarks
   * Maximum returned value is 2000. If total equals 2000,
   * there may be more violations that require correction
   * before additional ones are returned.
   */
  total?: number;
}
