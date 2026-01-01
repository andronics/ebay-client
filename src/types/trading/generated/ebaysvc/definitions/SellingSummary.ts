
/**
 * SellingSummary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellingSummary {
    /** xs:int */
    ActiveAuctionCount?: number;
    /** xs:int */
    AuctionSellingCount?: number;
    /** xs:double */
    TotalAuctionSellingValue?: number;
    /** xs:int */
    TotalSoldCount?: number;
    /** xs:double */
    TotalSoldValue?: number;
    /** xs:int */
    SoldDurationInDays?: number;
}
