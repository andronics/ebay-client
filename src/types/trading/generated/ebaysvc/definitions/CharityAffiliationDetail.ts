
/**
 * CharityAffiliationDetail
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface CharityAffiliationDetail {
    /** xs:string */
    CharityID?: string;
    /** CharityAffiliationTypeCodeType|xs:token|Community,Direct,Remove,CustomCode */
    AffiliationType?: string;
    /** xs:dateTime */
    LastUsedTime?: Date;
}
