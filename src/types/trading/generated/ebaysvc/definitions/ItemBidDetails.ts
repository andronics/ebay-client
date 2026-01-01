
/**
 * ItemBidDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ItemBidDetails {
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:string */
    CategoryID?: string;
    /** xs:int */
    BidCount?: number;
    /** UserIDType|xs:string */
    SellerID?: string;
    /** xs:dateTime */
    LastBidTime?: Date;
}
