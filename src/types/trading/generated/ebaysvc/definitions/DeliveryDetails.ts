import { Recipient } from './Recipient.js';

/**
 * DeliveryDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DeliveryDetails {
    /** Recipient */
    Recipient?: Recipient;
    /** Sender */
    Sender?: Recipient;
}
