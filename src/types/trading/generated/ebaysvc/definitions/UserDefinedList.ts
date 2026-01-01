import { BidItemArray } from './BidItemArray.js';
import { FavoriteSearches1 } from './FavoriteSearches1.js';
import { FavoriteSellers } from './FavoriteSellers.js';

/**
 * UserDefinedList
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface UserDefinedList {
    /** xs:string */
    Name?: string;
    /** xs:int */
    ItemCount?: number;
    /** xs:int */
    FavoriteSearcheCount?: number;
    /** xs:int */
    FavoriteSellerCount?: number;
    /** ItemArray */
    ItemArray?: BidItemArray;
    /** FavoriteSearches */
    FavoriteSearches?: FavoriteSearches1;
    /** FavoriteSellers */
    FavoriteSellers?: FavoriteSellers;
}
