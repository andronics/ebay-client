/**
 * eBay Inventory API Types
 *
 * This module exports curated, user-friendly types for the Inventory API,
 * plus the full auto-generated types from the OpenAPI spec.
 *
 * @example
 * ```typescript
 * // Import curated types (recommended)
 * import type { InventoryItem, Offer, CreateOfferRequest } from '@andronics/ebay-client/types/inventory';
 *
 * // Import full generated types (for advanced use cases)
 * import { Generated } from '@andronics/ebay-client/types/inventory';
 * type FullInventoryItem = Generated.components['schemas']['InventoryItemWithSkuLocaleGroupid'];
 * ```
 */

// Inventory Item types
export type {
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
} from './item.js';

// Offer types
export type {
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
} from './offer.js';

// Full OpenAPI-generated types (for reference/advanced use)
export * as Generated from './generated/index.js';
