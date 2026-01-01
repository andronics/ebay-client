import { NumberOfPolicyViolations } from './NumberOfPolicyViolations.js';
import { PolicyViolationDuration } from './PolicyViolationDuration.js';

/**
 * MaximumBuyerPolicyViolations
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MaximumBuyerPolicyViolations {
    /** NumberOfPolicyViolations */
    NumberOfPolicyViolations?: NumberOfPolicyViolations;
    /** PolicyViolationDuration[] */
    PolicyViolationDuration?: Array<PolicyViolationDuration>;
}
