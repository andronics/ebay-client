import { DeliveryStatus } from './DeliveryStatus.js';
import { DeliveryDetails } from './DeliveryDetails.js';

/**
 * DigitalDeliverySelected
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DigitalDeliverySelected {
    /** xs:token */
    DeliveryMethod?: string;
    /** DeliveryStatus */
    DeliveryStatus?: DeliveryStatus;
    /** DeliveryDetails */
    DeliveryDetails?: DeliveryDetails;
}
