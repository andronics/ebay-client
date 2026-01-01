import { Order } from './Order.js';
import { Transaction } from './Transaction.js';

/**
 * OrderTransaction
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface OrderTransaction {
    /** Order */
    Order?: Order;
    /** Transaction */
    Transaction?: Transaction;
}
