
/**
 * TaxDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface TaxDetails {
    /** TaxTypeCodeType|xs:token|SalesTax,WasteRecyclingFee,GST,ImportVAT,VAT,CustomCode */
    Imposition?: string;
    /** TaxDescriptionCodeType|xs:token|SalesTax,ElectronicWasteRecyclingFee,TireRecyclingFee,GST,CustomCode */
    TaxDescription?: string;
    /** xs:double */
    TaxAmount?: number;
    /** xs:double */
    TaxOnSubtotalAmount?: number;
    /** xs:double */
    TaxOnShippingAmount?: number;
    /** xs:double */
    TaxOnHandlingAmount?: number;
    /** xs:string */
    TaxCode?: string;
    /** CollectionMethodCodeType|xs:token|INVOICE,NET */
    CollectionMethod?: string;
}
