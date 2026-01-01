
/**
 * DiscountPriceInfo
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DiscountPriceInfo {
    /** xs:double */
    OriginalRetailPrice?: number;
    /** xs:double */
    MinimumAdvertisedPrice?: number;
    /** MinimumAdvertisedPriceExposureCodeType|xs:token|PreCheckout,DuringCheckout,None,CustomCode */
    MinimumAdvertisedPriceExposure?: string;
    /** PricingTreatmentCodeType|xs:token|STP,MAP,None,MFO,CustomCode */
    PricingTreatment?: string;
    /** xs:boolean */
    SoldOneBay?: boolean;
    /** xs:boolean */
    SoldOffeBay?: boolean;
    /** xs:double */
    MadeForOutletComparisonPrice?: number;
}
