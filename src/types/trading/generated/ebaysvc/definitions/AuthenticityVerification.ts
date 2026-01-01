import { ServiceCost } from './ServiceCost.js';

/**
 * AuthenticityVerification
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AuthenticityVerification {
    /** xs:string */
    Status?: string;
    /** xs:string */
    OutcomeReason?: string;
    /** ServiceCost */
    ServiceCost?: ServiceCost;
}
