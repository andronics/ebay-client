/**
 * Fulfillment Policy types for eBay Account API.
 */

/** Time duration unit for handling time and shipping. */
export type TimeDurationUnit = 'YEAR' | 'MONTH' | 'DAY' | 'HOUR' | 'CALENDAR_DAY' | 'BUSINESS_DAY';

/** Time duration for handling time or return period. */
export interface TimeDuration {
  unit?: TimeDurationUnit;
  value?: number;
}

/** Shipping option type (domestic vs international). */
export type ShippingOptionType = 'DOMESTIC' | 'INTERNATIONAL';

/** Shipping cost type (flat rate vs calculated). */
export type ShippingCostType = 'CALCULATED' | 'FLAT_RATE' | 'NOT_SPECIFIED';

/** Category type for policy applicability. */
export interface CategoryType {
  default?: boolean;
  name?: 'MOTORS_VEHICLES' | 'ALL_EXCLUDING_MOTORS_VEHICLES';
}

/** Region type for shipping locations. */
export type RegionType =
  | 'COUNTRY'
  | 'COUNTRY_REGION'
  | 'STATE_OR_PROVINCE'
  | 'WORLD_REGION'
  | 'WORLDWIDE';

/** A geographic region for shipping. */
export interface Region {
  regionName?: string;
  regionType?: RegionType;
}

/** Region set defining included/excluded shipping locations. */
export interface RegionSet {
  regionExcluded?: Region[];
  regionIncluded?: Region[];
}

/** Monetary amount with currency. */
export interface Amount {
  currency?: string;
  value?: string;
}

/** Shipping service configuration. */
export interface ShippingService {
  additionalShippingCost?: Amount;
  buyerResponsibleForPickup?: boolean;
  buyerResponsibleForShipping?: boolean;
  cashOnDeliveryFee?: Amount;
  freeShipping?: boolean;
  shippingCarrierCode?: string;
  shippingCost?: Amount;
  shippingServiceCode?: string;
  shipToLocations?: RegionSet;
  sortOrder?: number;
  surcharge?: Amount;
}

/** Shipping option with services and cost type. */
export interface ShippingOption {
  costType?: ShippingCostType;
  insuranceFee?: Amount;
  insuranceOffered?: boolean;
  optionType?: ShippingOptionType;
  packageHandlingCost?: Amount;
  rateTableId?: string;
  shippingDiscountProfileId?: string;
  shippingPromotionOffered?: boolean;
  shippingServices?: ShippingService[];
}

/** Fulfillment policy defining shipping options for a marketplace. */
export interface FulfillmentPolicy {
  categoryTypes?: CategoryType[];
  description?: string;
  freightShipping?: boolean;
  fulfillmentPolicyId?: string;
  globalShipping?: boolean;
  handlingTime?: TimeDuration;
  localPickup?: boolean;
  marketplaceId?: string;
  name?: string;
  pickupDropOff?: boolean;
  shippingOptions?: ShippingOption[];
  shipToLocations?: RegionSet;
}

/** Request body for creating/updating a fulfillment policy. */
export interface FulfillmentPolicyRequest {
  categoryTypes?: CategoryType[];
  description?: string;
  freightShipping?: boolean;
  globalShipping?: boolean;
  handlingTime?: TimeDuration;
  localPickup?: boolean;
  marketplaceId?: string;
  name?: string;
  pickupDropOff?: boolean;
  shippingOptions?: ShippingOption[];
  shipToLocations?: RegionSet;
}

/** Response when creating/updating a fulfillment policy. */
export interface SetFulfillmentPolicyResponse extends FulfillmentPolicy {
  warnings?: ErrorDetail[];
}

/** Response containing list of fulfillment policies. */
export interface FulfillmentPoliciesResponse {
  fulfillmentPolicies?: FulfillmentPolicy[];
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  prev?: string;
  total?: number;
}

/** Error detail from API response. */
export interface ErrorDetail {
  category?: string;
  domain?: string;
  errorId?: number;
  inputRefIds?: string[];
  longMessage?: string;
  message?: string;
  outputRefIds?: string[];
  parameters?: Array<{ name?: string; value?: string }>;
  subdomain?: string;
}
