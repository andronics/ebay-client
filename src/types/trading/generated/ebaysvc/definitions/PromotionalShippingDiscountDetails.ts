
/**
 * PromotionalShippingDiscountDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface PromotionalShippingDiscountDetails {
    /** DiscountNameCodeType|xs:token|EachAdditionalAmount,EachAdditionalAmountOff,EachAdditionalPercentOff,IndividualItemWeight,CombinedItemWeight,WeightOff,ShippingCostXForAmountY,ShippingCostXForItemCountN,MaximumShippingCostPerOrder,CustomCode */
    DiscountName?: string;
    /** xs:double */
    ShippingCost?: number;
    /** xs:double */
    OrderAmount?: number;
    /** xs:int */
    ItemCount?: number;
}
