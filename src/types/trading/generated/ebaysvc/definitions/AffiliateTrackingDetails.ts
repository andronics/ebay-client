
/**
 * AffiliateTrackingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AffiliateTrackingDetails {
    /** xs:string */
    TrackingID?: string;
    /** xs:string */
    TrackingPartnerCode?: string;
    /** ApplicationDeviceTypeCodeType|xs:token|Browser,Wireless,Desktop,SetTopTVBox,CustomCode */
    ApplicationDeviceType?: string;
    /** xs:string */
    AffiliateUserID?: string;
}
