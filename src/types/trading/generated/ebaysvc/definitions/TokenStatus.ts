
/**
 * TokenStatus
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface TokenStatus {
    /** TokenStatusCodeType|xs:token|Active,Expired,RevokedByeBay,RevokedByUser,RevokedByApp,Invalid,CustomCode */
    Status?: string;
    /** xs:string */
    EIASToken?: string;
    /** xs:dateTime */
    ExpirationTime?: Date;
    /** xs:dateTime */
    RevocationTime?: Date;
}
