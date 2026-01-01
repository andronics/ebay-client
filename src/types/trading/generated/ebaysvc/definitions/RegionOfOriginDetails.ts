
/**
 * RegionOfOriginDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface RegionOfOriginDetails {
    /** xs:string */
    RegionOfOrigin?: string;
    /** xs:string */
    Description?: string;
    /** StatusCodeType|xs:token|Active,Inactive,CustomCode */
    Status?: string;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
