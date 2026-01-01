import { FavoriteSearch } from './FavoriteSearch.js';

/**
 * FavoriteSearches
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FavoriteSearches1 {
    /** xs:int */
    TotalAvailable?: number;
    /** FavoriteSearch[] */
    FavoriteSearch?: Array<FavoriteSearch>;
}
