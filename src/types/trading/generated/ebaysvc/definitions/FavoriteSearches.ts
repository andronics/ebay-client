
/**
 * FavoriteSearches
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FavoriteSearches {
    /** xs:boolean */
    Include?: boolean;
    /** xs:boolean */
    IncludeItemCount?: boolean;
    /** xs:boolean */
    IncludeFavoriteSearcheCount?: boolean;
    /** xs:boolean */
    IncludeFavoriteSellerCount?: boolean;
    /** SortOrderCodeType|xs:token|Ascending,Descending,CustomCode */
    Sort?: string;
    /** xs:int */
    MaxResults?: number;
    /** xs:string */
    UserDefinedListName?: string;
    /** xs:boolean */
    IncludeListContents?: boolean;
}
