
/**
 * EndItemRequestContainer
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface EndItemRequestContainer {
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** EndReasonCodeType|xs:token|LostOrBroken,NotAvailable,Incorrect,OtherListingError,CustomCode,SellToHighBidder,Sold,ProductDeleted */
    EndingReason?: string;
    /** xs:string */
    MessageID?: string;
}
