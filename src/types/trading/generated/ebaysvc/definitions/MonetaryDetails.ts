import { Payments } from './Payments.js';
import { Refunds } from './Refunds.js';

/**
 * MonetaryDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MonetaryDetails {
    /** Payments */
    Payments?: Payments;
    /** Refunds */
    Refunds?: Refunds;
}
