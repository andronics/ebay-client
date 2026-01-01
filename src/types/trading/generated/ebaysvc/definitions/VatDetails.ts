
/**
 * VATDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface VatDetails {
    /** xs:boolean */
    BusinessSeller?: boolean;
    /** xs:boolean */
    RestrictedToBusiness?: boolean;
    /** xs:float */
    VATPercent?: number;
    /** xs:string */
    VATSite?: string;
    /** xs:string */
    VATID?: string;
}
