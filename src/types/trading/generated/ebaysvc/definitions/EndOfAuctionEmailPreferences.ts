
/**
 * EndOfAuctionEmailPreferences
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface EndOfAuctionEmailPreferences {
    /** xs:string */
    TemplateText?: string;
    /** xs:anyURI */
    LogoURL?: string;
    /** EndOfAuctionLogoTypeCodeType|xs:token|WinningBidderNotice,Store,Customized,CustomCode,None */
    LogoType?: string;
    /** xs:boolean */
    EmailCustomized?: boolean;
    /** xs:boolean */
    TextCustomized?: boolean;
    /** xs:boolean */
    LogoCustomized?: boolean;
    /** xs:boolean */
    CopyEmail?: boolean;
}
