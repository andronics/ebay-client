
/**
 * PickupMethodSelected
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface PickupMethodSelected {
    /** xs:token */
    PickupMethod?: string;
    /** xs:string */
    PickupStoreID?: string;
    /** PickupStatusCodeType|xs:token|Invalid,NotApplicable,PendingMerchantConfirmation,ReadyToPickup,Pickedup,PickupCancelledOutOfStock,PickupCancelledBuyerRejected,PickupCancelledBuyerNoShow,PickupCancelled,CustomCode */
    PickupStatus?: string;
    /** xs:string */
    MerchantPickupCode?: string;
    /** xs:dateTime */
    PickupFulfillmentTime?: Date;
    /** xs:string */
    PickupLocationUUID?: string;
}
