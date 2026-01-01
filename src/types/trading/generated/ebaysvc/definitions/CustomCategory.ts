
/**
 * CustomCategory
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface CustomCategory {
    /** xs:long */
    CategoryID?: number;
    /** xs:string */
    Name?: string;
    /** xs:int */
    Order?: number;
    /** ChildCategory[] */
    ChildCategory?: Array<CustomCategory>;
}
