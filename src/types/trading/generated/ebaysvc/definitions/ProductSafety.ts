import { Pictograms } from './Pictograms.js';
import { Statements } from './Statements.js';

/**
 * ProductSafety
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ProductSafety {
    /** Pictograms */
    Pictograms?: Pictograms;
    /** Statements */
    Statements?: Statements;
    /** xs:string */
    Component?: string;
}
