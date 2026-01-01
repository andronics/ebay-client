
/**
 * PrimaryCategory
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface PrimaryCategory {
    /** xs:boolean */
    BestOfferEnabled?: boolean;
    /** xs:boolean */
    AutoPayEnabled?: boolean;
    /** xs:boolean */
    B2BVATEnabled?: boolean;
    /** xs:string */
    CategoryID?: string;
    /** xs:int */
    CategoryLevel?: number;
    /** xs:string */
    CategoryName?: string;
    /** xs:string */
    CategoryParentID?: Array<string>;
    /** xs:boolean */
    Expired?: boolean;
    /** xs:boolean */
    LeafCategory?: boolean;
    /** xs:boolean */
    Virtual?: boolean;
    /** xs:int */
    NumOfItems?: number;
    /** xs:boolean */
    ORPA?: boolean;
    /** xs:boolean */
    ORRA?: boolean;
    /** xs:boolean */
    LSD?: boolean;
    /** xs:string */
    Keywords?: string;
}
