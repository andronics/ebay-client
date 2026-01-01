
/**
 * SellerDiscount
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerDiscount {
    /** xs:long */
    CampaignID?: number;
    /** xs:string */
    CampaignDisplayName?: string;
    /** xs:double */
    ItemDiscountAmount?: number;
    /** xs:double */
    ShippingDiscountAmount?: number;
}
