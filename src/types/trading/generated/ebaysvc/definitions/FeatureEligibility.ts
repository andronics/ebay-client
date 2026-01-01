
/**
 * FeatureEligibility
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FeatureEligibility {
    /** xs:boolean */
    QualifiesForBuyItNow?: boolean;
    /** xs:boolean */
    QualifiesForBuyItNowMultiple?: boolean;
    /** xs:boolean */
    QualifiedForFixedPriceOneDayDuration?: boolean;
    /** xs:boolean */
    QualifiesForVariations?: boolean;
    /** xs:boolean */
    QualifiedForAuctionOneDayDuration?: boolean;
}
