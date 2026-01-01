
/**
 * TaxJurisdiction
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface TaxJurisdiction {
    /** xs:string */
    JurisdictionID?: string;
    /** xs:float */
    SalesTaxPercent?: number;
    /** xs:boolean */
    ShippingIncludedInTax?: boolean;
    /** xs:string */
    JurisdictionName?: string;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
