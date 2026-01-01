import { BidItemArray } from './BidItemArray.js';
import { PaginationResult } from './PaginationResult.js';

/**
 * WatchList
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface WatchList1 {
    /** ItemArray */
    ItemArray?: BidItemArray;
    /** PaginationResult */
    PaginationResult?: PaginationResult;
}
