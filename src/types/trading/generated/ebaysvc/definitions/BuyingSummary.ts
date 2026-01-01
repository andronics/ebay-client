
/**
 * BuyingSummary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BuyingSummary {
    /** xs:int */
    BiddingCount?: number;
    /** xs:int */
    WinningCount?: number;
    /** xs:double */
    TotalWinningCost?: number;
    /** xs:int */
    WonCount?: number;
    /** xs:double */
    TotalWonCost?: number;
    /** xs:int */
    WonDurationInDays?: number;
    /** xs:int */
    BestOfferCount?: number;
}
