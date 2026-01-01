
/**
 * SellerFavoriteItemPreferences
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerFavoriteItemPreferences {
    /** xs:string */
    SearchKeywords?: string;
    /** xs:long */
    StoreCategoryID?: number;
    /** ListingTypeCodeType|xs:token|Unknown,Chinese,Dutch,Live,Auction,AdType,StoresFixedPrice,PersonalOffer,FixedPriceItem,Half,LeadGeneration,Express,Shopping,CustomCode */
    ListingType?: string;
    /** StoreItemListSortOrderCodeType|xs:token|EndingFirst,NewlyListed,LowestPriced,HighestPriced,LowestPricedPlusShipping,HighestPricedPlusShipping,CustomCode */
    SearchSortOrder?: string;
    /** xs:double */
    MinPrice?: number;
    /** xs:double */
    MaxPrice?: number;
    /** ItemIDType|xs:string */
    FavoriteItemID?: Array<string>;
}
