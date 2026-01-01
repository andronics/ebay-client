import { ShippingServiceDetails } from './ShippingServiceDetails.js';
import { RegistrationAddress } from './RegistrationAddress.js';

/**
 * SellerShipmentToLogisticsProvider
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerShipmentToLogisticsProvider {
    /** ShippingServiceDetails */
    ShippingServiceDetails?: ShippingServiceDetails;
    /** ShipToAddress */
    ShipToAddress?: RegistrationAddress;
    /** xs:int */
    ShippingTimeMin?: number;
    /** xs:int */
    ShippingTimeMax?: number;
}
