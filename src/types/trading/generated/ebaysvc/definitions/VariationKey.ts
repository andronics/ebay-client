import { ItemSpecifics } from './ItemSpecifics.js';

/**
 * VariationKey
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface VariationKey {
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** VariationSpecifics */
    VariationSpecifics?: ItemSpecifics;
}
