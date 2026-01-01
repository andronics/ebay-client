import { SellerDiscount } from './SellerDiscount.js';

/**
 * SellerDiscounts
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerDiscounts {
    /** xs:double */
    OriginalItemPrice?: number;
    /** xs:double */
    OriginalItemShippingCost?: number;
    /** xs:token */
    OriginalShippingService?: string;
    /** SellerDiscount[] */
    SellerDiscount?: Array<SellerDiscount>;
}
