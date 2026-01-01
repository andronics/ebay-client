import { AuthenticityVerification } from './AuthenticityVerification.js';
import { Fulfillment } from './Fulfillment.js';
import { MotorPurchase } from './MotorPurchase.js';

/**
 * Program
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Program1 {
    /** AuthenticityVerification */
    AuthenticityVerification?: AuthenticityVerification;
    /** Fulfillment */
    Fulfillment?: Fulfillment;
    /** MotorPurchase */
    MotorPurchase?: MotorPurchase;
}
