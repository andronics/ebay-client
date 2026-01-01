
/**
 * InventoryStatus
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface InventoryStatus {
    /** SKUType|xs:string */
    SKU?: string;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:double */
    StartPrice?: number;
    /** xs:int */
    Quantity?: number;
}
