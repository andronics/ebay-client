import { TaxJurisdiction } from './TaxJurisdiction.js';

/**
 * TaxTable
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface TaxTable {
    /** TaxJurisdiction[] */
    TaxJurisdiction?: Array<TaxJurisdiction>;
}
