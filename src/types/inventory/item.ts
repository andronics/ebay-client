/**
 * Curated types for eBay Inventory API - Inventory Items
 */

/**
 * Condition enum for inventory items.
 */
export type ConditionEnum =
  | 'NEW'
  | 'LIKE_NEW'
  | 'NEW_OTHER'
  | 'NEW_WITH_DEFECTS'
  | 'MANUFACTURER_REFURBISHED'
  | 'CERTIFIED_REFURBISHED'
  | 'EXCELLENT_REFURBISHED'
  | 'VERY_GOOD_REFURBISHED'
  | 'GOOD_REFURBISHED'
  | 'SELLER_REFURBISHED'
  | 'USED_EXCELLENT'
  | 'USED_VERY_GOOD'
  | 'USED_GOOD'
  | 'USED_ACCEPTABLE'
  | 'FOR_PARTS_OR_NOT_WORKING';

/**
 * Package type for shipping.
 */
export type PackageType =
  | 'LETTER'
  | 'BULKY_GOODS'
  | 'CARAVAN'
  | 'CARS'
  | 'EUROPALLET'
  | 'EXPANDABLE_TOUGH_BAGS'
  | 'EXTRA_LARGE_PACK'
  | 'FURNITURE'
  | 'INDUSTRY_VEHICLES'
  | 'LARGE_CANADA_POSTBOX'
  | 'LARGE_CANADA_POST_BUBBLE_MAILER'
  | 'LARGE_ENVELOPE'
  | 'MAILING_BOX'
  | 'MEDIUM_CANADA_POST_BOX'
  | 'MEDIUM_CANADA_POST_BUBBLE_MAILER'
  | 'MOTORBIKES'
  | 'ONE_WAY_PALLET'
  | 'PACKAGE_THICK_ENVELOPE'
  | 'PADDED_BAGS'
  | 'PARCEL_OR_PADDED_ENVELOPE'
  | 'ROLL'
  | 'SMALL_CANADA_POST_BOX'
  | 'SMALL_CANADA_POST_BUBBLE_MAILER'
  | 'TOUGH_BAGS'
  | 'UPS_LETTER'
  | 'USPS_FLAT_RATE_ENVELOPE'
  | 'USPS_LARGE_PACK'
  | 'VERY_LARGE_PACK'
  | 'WINE_PAK';

/**
 * Weight unit of measurement.
 */
export type WeightUnitOfMeasure = 'POUND' | 'KILOGRAM' | 'OUNCE' | 'GRAM';

/**
 * Length unit of measurement.
 */
export type LengthUnitOfMeasure = 'INCH' | 'FEET' | 'CENTIMETER' | 'METER';

/**
 * Amount with currency.
 */
export interface Amount {
  /** Currency code (e.g., 'USD', 'GBP') */
  currency?: string;
  /** String representation of the value */
  value?: string;
}

/**
 * Product aspects (name/value pairs).
 */
export interface Aspects {
  [aspectName: string]: string[];
}

/**
 * Product details.
 */
export interface Product {
  /** Product title */
  title?: string;
  /** Product description */
  description?: string;
  /** Product aspects (Brand, Size, Color, etc.) */
  aspects?: Aspects;
  /** Brand name */
  brand?: string;
  /** Manufacturer Part Number */
  mpn?: string;
  /** European Article Numbers */
  ean?: string[];
  /** International Standard Book Numbers */
  isbn?: string[];
  /** Universal Product Codes */
  upc?: string[];
  /** URLs to product images */
  imageUrls?: string[];
  /** eBay Product ID */
  epid?: string;
}

/**
 * Package dimensions.
 */
export interface Dimensions {
  /** Height of the package */
  height?: number;
  /** Length of the package */
  length?: number;
  /** Width of the package */
  width?: number;
  /** Unit of measurement */
  unit?: LengthUnitOfMeasure;
}

/**
 * Package weight.
 */
export interface Weight {
  /** Weight value */
  value?: number;
  /** Unit of measurement */
  unit?: WeightUnitOfMeasure;
}

/**
 * Package weight and dimensions for shipping.
 */
export interface PackageWeightAndSize {
  /** Package dimensions */
  dimensions?: Dimensions;
  /** Package type */
  packageType?: PackageType;
  /** Package weight */
  weight?: Weight;
}

/**
 * Fulfillment time duration.
 */
export interface TimeDuration {
  /** Time unit (e.g., 'BUSINESS_DAY') */
  unit?: string;
  /** Number of time units */
  value?: number;
}

/**
 * Availability distribution across locations.
 */
export interface AvailabilityDistribution {
  /** Expected fulfillment time from this location */
  fulfillmentTime?: TimeDuration;
  /** Merchant location identifier */
  merchantLocationKey?: string;
  /** Quantity available at this location */
  quantity?: number;
}

/**
 * Ship-to-location availability.
 */
export interface ShipToLocationAvailability {
  /** Total quantity available for shipping */
  quantity?: number;
  /** Distribution across warehouse locations */
  availabilityDistributions?: AvailabilityDistribution[];
}

/**
 * Pickup at location availability (In-Store Pickup).
 */
export interface PickupAtLocationAvailability {
  /** Merchant location identifier */
  merchantLocationKey?: string;
  /** Quantity available for pickup */
  quantity?: number;
  /** Fulfillment time for pickup */
  fulfillmentTime?: TimeDuration;
}

/**
 * Availability details for an inventory item.
 */
export interface Availability {
  /** Availability for ship-to-home orders */
  shipToLocationAvailability?: ShipToLocationAvailability;
  /** Availability for In-Store Pickup */
  pickupAtLocationAvailability?: PickupAtLocationAvailability[];
}

/**
 * Full inventory item structure.
 */
export interface InventoryItem {
  /** Seller-defined SKU */
  sku: string;
  /** Locale for the inventory item */
  locale?: string;
  /** Product details */
  product?: Product;
  /** Item condition */
  condition?: ConditionEnum;
  /** Additional condition description */
  conditionDescription?: string;
  /** Availability information */
  availability?: Availability;
  /** Package weight and size for shipping */
  packageWeightAndSize?: PackageWeightAndSize;
}

/**
 * Request for creating/replacing an inventory item.
 */
export interface CreateOrReplaceInventoryItemRequest {
  /** Product details */
  product?: Product;
  /** Item condition */
  condition?: ConditionEnum;
  /** Additional condition description */
  conditionDescription?: string;
  /** Availability information */
  availability?: Availability;
  /** Package weight and size for shipping */
  packageWeightAndSize?: PackageWeightAndSize;
}

/**
 * Response for listing inventory items.
 */
export interface InventoryItemsResponse {
  /** URL of the current page */
  href?: string;
  /** Maximum number of items per page */
  limit?: number;
  /** Offset of the current page */
  offset?: number;
  /** Total number of inventory items */
  total?: number;
  /** Array of inventory items */
  inventoryItems?: InventoryItem[];
  /** URL of the next page */
  next?: string;
  /** URL of the previous page */
  prev?: string;
}
