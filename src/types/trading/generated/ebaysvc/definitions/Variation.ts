import { ItemSpecifics } from './ItemSpecifics.js';
import { SellingStatus } from './SellingStatus.js';
import { DiscountPriceInfo } from './DiscountPriceInfo.js';
import { VariationProductListingDetails } from './VariationProductListingDetails.js';
import { VariationExtendedProducerResponsibility } from './VariationExtendedProducerResponsibility.js';

/**
 * Variation
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Variation {
    /** SKUType|xs:string */
    SKU?: string;
    /** xs:double */
    StartPrice?: number;
    /** xs:int */
    Quantity?: number;
    /** VariationSpecifics */
    VariationSpecifics?: ItemSpecifics;
    /** SellingStatus */
    SellingStatus?: SellingStatus;
    /** xs:string */
    VariationTitle?: string;
    /** xs:anyURI */
    VariationViewItemURL?: string;
    /** xs:boolean */
    Delete?: boolean;
    /** xs:long */
    WatchCount?: number;
    /** xs:string */
    PrivateNotes?: string;
    /** DiscountPriceInfo */
    DiscountPriceInfo?: DiscountPriceInfo;
    /** VariationProductListingDetails */
    VariationProductListingDetails?: VariationProductListingDetails;
    /** VariationExtendedProducerResponsibility */
    VariationExtendedProducerResponsibility?: VariationExtendedProducerResponsibility;
}
