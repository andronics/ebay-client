
/**
 * ListingFeatureDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ListingFeatureDetails {
    /** BoldTitleCodeType|xs:token|Enabled,Disabled,CustomCode */
    BoldTitle?: string;
    /** BorderCodeType|xs:token|Enabled,Disabled,CustomCode */
    Border?: string;
    /** HighlightCodeType|xs:token|Enabled,Disabled,CustomCode */
    Highlight?: string;
    /** GiftIconCodeType|xs:token|Enabled,Disabled,CustomCode */
    GiftIcon?: string;
    /** HomePageFeaturedCodeType|xs:token|Enabled,Disabled,CustomCode */
    HomePageFeatured?: string;
    /** FeaturedFirstCodeType|xs:token|Enabled,Disabled,PowerSellerOnly,TopRatedSellerOnly,CustomCode */
    FeaturedFirst?: string;
    /** FeaturedPlusCodeType|xs:token|Enabled,Disabled,PowerSellerOnly,TopRatedSellerOnly,CustomCode */
    FeaturedPlus?: string;
    /** ProPackCodeType|xs:token|Enabled,Disabled,PowerSellerOnly,TopRatedSellerOnly,CustomCode */
    ProPack?: string;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
