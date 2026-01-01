import { DiscountProfile } from './DiscountProfile.js';

/**
 * FlatShippingDiscount
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FlatShippingDiscount {
    /** DiscountNameCodeType|xs:token|EachAdditionalAmount,EachAdditionalAmountOff,EachAdditionalPercentOff,IndividualItemWeight,CombinedItemWeight,WeightOff,ShippingCostXForAmountY,ShippingCostXForItemCountN,MaximumShippingCostPerOrder,CustomCode */
    DiscountName?: string;
    /** DiscountProfile[] */
    DiscountProfile?: Array<DiscountProfile>;
}
