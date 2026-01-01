export type {
  // Enums
  ComplianceType,
  ComplianceState,
  MarketplaceId,

  // Core types
  NameValueList,
  VariationDetails,
  AspectRecommendations,
  ProductRecommendation,
  CorrectiveRecommendations,
  ComplianceDetail,
  ComplianceViolation,

  // Response types
  ComplianceSummaryInfo,
  ComplianceSummary,
  PagedComplianceViolationCollection,
} from './violation.js';

// Full OpenAPI-generated types (for reference during development)
// These provide complete eBay Compliance API schema coverage
export * as Generated from './generated/index.js';
