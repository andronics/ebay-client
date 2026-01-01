import { TaxDetails } from './TaxDetails.js';

/**
 * Taxes
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Taxes {
    /** xs:string */
    eBayReference?: string;
    /** xs:double */
    TotalTaxAmount?: number;
    /** TaxDetails[] */
    TaxDetails?: Array<TaxDetails>;
}
