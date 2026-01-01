
/**
 * ShippingPackageInfo
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingPackageInfo {
    /** xs:string */
    StoreID?: string;
    /** xs:token */
    ShippingTrackingEvent?: string;
    /** xs:dateTime */
    ScheduledDeliveryTimeMin?: Date;
    /** xs:dateTime */
    ScheduledDeliveryTimeMax?: Date;
    /** xs:dateTime */
    ActualDeliveryTime?: Date;
    /** xs:dateTime */
    EstimatedDeliveryTimeMin?: Date;
    /** xs:dateTime */
    EstimatedDeliveryTimeMax?: Date;
    /** xs:dateTime */
    HandleByTime?: Date;
    /** xs:dateTime */
    MinNativeEstimatedDeliveryTime?: Date;
    /** xs:dateTime */
    MaxNativeEstimatedDeliveryTime?: Date;
}
