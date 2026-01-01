import { Item } from './Item.js';

/**
 * BidItemArray
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BidItemArray {
    /** Item[] */
    Item?: Array<Item>;
}
