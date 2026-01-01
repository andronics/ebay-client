
/**
 * FolderSummary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FolderSummary {
    /** xs:long */
    FolderID?: number;
    /** xs:string */
    FolderName?: string;
    /** xs:int */
    NewMessageCount?: number;
    /** xs:int */
    TotalMessageCount?: number;
    /** xs:int */
    NewHighPriorityCount?: number;
    /** xs:int */
    TotalHighPriorityCount?: number;
}
