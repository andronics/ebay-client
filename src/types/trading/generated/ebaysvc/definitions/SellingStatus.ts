import { Seller } from './Seller.js';
import { PromotionalSaleDetails } from './PromotionalSaleDetails.js';
import { SuggestedBidValues } from './SuggestedBidValues.js';

/**
 * SellingStatus
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellingStatus {
    /** xs:int */
    BidCount?: number;
    /** xs:double */
    BidIncrement?: number;
    /** xs:double */
    ConvertedCurrentPrice?: number;
    /** xs:double */
    CurrentPrice?: number;
    /** HighBidder */
    HighBidder?: Seller;
    /** xs:int */
    LeadCount?: number;
    /** xs:double */
    MinimumToBid?: number;
    /** xs:int */
    QuantitySold?: number;
    /** xs:boolean */
    ReserveMet?: boolean;
    /** xs:boolean */
    SecondChanceEligible?: boolean;
    /** xs:long */
    BidderCount?: number;
    /** ListingStatusCodeType|xs:token|Active,Ended,Completed,CustomCode,Custom */
    ListingStatus?: string;
    /** xs:double */
    FinalValueFee?: number;
    /** PromotionalSaleDetails */
    PromotionalSaleDetails?: PromotionalSaleDetails;
    /** xs:boolean */
    AdminEnded?: boolean;
    /** xs:boolean */
    SoldAsBin?: boolean;
    /** xs:int */
    QuantitySoldByPickupInStore?: number;
    /** SuggestedBidValues */
    SuggestedBidValues?: SuggestedBidValues;
    /** xs:boolean */
    ListingOnHold?: boolean;
}
