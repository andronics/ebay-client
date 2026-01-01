import { OrderTransactionArray } from './OrderTransactionArray.js';
import { PaginationResult } from './PaginationResult.js';

/**
 * WonList
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface WonList {
    /** OrderTransactionArray */
    OrderTransactionArray?: OrderTransactionArray;
    /** PaginationResult */
    PaginationResult?: PaginationResult;
}
