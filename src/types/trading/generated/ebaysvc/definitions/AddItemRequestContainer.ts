import { Item } from './Item.js';

/**
 * AddItemRequestContainer
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AddItemRequestContainer {
    /** Item */
    Item?: Item;
    /** xs:string */
    MessageID?: string;
}
