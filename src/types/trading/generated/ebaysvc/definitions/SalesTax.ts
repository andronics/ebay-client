
/**
 * SalesTax
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SalesTax {
    /** xs:float */
    SalesTaxPercent?: number;
    /** xs:string */
    SalesTaxState?: string;
    /** xs:boolean */
    ShippingIncludedInTax?: boolean;
    /** xs:double */
    SalesTaxAmount?: number;
}
