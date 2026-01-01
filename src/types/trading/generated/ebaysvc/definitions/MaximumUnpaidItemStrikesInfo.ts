
/**
 * MaximumUnpaidItemStrikesInfo
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MaximumUnpaidItemStrikesInfo {
    /** xs:int */
    Count?: number;
    /** PeriodCodeType|xs:token|Days_1,Days_30,Days_180,Days_360,Days_540,CustomCode */
    Period?: string;
}
