
/**
 * ApplyBuyerProtection
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ApplyBuyerProtection {
    /** BuyerProtectionSourceCodeType|xs:token|eBay,PayPal,CustomCode */
    BuyerProtectionSource?: string;
    /** BuyerProtectionCodeType|xs:token|ItemIneligible,ItemEligible,ItemMarkedIneligible,ItemMarkedEligible,NoCoverage,CustomCode */
    BuyerProtectionStatus?: string;
}
