
/**
 * ListingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ListingDetails {
    /** xs:boolean */
    Adult?: boolean;
    /** xs:boolean */
    BindingAuction?: boolean;
    /** xs:boolean */
    CheckoutEnabled?: boolean;
    /** xs:double */
    ConvertedBuyItNowPrice?: number;
    /** xs:double */
    ConvertedStartPrice?: number;
    /** xs:double */
    ConvertedReservePrice?: number;
    /** xs:boolean */
    HasReservePrice?: boolean;
    /** ItemIDType|xs:string */
    RelistedItemID?: string;
    /** ItemIDType|xs:string */
    SecondChanceOriginalItemID?: string;
    /** xs:dateTime */
    StartTime?: Date;
    /** xs:dateTime */
    EndTime?: Date;
    /** xs:anyURI */
    ViewItemURL?: string;
    /** xs:boolean */
    HasUnansweredQuestions?: boolean;
    /** xs:boolean */
    HasPublicMessages?: boolean;
    /** xs:boolean */
    BuyItNowAvailable?: boolean;
    /** xs:double */
    MinimumBestOfferPrice?: number;
    /** xs:string */
    LocalListingDistance?: string;
    /** xs:anyURI */
    ViewItemURLForNaturalSearch?: string;
    /** xs:double */
    BestOfferAutoAcceptPrice?: number;
    /** EndReasonCodeType|xs:token|LostOrBroken,NotAvailable,Incorrect,OtherListingError,CustomCode,SellToHighBidder,Sold,ProductDeleted */
    EndingReason?: string;
}
