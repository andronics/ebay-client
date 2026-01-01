import { BestOfferArray } from './BestOfferArray.js';
import { Item } from './Item.js';

/**
 * ItemBestOffers
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ItemBestOffers {
    /** TradingRoleCodeType|xs:token|Buyer,Seller,CustomCode */
    Role?: string;
    /** BestOfferArray */
    BestOfferArray?: BestOfferArray;
    /** Item */
    Item?: Item;
}
