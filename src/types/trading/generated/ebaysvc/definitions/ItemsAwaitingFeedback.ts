import { TransactionArray } from './TransactionArray.js';
import { PaginationResult } from './PaginationResult.js';

/**
 * ItemsAwaitingFeedback
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ItemsAwaitingFeedback {
    /** TransactionArray */
    TransactionArray?: TransactionArray;
    /** PaginationResult */
    PaginationResult?: PaginationResult;
}
