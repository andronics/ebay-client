/**
 * Curated types for eBay Inventory API - Offers
 */

import type { Amount } from './item.js';

/**
 * Offer status enum.
 */
export type OfferStatusEnum = 'PUBLISHED' | 'UNPUBLISHED';

/**
 * Listing format.
 */
export type FormatType = 'FIXED_PRICE' | 'AUCTION';

/**
 * Marketplace ID enum.
 */
export type MarketplaceIdEnum =
  | 'EBAY_US'
  | 'EBAY_GB'
  | 'EBAY_AU'
  | 'EBAY_AT'
  | 'EBAY_BE'
  | 'EBAY_CA'
  | 'EBAY_CH'
  | 'EBAY_DE'
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
  | 'EBAY_TH'
  | 'EBAY_TW'
  | 'EBAY_VN'
  | 'EBAY_MOTORS_US';

/**
 * Listing duration enum.
 */
export type ListingDurationEnum =
  | 'GTC'
  | 'DAYS_1'
  | 'DAYS_3'
  | 'DAYS_5'
  | 'DAYS_7'
  | 'DAYS_10'
  | 'DAYS_21'
  | 'DAYS_30';

/**
 * Pricing summary for an offer.
 */
export interface PricingSummary {
  /** The listing price */
  price?: Amount;
  /** Minimum Advertised Price (US only) */
  minimumAdvertisedPrice?: Amount;
  /** Original retail price for strikethrough pricing */
  originalRetailPrice?: Amount;
  /** Visibility setting for pricing */
  pricingVisibility?: 'NONE' | 'PRE_CHECKOUT' | 'DURING_CHECKOUT';
}

/**
 * Shipping cost override.
 */
export interface ShippingCostOverride {
  /** Priority of this override */
  priority?: number;
  /** Shipping cost */
  shippingCost?: Amount;
  /** Additional shipping cost per item */
  additionalShippingCost?: Amount;
  /** Shipping service type */
  shippingServiceType?: string;
  /** Surcharge amount */
  surcharge?: Amount;
}

/**
 * Best Offer settings.
 */
export interface BestOffer {
  /** Enable Best Offer feature */
  bestOfferEnabled?: boolean;
  /** Auto-accept price threshold */
  autoAcceptPrice?: Amount;
  /** Auto-decline price threshold */
  autoDeclinePrice?: Amount;
}

/**
 * Listing policies reference.
 */
export interface ListingPolicies {
  /** Fulfillment policy ID */
  fulfillmentPolicyId?: string;
  /** Payment policy ID */
  paymentPolicyId?: string;
  /** Return policy ID */
  returnPolicyId?: string;
  /** Shipping cost overrides */
  shippingCostOverrides?: ShippingCostOverride[];
  /** Best Offer settings */
  bestOfferTerms?: BestOffer;
  /** Enable eBay Plus eligibility */
  eBayPlusIfEligible?: boolean;
}

/**
 * Tax settings for an offer.
 */
export interface Tax {
  /** Apply sales tax */
  applyTax?: boolean;
  /** Third-party tax category */
  thirdPartyTaxCategory?: string;
  /** VAT percentage (Business Sellers only) */
  vatPercentage?: number;
}

/**
 * Listing details for published offers.
 */
export interface ListingDetails {
  /** eBay listing ID */
  listingId?: string;
  /** Quantity sold */
  soldQuantity?: number;
}

/**
 * Offer details.
 */
export interface Offer {
  /** Unique offer ID */
  offerId?: string;
  /** SKU of the inventory item */
  sku: string;
  /** Target marketplace */
  marketplaceId: MarketplaceIdEnum;
  /** Listing format */
  format?: FormatType;
  /** Available quantity */
  availableQuantity?: number;
  /** eBay category ID */
  categoryId?: string;
  /** Secondary category ID */
  secondaryCategoryId?: string;
  /** Listing description */
  listingDescription?: string;
  /** Listing duration */
  listingDuration?: ListingDurationEnum;
  /** Listing policies */
  listingPolicies?: ListingPolicies;
  /** Merchant location key */
  merchantLocationKey?: string;
  /** Pricing information */
  pricingSummary?: PricingSummary;
  /** Purchase quantity limit per buyer */
  quantityLimitPerBuyer?: number;
  /** Store category names */
  storeCategoryNames?: string[];
  /** Tax settings */
  tax?: Tax;
  /** Scheduled listing start date */
  listingStartDate?: string;
  /** Lot size for lot listings */
  lotSize?: number;
  /** Offer status */
  status?: OfferStatusEnum;
  /** Listing details (for published offers) */
  listing?: ListingDetails;
}

/**
 * Create offer request.
 */
export interface CreateOfferRequest {
  /** SKU of the inventory item (required) */
  sku: string;
  /** Target marketplace (required) */
  marketplaceId: MarketplaceIdEnum;
  /** Listing format */
  format?: FormatType;
  /** Available quantity */
  availableQuantity?: number;
  /** eBay category ID */
  categoryId?: string;
  /** Secondary category ID */
  secondaryCategoryId?: string;
  /** Listing description */
  listingDescription?: string;
  /** Listing duration */
  listingDuration?: ListingDurationEnum;
  /** Listing policies */
  listingPolicies?: ListingPolicies;
  /** Merchant location key */
  merchantLocationKey?: string;
  /** Pricing information */
  pricingSummary?: PricingSummary;
  /** Purchase quantity limit per buyer */
  quantityLimitPerBuyer?: number;
  /** Store category names */
  storeCategoryNames?: string[];
  /** Tax settings */
  tax?: Tax;
  /** Scheduled listing start date */
  listingStartDate?: string;
  /** Lot size for lot listings */
  lotSize?: number;
}

/**
 * Create offer response.
 */
export interface CreateOfferResponse {
  /** Created offer ID */
  offerId: string;
  /** Warnings from the operation */
  warnings?: Array<{
    errorId?: number;
    domain?: string;
    message?: string;
  }>;
}

/**
 * Update offer request.
 */
export interface UpdateOfferRequest {
  /** Available quantity */
  availableQuantity?: number;
  /** eBay category ID */
  categoryId?: string;
  /** Secondary category ID */
  secondaryCategoryId?: string;
  /** Listing description */
  listingDescription?: string;
  /** Listing duration */
  listingDuration?: ListingDurationEnum;
  /** Listing policies */
  listingPolicies?: ListingPolicies;
  /** Merchant location key */
  merchantLocationKey?: string;
  /** Pricing information */
  pricingSummary?: PricingSummary;
  /** Purchase quantity limit per buyer */
  quantityLimitPerBuyer?: number;
  /** Store category names */
  storeCategoryNames?: string[];
  /** Tax settings */
  tax?: Tax;
  /** Scheduled listing start date */
  listingStartDate?: string;
  /** Lot size for lot listings */
  lotSize?: number;
}

/**
 * Publish offer response.
 */
export interface PublishOfferResponse {
  /** eBay listing ID of the created listing */
  listingId: string;
  /** Warnings from the operation */
  warnings?: Array<{
    errorId?: number;
    domain?: string;
    message?: string;
  }>;
}

/**
 * Response for listing offers.
 */
export interface OffersResponse {
  /** URL of the current page */
  href?: string;
  /** Maximum number of items per page */
  limit?: number;
  /** Offset of the current page */
  offset?: number;
  /** Total number of offers */
  total?: number;
  /** Array of offers */
  offers?: Offer[];
  /** URL of the next page */
  next?: string;
  /** URL of the previous page */
  prev?: string;
}
