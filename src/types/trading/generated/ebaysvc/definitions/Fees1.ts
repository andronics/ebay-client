import { Fee } from './Fee.js';

/**
 * Fees
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Fees1 {
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** Fee[] */
    Fee?: Array<Fee>;
}
