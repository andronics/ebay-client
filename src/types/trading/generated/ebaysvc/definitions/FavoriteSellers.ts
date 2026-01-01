import { FavoriteSeller } from './FavoriteSeller.js';

/**
 * FavoriteSellers
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FavoriteSellers {
    /** xs:int */
    TotalAvailable?: number;
    /** FavoriteSeller[] */
    FavoriteSeller?: Array<FavoriteSeller>;
}
