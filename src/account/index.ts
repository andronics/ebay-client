/**
 * Account API module - manage seller business policies.
 *
 * @example
 * ```typescript
 * import { AccountClient } from '@andronics/ebay-client/account';
 *
 * const client = new AccountClient({
 *   sandbox: false,
 *   auth: { type: 'oauth', accessToken: 'token' },
 * });
 *
 * // Manage policies
 * const fulfillmentPolicies = await client.getFulfillmentPolicies('EBAY_GB');
 * const paymentPolicies = await client.getPaymentPolicies('EBAY_GB');
 * const returnPolicies = await client.getReturnPolicies('EBAY_GB');
 *
 * // Check privileges
 * const privileges = await client.getPrivileges();
 * ```
 */

export { AccountClient } from './client.js';

// Re-export config types for convenience
export type { AccountClientConfig, OAuthConfig } from '../types/config.js';

// Re-export domain types for convenience
export type {
  // Fulfillment Policy
  FulfillmentPolicy,
  FulfillmentPolicyRequest,
  SetFulfillmentPolicyResponse,
  FulfillmentPoliciesResponse,
  // Payment Policy
  PaymentPolicy,
  PaymentPolicyRequest,
  SetPaymentPolicyResponse,
  PaymentPoliciesResponse,
  // Return Policy
  ReturnPolicy,
  ReturnPolicyRequest,
  SetReturnPolicyResponse,
  ReturnPoliciesResponse,
  // Privilege
  SellingPrivileges,
  SellingLimit,
  // Common types
  TimeDuration,
  CategoryType,
  ShippingOption,
  Amount,
} from '../types/account/index.js';
