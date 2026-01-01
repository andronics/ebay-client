
/**
 * CalculatedHandlingDiscount
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface CalculatedHandlingDiscount {
    /** HandlingNameCodeType|xs:token|EachAdditionalAmount,EachAdditionalAmountOff,EachAdditionalPercentOff,IndividualHandlingFee,CombinedHandlingFee,CustomCode */
    DiscountName?: string;
    /** xs:double */
    OrderHandlingAmount?: number;
    /** xs:double */
    EachAdditionalAmount?: number;
    /** xs:double */
    EachAdditionalOffAmount?: number;
    /** xs:float */
    EachAdditionalPercentOff?: number;
}
