
/**
 * NotificationStatistics
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface NotificationStatistics {
    /** xs:int */
    DeliveredCount?: number;
    /** xs:int */
    QueuedNewCount?: number;
    /** xs:int */
    QueuedPendingCount?: number;
    /** xs:int */
    ExpiredCount?: number;
    /** xs:int */
    ErrorCount?: number;
}
