import { FolderSummary } from './FolderSummary.js';

/**
 * Summary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Summary {
    /** FolderSummary[] */
    FolderSummary?: Array<FolderSummary>;
    /** xs:int */
    NewMessageCount?: number;
    /** xs:int */
    FlaggedMessageCount?: number;
    /** xs:int */
    TotalMessageCount?: number;
    /** xs:int */
    NewHighPriorityCount?: number;
    /** xs:int */
    TotalHighPriorityCount?: number;
}
