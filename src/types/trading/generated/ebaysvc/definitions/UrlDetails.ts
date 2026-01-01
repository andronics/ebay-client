
/**
 * URLDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface UrlDetails {
    /** URLTypeCodeType|xs:token|ViewItemURL,ViewUserURL,MyeBayURL,MyeBayBiddingURL,MyeBayNotWonURL,MyeBayWonURL,MyeBayWatchingURL,eBayStoreURL,SmallLogoURL,MediumLogoURL,LargeLogoURL,CreateProductUrl,AppealProductUrl,ManageProductUrl,CustomCode */
    URLType?: string;
    /** xs:anyURI */
    URL?: string;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
