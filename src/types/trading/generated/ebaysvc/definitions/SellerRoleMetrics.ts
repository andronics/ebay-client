
/**
 * SellerRoleMetrics
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerRoleMetrics {
    /** xs:int */
    PositiveFeedbackLeftCount?: number;
    /** xs:int */
    NegativeFeedbackLeftCount?: number;
    /** xs:int */
    NeutralFeedbackLeftCount?: number;
    /** xs:float */
    FeedbackLeftPercent?: number;
    /** xs:int */
    RepeatBuyerCount?: number;
    /** xs:float */
    RepeatBuyerPercent?: number;
    /** xs:int */
    UniqueBuyerCount?: number;
    /** xs:float */
    TransactionPercent?: number;
    /** xs:int */
    CrossBorderTransactionCount?: number;
    /** xs:float */
    CrossBorderTransactionPercent?: number;
}
