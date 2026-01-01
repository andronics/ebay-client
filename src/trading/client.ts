import type { TradingClientConfig } from '../types/config.js';
import { getTradingEndpoint } from '../types/config.js';
import { buildAuthNAuthHeaders, validateAuthNAuthConfig } from '../auth/auth-n-auth.js';
import { buildTradingRequest, parseTradingResponse } from '../utils/xml.js';
import { httpPost, type RetryConfig, DEFAULT_RETRY_CONFIG } from '../utils/http.js';
import { ApiError, type EbayApiErrorDetail } from '../errors/api-error.js';

import type {
  GetTokenStatusResponse,
  AddItemResponse,
  ReviseItemResponse,
  EndItemResponse,
  GetItemResponse,
  SetNotificationPreferencesResponse,
  GetNotificationPreferencesResponse,
  BaseResponse,
} from '../types/trading/index.js';

import type {
  AddItemRequest,
  VerifyAddItemRequest,
  ReviseItemRequest,
  EndItemRequest,
  GetItemRequest,
  SetNotificationPreferencesRequest,
  GetNotificationPreferencesRequest,
  PreferenceLevelType,
} from '../types/trading/index.js';

/**
 * Default API compatibility level.
 */
const DEFAULT_COMPATIBILITY_LEVEL = 1225;

/**
 * Client for eBay Trading API (XML-based).
 *
 * @example
 * ```typescript
 * const client = new TradingClient({
 *   sandbox: true,
 *   siteId: 3, // UK
 *   auth: {
 *     type: 'auth-n-auth',
 *     appId: 'your-app-id',
 *     devId: 'your-dev-id',
 *     certId: 'your-cert-id',
 *     authToken: 'your-auth-token',
 *   },
 * });
 *
 * const status = await client.getTokenStatus();
 * ```
 */
export class TradingClient {
  private readonly config: TradingClientConfig;
  private readonly endpoint: string;
  private readonly compatibilityLevel: number;
  private readonly retryConfig: RetryConfig;

  constructor(config: TradingClientConfig) {
    validateAuthNAuthConfig(config.auth);

    this.config = config;
    this.endpoint = getTradingEndpoint(config.sandbox);
    this.compatibilityLevel = config.compatibilityLevel ?? DEFAULT_COMPATIBILITY_LEVEL;
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config.retry };
  }

  /**
   * Execute a Trading API operation.
   *
   * @param operationName - The API operation name
   * @param params - Request parameters
   * @returns Parsed response
   * @throws ApiError if eBay returns an error
   */
  private async execute<T extends BaseResponse>(
    operationName: string,
    params: object = {}
  ): Promise<T> {
    const headers = buildAuthNAuthHeaders(
      this.config.auth,
      operationName,
      this.config.siteId,
      this.compatibilityLevel
    );

    const body = buildTradingRequest(
      operationName,
      this.config.auth.authToken,
      params
    );

    const response = await httpPost<string>(this.endpoint, body, {
      headers,
      retry: this.retryConfig,
    });

    const result = parseTradingResponse<T>(response.raw, operationName);

    // Check for API errors
    if (result.Ack === 'Failure') {
      const errors = result.Errors;
      const errorArray = Array.isArray(errors) ? errors : errors ? [errors] : [];
      const primary = errorArray[0] as EbayApiErrorDetail | undefined;
      const message = primary?.LongMessage ?? primary?.ShortMessage ?? 'eBay API error';
      throw new ApiError(message, errorArray as EbayApiErrorDetail[], operationName);
    }

    return result;
  }

  // ===========================================================================
  // Health / Status
  // ===========================================================================

  /**
   * Get the status of the authentication token.
   * Useful for health checks and verifying API connectivity.
   */
  async getTokenStatus(): Promise<GetTokenStatusResponse> {
    return this.execute<GetTokenStatusResponse>('GetTokenStatus');
  }

  // ===========================================================================
  // Listing Operations
  // ===========================================================================

  /**
   * Validate a listing without actually creating it.
   * Use this to check for errors before creating a real listing.
   *
   * @param request - The item details to validate
   */
  async verifyAddItem(request: VerifyAddItemRequest): Promise<AddItemResponse> {
    return this.execute<AddItemResponse>('VerifyAddItem', request);
  }

  /**
   * Create a new listing on eBay.
   *
   * @param request - The item details
   */
  async addItem(request: AddItemRequest): Promise<AddItemResponse> {
    return this.execute<AddItemResponse>('AddItem', request);
  }

  /**
   * Update an existing listing.
   *
   * @param request - The item updates (must include ItemID)
   */
  async reviseItem(request: ReviseItemRequest): Promise<ReviseItemResponse> {
    return this.execute<ReviseItemResponse>('ReviseItem', request);
  }

  /**
   * End a listing early.
   *
   * @param request - The item ID and reason for ending
   */
  async endItem(request: EndItemRequest): Promise<EndItemResponse> {
    return this.execute<EndItemResponse>('EndItem', request);
  }

  /**
   * Get detailed information about a listing.
   *
   * @param request - The item ID and optional detail level
   */
  async getItem(request: GetItemRequest): Promise<GetItemResponse> {
    return this.execute<GetItemResponse>('GetItem', request);
  }

  // ===========================================================================
  // Notification Preferences
  // ===========================================================================

  /**
   * Configure notification subscriptions.
   *
   * @param request - Notification preferences to set
   */
  async setNotificationPreferences(
    request: SetNotificationPreferencesRequest
  ): Promise<SetNotificationPreferencesResponse> {
    return this.execute<SetNotificationPreferencesResponse>(
      'SetNotificationPreferences',
      request
    );
  }

  /**
   * Get current notification preferences.
   *
   * @param level - 'User' or 'Application' level preferences
   */
  async getNotificationPreferences(
    level: PreferenceLevelType = 'User'
  ): Promise<GetNotificationPreferencesResponse> {
    const request: GetNotificationPreferencesRequest = {
      PreferenceLevel: level,
    };
    return this.execute<GetNotificationPreferencesResponse>(
      'GetNotificationPreferences',
      request
    );
  }

  /**
   * Get both User and Application notification preferences.
   * Convenience method that combines both preference levels.
   */
  async getFullNotificationPreferences(): Promise<{
    user: GetNotificationPreferencesResponse;
    application: GetNotificationPreferencesResponse;
  }> {
    const [user, application] = await Promise.all([
      this.getNotificationPreferences('User'),
      this.getNotificationPreferences('Application'),
    ]);
    return { user, application };
  }

  // ===========================================================================
  // Utility
  // ===========================================================================

  /**
   * Get the configured endpoint URL.
   */
  getEndpoint(): string {
    return this.endpoint;
  }

  /**
   * Check if client is configured for sandbox.
   */
  isSandbox(): boolean {
    return this.config.sandbox;
  }
}
