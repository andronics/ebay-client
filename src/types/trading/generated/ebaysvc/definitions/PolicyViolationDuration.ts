
/**
 * PolicyViolationDuration
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface PolicyViolationDuration {
    /** PeriodCodeType|xs:token|Days_1,Days_30,Days_180,Days_360,Days_540,CustomCode */
    Period?: string;
    /** xs:string */
    Description?: string;
}
