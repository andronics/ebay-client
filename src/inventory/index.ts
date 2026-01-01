export {
  InventoryClient,
  type GetInventoryItemsParams,
  type GetOffersParams,
} from './client.js';

// Re-export types for convenience
export type {
  InventoryClientConfig,
  OAuthConfig,
} from '../types/config.js';

export type {
  // Item types
  ConditionEnum,
  PackageType,
  WeightUnitOfMeasure,
  LengthUnitOfMeasure,
  Amount,
  Aspects,
  Product,
  Dimensions,
  Weight,
  PackageWeightAndSize,
  TimeDuration,
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
