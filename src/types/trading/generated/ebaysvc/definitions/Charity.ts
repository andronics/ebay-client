
/**
 * Charity
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Charity {
    /** xs:string */
    CharityName?: string;
    /** xs:float */
    DonationPercent?: number;
    /** xs:string */
    CharityID?: string;
    /** xs:string */
    Mission?: string;
    /** xs:string */
    LogoURL?: string;
    /** CharityStatusCodeType|xs:token|Valid,NoLongerValid,CustomCode */
    Status?: string;
    /** xs:boolean */
    CharityListing?: boolean;
}
