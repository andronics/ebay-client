
/**
 * AverageRatingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AverageRatingDetails {
    /** FeedbackRatingDetailCodeType|xs:token|ItemAsDescribed,Communication,ShippingTime,ShippingAndHandlingCharges,CustomCode */
    RatingDetail?: string;
    /** xs:double */
    Rating?: number;
    /** xs:int */
    RatingCount?: number;
}
