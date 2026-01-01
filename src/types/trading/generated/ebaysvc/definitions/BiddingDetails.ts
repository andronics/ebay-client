
/**
 * BiddingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BiddingDetails {
    /** xs:double */
    ConvertedMaxBid?: number;
    /** xs:double */
    MaxBid?: number;
    /** xs:int */
    QuantityBid?: number;
    /** xs:int */
    QuantityWon?: number;
    /** xs:boolean */
    Winning?: boolean;
}
