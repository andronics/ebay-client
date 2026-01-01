/**
 * Consolidated client exports.
 *
 * This module exports all eBay API clients and their associated types.
 */

// ============================================================================
// Client Classes
// ============================================================================

export { TradingClient } from './trading.js';
export { FulfillmentClient } from './fulfillment.js';
export { InventoryClient } from './inventory.js';
export { AccountClient } from './account.js';
export { TaxonomyClient } from './taxonomy.js';
export { ComplianceClient } from './compliance.js';

// ============================================================================
// Parameter Types
// ============================================================================

// Fulfillment
export type {
  GetOrdersParams,
  GetOrderParams,
  CreateShipmentParams,
} from './fulfillment.js';

// Inventory
export type {
  GetInventoryItemsParams,
  GetOffersParams,
} from './inventory.js';

// Taxonomy
export type {
  GetCategorySubtreeParams,
  GetCategorySuggestionsParams,
  GetItemAspectsForCategoryParams,
  GetCompatibilityPropertiesParams,
  GetCompatibilityPropertyValuesParams,
} from './taxonomy.js';

// Compliance
export type {
  GetListingViolationsSummaryParams,
  GetListingViolationsParams,
} from './compliance.js';

// ============================================================================
// Config Types
// ============================================================================

export type {
  TradingClientConfig,
  FulfillmentClientConfig,
  InventoryClientConfig,
  AccountClientConfig,
  TaxonomyClientConfig,
  ComplianceClientConfig,
  AuthNAuthConfig,
  OAuthConfig,
} from '../types/config.js';

// ============================================================================
// Trading Types
// ============================================================================

export type {
  // Common
  AckCodeType,
  BaseResponse,
  ErrorType,
  AmountType,
  CategoryType as TradingCategoryType,
  ItemSpecificsType,
  ShippingDetailsType,
  FeesType,
  // Requests
  AddItemRequest,
  VerifyAddItemRequest,
  ReviseItemRequest,
  EndItemRequest,
  GetItemRequest,
  SetNotificationPreferencesRequest,
  GetNotificationPreferencesRequest,
  // Responses
  GetTokenStatusResponse,
  AddItemResponse,
  ReviseItemResponse,
  EndItemResponse,
  GetItemResponse,
  SetNotificationPreferencesResponse,
  GetNotificationPreferencesResponse,
} from '../types/trading/index.js';

// ============================================================================
// Fulfillment Types
// ============================================================================

export type {
  Order,
  OrderSearchResponse,
  OrderStatusType,
  PaymentStatusType,
  FulfillmentStatusType,
  Amount as FulfillmentAmount,
  Address,
  Contact,
  Buyer,
  LineItem,
  ShippingFulfillment,
  CreateShipmentRequest,
  CreateShipmentResponse,
  ShippingCarrierCode,
} from '../types/fulfillment/index.js';

export { ShippingCarriers } from '../types/fulfillment/index.js';

// ============================================================================
// Inventory Types
// ============================================================================

export type {
  // Item types
  ConditionEnum,
  PackageType,
  WeightUnitOfMeasure,
  LengthUnitOfMeasure,
  Amount as InventoryAmount,
  Aspects,
  Product,
  Dimensions,
  Weight,
  PackageWeightAndSize,
  TimeDuration as InventoryTimeDuration,
  AvailabilityDistribution,
  ShipToLocationAvailability,
  PickupAtLocationAvailability,
  Availability,
  InventoryItem,
  CreateOrReplaceInventoryItemRequest,
  InventoryItemsResponse,
  // Offer types
  OfferStatusEnum,
  FormatType,
  MarketplaceIdEnum,
  ListingDurationEnum,
  PricingSummary,
  ShippingCostOverride,
  BestOffer,
  ListingPolicies,
  Tax,
  ListingDetails,
  Offer,
  CreateOfferRequest,
  CreateOfferResponse,
  UpdateOfferRequest,
  PublishOfferResponse,
  OffersResponse,
} from '../types/inventory/index.js';

// ============================================================================
// Account Types
// ============================================================================

export type {
  // Fulfillment Policy
  FulfillmentPolicy,
  FulfillmentPolicyRequest,
  SetFulfillmentPolicyResponse,
  FulfillmentPoliciesResponse,
  // Payment Policy
  PaymentPolicy,
  PaymentPolicyRequest,
  SetPaymentPolicyResponse,
  PaymentPoliciesResponse,
  // Return Policy
  ReturnPolicy,
  ReturnPolicyRequest,
  SetReturnPolicyResponse,
  ReturnPoliciesResponse,
  // Privilege
  SellingPrivileges,
  SellingLimit,
  // Common types
  TimeDuration as AccountTimeDuration,
  CategoryType as AccountCategoryType,
  ShippingOption,
  Amount as AccountAmount,
} from '../types/account/index.js';

// ============================================================================
// Taxonomy Types
// ============================================================================

export type {
  // Category Tree types
  MarketplaceId as TaxonomyMarketplaceId,
  BaseCategoryTree,
  Category,
  CategoryTreeNode,
  CategoryTree,
  CategorySubtree,
  AncestorReference,
  CategorySuggestion,
  CategorySuggestionResponse,
  ExpiredCategory,
  ExpiredCategoriesResponse,
  // Aspect types
  AspectDataType,
  AspectMode,
  AspectUsage,
  ItemToAspectCardinality,
  AspectAdvancedDataType,
  AspectApplicableTo,
  ValueConstraint,
  AspectValue,
  RelevanceIndicator,
  AspectConstraint,
  Aspect,
  AspectMetadata,
  CategoryAspect,
  GetCategoriesAspectResponse,
  // Compatibility types
  CompatibilityProperty,
  GetCompatibilityPropertiesResponse,
  CompatibilityPropertyValue,
  GetCompatibilityPropertyValuesResponse,
} from '../types/taxonomy/index.js';

// ============================================================================
// Compliance Types
// ============================================================================

export type {
  ComplianceType,
  ComplianceState,
  MarketplaceId as ComplianceMarketplaceId,
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
