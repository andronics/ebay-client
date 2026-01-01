import { Transaction } from './Transaction.js';

/**
 * TransactionArray
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface TransactionArray {
    /** Transaction[] */
    Transaction?: Array<Transaction>;
}
