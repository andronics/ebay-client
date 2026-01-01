/**
 * Payment Policy types for eBay Account API.
 */

import type { CategoryType, TimeDuration, Amount, ErrorDetail } from './fulfillment-policy.js';

/** Payment method type. */
export type PaymentMethodType =
  | 'CASH_IN_PERSON'
  | 'CASH_ON_DELIVERY'
  | 'CASH_ON_PICKUP'
  | 'CASHIER_CHECK'
  | 'CREDIT_CARD'
  | 'ESCROW'
  | 'LOAN_CHECK'
  | 'MONEY_ORDER'
  | 'PAISA_PAY'
  | 'PAISA_PAY_ESCROW'
  | 'PAISA_PAY_ESCROW_EMI'
  | 'PAYPAL'
  | 'PERSONAL_CHECK';

/** Recipient account reference for payment. */
export interface RecipientAccountReference {
  referenceId?: string;
  referenceType?: 'PAYPAL_EMAIL';
}

/** Payment method configuration. */
export interface PaymentMethod {
  brands?: string[];
  paymentMethodType?: PaymentMethodType;
  recipientAccountReference?: RecipientAccountReference;
}

/** Deposit configuration for motor vehicles. */
export interface Deposit {
  amount?: Amount;
  dueIn?: TimeDuration;
  paymentMethods?: PaymentMethod[];
}

/** Payment policy defining payment terms for a marketplace. */
export interface PaymentPolicy {
  categoryTypes?: CategoryType[];
  deposit?: Deposit;
  description?: string;
  fullPaymentDueIn?: TimeDuration;
  immediatePay?: boolean;
  marketplaceId?: string;
  name?: string;
  paymentInstructions?: string;
  paymentMethods?: PaymentMethod[];
  paymentPolicyId?: string;
}

/** Request body for creating/updating a payment policy. */
export interface PaymentPolicyRequest {
  categoryTypes?: CategoryType[];
  deposit?: Deposit;
  description?: string;
  fullPaymentDueIn?: TimeDuration;
  immediatePay?: boolean;
  marketplaceId?: string;
  name?: string;
  paymentInstructions?: string;
  paymentMethods?: PaymentMethod[];
}

/** Response when creating/updating a payment policy. */
export interface SetPaymentPolicyResponse extends PaymentPolicy {
  warnings?: ErrorDetail[];
}

/** Response containing list of payment policies. */
export interface PaymentPoliciesResponse {
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  paymentPolicies?: PaymentPolicy[];
  prev?: string;
  total?: number;
}
