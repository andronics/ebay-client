import { RegionalTakeBackPolicies } from './RegionalTakeBackPolicies.js';

/**
 * CustomPolicies
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface CustomPolicies {
    /** xs:long */
    TakeBackPolicyID?: number;
    /** RegionalTakeBackPolicies */
    RegionalTakeBackPolicies?: RegionalTakeBackPolicies;
    /** xs:long */
    ProductCompliancePolicyID?: Array<number>;
    /** RegionalProductCompliancePolicies */
    RegionalProductCompliancePolicies?: RegionalTakeBackPolicies;
}
