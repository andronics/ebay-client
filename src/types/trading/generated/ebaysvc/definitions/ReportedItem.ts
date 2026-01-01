
/**
 * ReportedItem
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ReportedItem {
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** VeROItemStatusCodeType|xs:token|Received,Submitted,Removed,SubmissionFailed,ClarificationRequired,CustomCode */
    ItemStatus?: string;
    /** xs:string */
    ItemReasonForFailure?: string;
}
