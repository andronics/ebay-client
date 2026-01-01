import { Pictograms } from './Pictograms.js';
import { Statements } from './Statements.js';

/**
 * Hazmat
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Hazmat {
    /** Pictograms */
    Pictograms?: Pictograms;
    /** xs:string */
    SignalWord?: string;
    /** Statements */
    Statements?: Statements;
    /** xs:string */
    Component?: string;
}
