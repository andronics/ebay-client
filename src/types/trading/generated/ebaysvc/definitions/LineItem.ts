
/**
 * LineItem
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface LineItem {
    /** xs:int */
    Quantity?: number;
    /** xs:string */
    CountryOfOrigin?: string;
    /** xs:string */
    Description?: string;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:string */
    TransactionID?: string;
}
