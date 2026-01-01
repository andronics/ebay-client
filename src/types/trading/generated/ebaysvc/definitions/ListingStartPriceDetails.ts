
/**
 * ListingStartPriceDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ListingStartPriceDetails {
    /** xs:string */
    Description?: string;
    /** ListingTypeCodeType|xs:token|Unknown,Chinese,Dutch,Live,Auction,AdType,StoresFixedPrice,PersonalOffer,FixedPriceItem,Half,LeadGeneration,Express,Shopping,CustomCode */
    ListingType?: string;
    /** xs:double */
    StartPrice?: number;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
    /** xs:float */
    MinBuyItNowPricePercent?: number;
}
