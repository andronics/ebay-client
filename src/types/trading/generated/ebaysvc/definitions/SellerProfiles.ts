import { SellerShippingProfile } from './SellerShippingProfile.js';
import { SellerReturnProfile } from './SellerReturnProfile.js';
import { SellerPaymentProfile } from './SellerPaymentProfile.js';

/**
 * SellerProfiles
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerProfiles {
    /** SellerShippingProfile */
    SellerShippingProfile?: SellerShippingProfile;
    /** SellerReturnProfile */
    SellerReturnProfile?: SellerReturnProfile;
    /** SellerPaymentProfile */
    SellerPaymentProfile?: SellerPaymentProfile;
}
