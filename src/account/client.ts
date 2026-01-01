import type { AccountClientConfig } from '../types/config.js';
import { getAccountEndpoint } from '../types/config.js';
import { buildOAuthHeaders, validateOAuthConfig } from '../auth/oauth.js';
import { httpRequest, type RetryConfig, DEFAULT_RETRY_CONFIG } from '../utils/http.js';
import { ApiError } from '../errors/api-error.js';

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

// ============================================================================
// Error Response Type
// ============================================================================

/**
 * Error response from Account API.
 */
interface AccountApiError {
  errors?: Array<{
    errorId?: number;
    domain?: string;
    category?: string;
    message?: string;
    longMessage?: string;
  }>;
}

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
export class AccountClient {
  private readonly config: AccountClientConfig;
  private readonly baseUrl: string;
  private readonly retryConfig: RetryConfig;

  constructor(config: AccountClientConfig) {
    validateOAuthConfig(config.auth);

    this.config = config;
    this.baseUrl = getAccountEndpoint(config.sandbox);
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config.retry };
  }

  /**
   * Make a request to the Account API.
   */
  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: object
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers = buildOAuthHeaders(this.config.auth);

    const response = await httpRequest<T | AccountApiError>(url, {
      method,
      headers,
      body,
      retry: this.retryConfig,
    });

    // Check for API errors
    if (!response.ok) {
      const errorData = response.data as AccountApiError;
      const error = errorData.errors?.[0];
      const message = error?.longMessage ?? error?.message ?? 'Account API error';
      throw new ApiError(
        message,
        {
          ErrorCode: String(error?.errorId ?? 'UNKNOWN'),
          ShortMessage: error?.message,
          LongMessage: error?.longMessage,
        },
        path
      );
    }

    return response.data as T;
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
    return this.request<SetFulfillmentPolicyResponse>('POST', '/fulfillment_policy/', policy);
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
    return this.request<SetFulfillmentPolicyResponse>('PUT', path, policy);
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
    return this.request<SetPaymentPolicyResponse>('POST', '/payment_policy', policy);
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
    return this.request<SetPaymentPolicyResponse>('PUT', path, policy);
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
    return this.request<SetReturnPolicyResponse>('POST', '/return_policy/', policy);
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
    return this.request<SetReturnPolicyResponse>('PUT', path, policy);
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

  // ===========================================================================
  // Utility
  // ===========================================================================

  /**
   * Get the configured base URL.
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Check if client is configured for sandbox.
   */
  isSandbox(): boolean {
    return this.config.sandbox;
  }
}
