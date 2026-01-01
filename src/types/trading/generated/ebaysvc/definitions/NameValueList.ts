
/**
 * NameValueList
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface NameValueList {
    /** xs:string */
    Name?: string;
    /** xs:string */
    Value?: Array<string>;
    /** ItemSpecificSourceCodeType|xs:token|ItemSpecific,Attribute,Product,CustomCode */
    Source?: string;
}
