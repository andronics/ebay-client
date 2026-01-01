import { RegistrationAddress } from './RegistrationAddress.js';
import { BuyerTaxIdentifier } from './BuyerTaxIdentifier.js';

/**
 * BuyerInfo
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BuyerInfo {
    /** ShippingAddress */
    ShippingAddress?: RegistrationAddress;
    /** BuyerTaxIdentifier[] */
    BuyerTaxIdentifier?: Array<BuyerTaxIdentifier>;
}
