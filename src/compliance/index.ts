export {
  ComplianceClient,
  type GetListingViolationsSummaryParams,
  type GetListingViolationsParams,
} from './client.js';

// Re-export types for convenience
export type {
  ComplianceClientConfig,
  OAuthConfig,
} from '../types/config.js';

export type {
  ComplianceType,
  ComplianceState,
  MarketplaceId,
  NameValueList,
  VariationDetails,
  AspectRecommendations,
  ProductRecommendation,
  CorrectiveRecommendations,
  ComplianceDetail,
  ComplianceViolation,
  ComplianceSummaryInfo,
  ComplianceSummary,
  PagedComplianceViolationCollection,
} from '../types/compliance/index.js';
