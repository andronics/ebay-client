/**
 * Account API types - curated types for common use cases.
 *
 * For full OpenAPI-generated types, use:
 * import { Generated } from '@andronics/ebay-client/types/account';
 */

// Fulfillment Policy types
export type {
  TimeDurationUnit,
  TimeDuration,
  ShippingOptionType,
  ShippingCostType,
  CategoryType,
  RegionType,
  Region,
  RegionSet,
  Amount,
  ShippingService,
  ShippingOption,
  FulfillmentPolicy,
  FulfillmentPolicyRequest,
  SetFulfillmentPolicyResponse,
  FulfillmentPoliciesResponse,
  ErrorDetail,
} from './fulfillment-policy.js';

// Payment Policy types
export type {
  PaymentMethodType,
  RecipientAccountReference,
  PaymentMethod,
  Deposit,
  PaymentPolicy,
  PaymentPolicyRequest,
  SetPaymentPolicyResponse,
  PaymentPoliciesResponse,
} from './payment-policy.js';

// Return Policy types
export type {
  RefundMethodType,
  ReturnMethodType,
  ReturnShippingCostPayerType,
  InternationalReturnOverride,
  ReturnPolicy,
  ReturnPolicyRequest,
  SetReturnPolicyResponse,
  ReturnPoliciesResponse,
} from './return-policy.js';

// Privilege types
export type {
  SellingLimit,
  SellingPrivileges,
} from './privilege.js';

// Generated types namespace
export * as Generated from './generated/index.js';
