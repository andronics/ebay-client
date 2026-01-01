/**
 * Sample Account API JSON responses for testing.
 */

export const GET_FULFILLMENT_POLICY_SUCCESS = {
  fulfillmentPolicyId: 'FUL-12345678',
  name: 'Standard UK Shipping',
  marketplaceId: 'EBAY_GB',
  categoryTypes: [{ name: 'ALL_EXCLUDING_MOTORS_VEHICLES', default: true }],
  handlingTime: { unit: 'DAY', value: 1 },
  shippingOptions: [
    {
      optionType: 'DOMESTIC',
      costType: 'FLAT_RATE',
      shippingServices: [
        {
          shippingCarrierCode: 'Royal Mail',
          shippingServiceCode: 'UK_RoyalMailFirstClassStandard',
          shippingCost: { value: '3.99', currency: 'GBP' },
          freeShipping: false,
        },
      ],
    },
  ],
};

export const GET_FULFILLMENT_POLICIES_SUCCESS = {
  total: 2,
  fulfillmentPolicies: [
    {
      fulfillmentPolicyId: 'FUL-12345678',
      name: 'Standard UK Shipping',
      marketplaceId: 'EBAY_GB',
    },
    {
      fulfillmentPolicyId: 'FUL-87654321',
      name: 'Express UK Shipping',
      marketplaceId: 'EBAY_GB',
    },
  ],
};

export const CREATE_FULFILLMENT_POLICY_SUCCESS = {
  fulfillmentPolicyId: 'FUL-NEW-12345',
  name: 'New Shipping Policy',
  marketplaceId: 'EBAY_GB',
  warnings: [],
};

export const GET_PAYMENT_POLICY_SUCCESS = {
  paymentPolicyId: 'PAY-12345678',
  name: 'Standard Payment',
  marketplaceId: 'EBAY_GB',
  categoryTypes: [{ name: 'ALL_EXCLUDING_MOTORS_VEHICLES', default: true }],
  immediatePay: true,
  paymentMethods: [],
};

export const GET_PAYMENT_POLICIES_SUCCESS = {
  total: 2,
  paymentPolicies: [
    {
      paymentPolicyId: 'PAY-12345678',
      name: 'Standard Payment',
      marketplaceId: 'EBAY_GB',
    },
    {
      paymentPolicyId: 'PAY-87654321',
      name: 'Motors Payment',
      marketplaceId: 'EBAY_GB',
    },
  ],
};

export const CREATE_PAYMENT_POLICY_SUCCESS = {
  paymentPolicyId: 'PAY-NEW-12345',
  name: 'New Payment Policy',
  marketplaceId: 'EBAY_GB',
  warnings: [],
};

export const GET_RETURN_POLICY_SUCCESS = {
  returnPolicyId: 'RET-12345678',
  name: 'Standard Returns',
  marketplaceId: 'EBAY_GB',
  categoryTypes: [{ name: 'ALL_EXCLUDING_MOTORS_VEHICLES', default: true }],
  returnsAccepted: true,
  returnPeriod: { unit: 'DAY', value: 30 },
  returnShippingCostPayer: 'BUYER',
  refundMethod: 'MONEY_BACK',
};

export const GET_RETURN_POLICIES_SUCCESS = {
  total: 2,
  returnPolicies: [
    {
      returnPolicyId: 'RET-12345678',
      name: 'Standard Returns',
      marketplaceId: 'EBAY_GB',
    },
    {
      returnPolicyId: 'RET-87654321',
      name: 'Extended Returns',
      marketplaceId: 'EBAY_GB',
    },
  ],
};

export const CREATE_RETURN_POLICY_SUCCESS = {
  returnPolicyId: 'RET-NEW-12345',
  name: 'New Return Policy',
  marketplaceId: 'EBAY_GB',
  warnings: [],
};

export const GET_PRIVILEGES_SUCCESS = {
  sellerRegistrationCompleted: true,
  sellingLimit: {
    amount: { value: '25000.00', currency: 'GBP' },
    quantity: 500,
  },
};

export const API_ERROR_NOT_FOUND = {
  errors: [
    {
      errorId: 25001,
      domain: 'ACCOUNT',
      category: 'REQUEST',
      message: 'Policy not found',
      longMessage: 'The specified policy was not found.',
    },
  ],
};

export const API_ERROR_INVALID_POLICY = {
  errors: [
    {
      errorId: 25002,
      domain: 'ACCOUNT',
      category: 'REQUEST',
      message: 'Invalid policy',
      longMessage: 'The policy data is invalid.',
    },
  ],
};

export const API_ERROR_UNAUTHORIZED = {
  errors: [
    {
      errorId: 1001,
      domain: 'API_AUTH',
      category: 'REQUEST',
      message: 'Access denied',
      longMessage: 'Access token is invalid or expired.',
    },
  ],
};
