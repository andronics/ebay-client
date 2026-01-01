import { Order } from './Order.js';
import { Errors } from './Errors.js';

/**
 * OrderArray
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface OrderArray {
    /** Order[] */
    Order?: Array<Order>;
    /** Errors[] */
    Errors?: Array<Errors>;
}
