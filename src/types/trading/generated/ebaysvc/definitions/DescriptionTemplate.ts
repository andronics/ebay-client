
/**
 * DescriptionTemplate
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DescriptionTemplate {
    /** xs:int */
    GroupID?: number;
    /** xs:int */
    ID?: number;
    /** xs:anyURI */
    ImageURL?: string;
    /** xs:string */
    Name?: string;
    /** xs:string */
    TemplateXML?: string;
    /** DescriptionTemplateCodeType|xs:token|Layout,Theme,CustomCode */
    Type?: string;
}
