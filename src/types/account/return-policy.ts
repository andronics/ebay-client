/**
 * Return Policy types for eBay Account API.
 */

import type { CategoryType, TimeDuration, ErrorDetail } from './fulfillment-policy.js';

/** Refund method type. */
export type RefundMethodType = 'MERCHANDISE_CREDIT' | 'MONEY_BACK';

/** Return method type. */
export type ReturnMethodType = 'EXCHANGE' | 'REPLACEMENT';

/** Return shipping cost payer. */
export type ReturnShippingCostPayerType = 'BUYER' | 'SELLER';

/** International return override settings. */
export interface InternationalReturnOverride {
  returnMethod?: ReturnMethodType;
  returnPeriod?: TimeDuration;
  returnsAccepted?: boolean;
  returnShippingCostPayer?: ReturnShippingCostPayerType;
}

/** Return policy defining return terms for a marketplace. */
export interface ReturnPolicy {
  categoryTypes?: CategoryType[];
  description?: string;
  extendedHolidayReturnsOffered?: boolean;
  internationalOverride?: InternationalReturnOverride;
  marketplaceId?: string;
  name?: string;
  refundMethod?: RefundMethodType;
  restockingFeePercentage?: string;
  returnInstructions?: string;
  returnMethod?: ReturnMethodType;
  returnPeriod?: TimeDuration;
  returnPolicyId?: string;
  returnsAccepted?: boolean;
  returnShippingCostPayer?: ReturnShippingCostPayerType;
}

/** Request body for creating/updating a return policy. */
export interface ReturnPolicyRequest {
  categoryTypes?: CategoryType[];
  description?: string;
  extendedHolidayReturnsOffered?: boolean;
  internationalOverride?: InternationalReturnOverride;
  marketplaceId?: string;
  name?: string;
  refundMethod?: RefundMethodType;
  restockingFeePercentage?: string;
  returnInstructions?: string;
  returnMethod?: ReturnMethodType;
  returnPeriod?: TimeDuration;
  returnsAccepted?: boolean;
  returnShippingCostPayer?: ReturnShippingCostPayerType;
}

/** Response when creating/updating a return policy. */
export interface SetReturnPolicyResponse extends ReturnPolicy {
  warnings?: ErrorDetail[];
}

/** Response containing list of return policies. */
export interface ReturnPoliciesResponse {
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  prev?: string;
  returnPolicies?: ReturnPolicy[];
  total?: number;
}
