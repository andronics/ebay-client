/**
 * Privilege types for eBay Account API.
 */

import type { Amount } from './fulfillment-policy.js';

/** Selling limit for a seller account. */
export interface SellingLimit {
  /** Monthly cap for total sales amount. */
  amount?: Amount;
  /** Monthly cap for total quantity sold. */
  quantity?: number;
}

/** Seller privileges and limits. */
export interface SellingPrivileges {
  /** Whether seller registration is complete. */
  sellerRegistrationCompleted?: boolean;
  /** Monthly selling limits for the account. */
  sellingLimit?: SellingLimit;
}
