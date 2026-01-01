
/**
 * UnpaidItemAssistancePreferences
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface UnpaidItemAssistancePreferences {
    /** xs:int */
    DelayBeforeOpeningDispute?: number;
    /** xs:boolean */
    OptInStatus?: boolean;
    /** xs:boolean */
    AutoRelist?: boolean;
    /** xs:boolean */
    RemoveAllExcludedUsers?: boolean;
    /** xs:string */
    ExcludedUser?: Array<string>;
}
