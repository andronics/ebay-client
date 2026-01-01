import type { AccountClientConfig } from '../types/config.js';
import { BaseRestClient } from '../base/index.js';

import type {
  FulfillmentPolicy,
  FulfillmentPolicyRequest,
  SetFulfillmentPolicyResponse,
  FulfillmentPoliciesResponse,
  PaymentPolicy,
  PaymentPolicyRequest,
  SetPaymentPolicyResponse,
  PaymentPoliciesResponse,
  ReturnPolicy,
  ReturnPolicyRequest,
  SetReturnPolicyResponse,
  ReturnPoliciesResponse,
  SellingPrivileges,
} from '../types/account/index.js';

/**
 * API path for the Account API.
 */
const API_PATH = '/sell/account/v1';

// ============================================================================
// Client Class
// ============================================================================

/**
 * Client for eBay Account API (REST-based).
 *
 * The Account API allows sellers to manage business policies (fulfillment,
 * payment, return) and check account privileges.
 *
 * @example
 * ```typescript
 * const client = new AccountClient({
 *   sandbox: false,
 *   auth: {
 *     type: 'oauth',
 *     accessToken: 'your-access-token',
 *   },
 * });
 *
 * // Create a fulfillment policy
 * const { fulfillmentPolicyId } = await client.createFulfillmentPolicy({
 *   name: 'Standard Shipping',
 *   marketplaceId: 'EBAY_GB',
 *   handlingTime: { unit: 'DAY', value: 1 },
 * });
 *
 * // Get all policies for a marketplace
 * const policies = await client.getFulfillmentPolicies('EBAY_GB');
 *
 * // Check account privileges
 * const privileges = await client.getPrivileges();
 * ```
 */
export class AccountClient extends BaseRestClient<AccountClientConfig> {
  constructor(config: AccountClientConfig) {
    super(config, API_PATH);
  }

  // ===========================================================================
  // Fulfillment Policy Operations
  // ===========================================================================

  /**
   * Create a fulfillment policy.
   *
   * @param policy - The fulfillment policy data
   */
  async createFulfillmentPolicy(
    policy: FulfillmentPolicyRequest
  ): Promise<SetFulfillmentPolicyResponse> {
    return this.request<SetFulfillmentPolicyResponse>('POST', '/fulfillment_policy/', { body: policy });
  }

  /**
   * Get a fulfillment policy by ID.
   *
   * @param policyId - The fulfillment policy ID
   */
  async getFulfillmentPolicy(policyId: string): Promise<FulfillmentPolicy> {
    const path = `/fulfillment_policy/${encodeURIComponent(policyId)}`;
    return this.request<FulfillmentPolicy>('GET', path);
  }

  /**
   * Get all fulfillment policies for a marketplace.
   *
   * @param marketplaceId - The eBay marketplace ID (e.g., 'EBAY_GB')
   */
  async getFulfillmentPolicies(marketplaceId: string): Promise<FulfillmentPoliciesResponse> {
    const path = `/fulfillment_policy?marketplace_id=${encodeURIComponent(marketplaceId)}`;
    return this.request<FulfillmentPoliciesResponse>('GET', path);
  }

  /**
   * Update a fulfillment policy.
   *
   * @param policyId - The fulfillment policy ID
   * @param policy - The updated policy data
   */
  async updateFulfillmentPolicy(
    policyId: string,
    policy: FulfillmentPolicyRequest
  ): Promise<SetFulfillmentPolicyResponse> {
    const path = `/fulfillment_policy/${encodeURIComponent(policyId)}`;
    return this.request<SetFulfillmentPolicyResponse>('PUT', path, { body: policy });
  }

  /**
   * Delete a fulfillment policy.
   *
   * @param policyId - The fulfillment policy ID
   */
  async deleteFulfillmentPolicy(policyId: string): Promise<void> {
    const path = `/fulfillment_policy/${encodeURIComponent(policyId)}`;
    await this.request<void>('DELETE', path);
  }

  // ===========================================================================
  // Payment Policy Operations
  // ===========================================================================

  /**
   * Create a payment policy.
   *
   * @param policy - The payment policy data
   */
  async createPaymentPolicy(policy: PaymentPolicyRequest): Promise<SetPaymentPolicyResponse> {
    return this.request<SetPaymentPolicyResponse>('POST', '/payment_policy', { body: policy });
  }

  /**
   * Get a payment policy by ID.
   *
   * @param policyId - The payment policy ID
   */
  async getPaymentPolicy(policyId: string): Promise<PaymentPolicy> {
    const path = `/payment_policy/${encodeURIComponent(policyId)}`;
    return this.request<PaymentPolicy>('GET', path);
  }

  /**
   * Get all payment policies for a marketplace.
   *
   * @param marketplaceId - The eBay marketplace ID (e.g., 'EBAY_GB')
   */
  async getPaymentPolicies(marketplaceId: string): Promise<PaymentPoliciesResponse> {
    const path = `/payment_policy?marketplace_id=${encodeURIComponent(marketplaceId)}`;
    return this.request<PaymentPoliciesResponse>('GET', path);
  }

  /**
   * Update a payment policy.
   *
   * @param policyId - The payment policy ID
   * @param policy - The updated policy data
   */
  async updatePaymentPolicy(
    policyId: string,
    policy: PaymentPolicyRequest
  ): Promise<SetPaymentPolicyResponse> {
    const path = `/payment_policy/${encodeURIComponent(policyId)}`;
    return this.request<SetPaymentPolicyResponse>('PUT', path, { body: policy });
  }

  /**
   * Delete a payment policy.
   *
   * @param policyId - The payment policy ID
   */
  async deletePaymentPolicy(policyId: string): Promise<void> {
    const path = `/payment_policy/${encodeURIComponent(policyId)}`;
    await this.request<void>('DELETE', path);
  }

  // ===========================================================================
  // Return Policy Operations
  // ===========================================================================

  /**
   * Create a return policy.
   *
   * @param policy - The return policy data
   */
  async createReturnPolicy(policy: ReturnPolicyRequest): Promise<SetReturnPolicyResponse> {
    return this.request<SetReturnPolicyResponse>('POST', '/return_policy/', { body: policy });
  }

  /**
   * Get a return policy by ID.
   *
   * @param policyId - The return policy ID
   */
  async getReturnPolicy(policyId: string): Promise<ReturnPolicy> {
    const path = `/return_policy/${encodeURIComponent(policyId)}`;
    return this.request<ReturnPolicy>('GET', path);
  }

  /**
   * Get all return policies for a marketplace.
   *
   * @param marketplaceId - The eBay marketplace ID (e.g., 'EBAY_GB')
   */
  async getReturnPolicies(marketplaceId: string): Promise<ReturnPoliciesResponse> {
    const path = `/return_policy?marketplace_id=${encodeURIComponent(marketplaceId)}`;
    return this.request<ReturnPoliciesResponse>('GET', path);
  }

  /**
   * Update a return policy.
   *
   * @param policyId - The return policy ID
   * @param policy - The updated policy data
   */
  async updateReturnPolicy(
    policyId: string,
    policy: ReturnPolicyRequest
  ): Promise<SetReturnPolicyResponse> {
    const path = `/return_policy/${encodeURIComponent(policyId)}`;
    return this.request<SetReturnPolicyResponse>('PUT', path, { body: policy });
  }

  /**
   * Delete a return policy.
   *
   * @param policyId - The return policy ID
   */
  async deleteReturnPolicy(policyId: string): Promise<void> {
    const path = `/return_policy/${encodeURIComponent(policyId)}`;
    await this.request<void>('DELETE', path);
  }

  // ===========================================================================
  // Privilege Operations
  // ===========================================================================

  /**
   * Get seller privileges and selling limits.
   */
  async getPrivileges(): Promise<SellingPrivileges> {
    return this.request<SellingPrivileges>('GET', '/privilege');
  }
}
