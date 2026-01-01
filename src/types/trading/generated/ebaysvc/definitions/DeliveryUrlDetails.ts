
/**
 * DeliveryURLDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DeliveryUrlDetails {
    /** xs:string */
    DeliveryURLName?: string;
    /** xs:anyURI */
    DeliveryURL?: string;
    /** EnableCodeType|xs:token|Enable,Disable,CustomCode */
    Status?: string;
}
