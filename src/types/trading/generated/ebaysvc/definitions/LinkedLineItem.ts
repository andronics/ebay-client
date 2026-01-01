import { Item } from './Item.js';

/**
 * LinkedLineItem
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface LinkedLineItem {
    /** xs:string */
    OrderID?: string;
    /** xs:string */
    OrderLineItemID?: string;
    /** xs:string */
    SellerUserID?: string;
    /** xs:dateTime */
    EstimatedDeliveryTimeMax?: Date;
    /** xs:dateTime */
    EstimatedDeliveryTimeMin?: Date;
    /** Item */
    Item?: Item;
}
