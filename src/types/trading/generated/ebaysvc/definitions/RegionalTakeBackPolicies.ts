import { CountryPolicies } from './CountryPolicies.js';

/**
 * RegionalTakeBackPolicies
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface RegionalTakeBackPolicies {
    /** CountryPolicies[] */
    CountryPolicies?: Array<CountryPolicies>;
}
