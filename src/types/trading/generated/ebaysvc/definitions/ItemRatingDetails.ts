
/**
 * ItemRatingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ItemRatingDetails {
    /** FeedbackRatingDetailCodeType|xs:token|ItemAsDescribed,Communication,ShippingTime,ShippingAndHandlingCharges,CustomCode */
    RatingDetail?: string;
    /** xs:int */
    Rating?: number;
}
