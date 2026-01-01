import { BaseClient, type BaseClientConfig } from './base-client.js';
import type { OAuthConfig } from '../types/config.js';
import { buildOAuthHeaders, validateOAuthConfig } from '../auth/oauth.js';
import { httpRequest } from '../utils/http.js';
import { ApiError } from '../errors/api-error.js';

/**
 * Configuration for REST API clients.
 */
export interface RestClientConfig extends BaseClientConfig {
  /** OAuth 2.0 authentication configuration */
  auth: OAuthConfig;
}

/**
 * Standard error response from eBay REST APIs.
 */
export interface RestApiError {
  errors?: Array<{
    errorId?: number;
    domain?: string;
    category?: string;
    message?: string;
    longMessage?: string;
  }>;
}

/**
 * eBay API host URLs.
 */
const EBAY_HOSTS = {
  sandbox: 'https://api.sandbox.ebay.com',
  production: 'https://api.ebay.com',
} as const;

/**
 * Abstract base class for eBay REST API clients.
 *
 * Provides common functionality for REST-based APIs:
 * - OAuth authentication
 * - JSON request/response handling
 * - Error parsing and throwing
 * - Base URL construction
 *
 * @template TConfig - Client-specific configuration type extending RestClientConfig
 */
export abstract class BaseRestClient<
  TConfig extends RestClientConfig = RestClientConfig,
> extends BaseClient<TConfig> {
  protected readonly baseUrl: string;

  /**
   * Create a new REST client.
   *
   * @param config - Client configuration including auth
   * @param apiPath - API path (e.g., '/sell/fulfillment/v1')
   */
  constructor(config: TConfig, apiPath: string) {
    super(config);
    validateOAuthConfig(config.auth);
    this.baseUrl = this.buildBaseUrl(apiPath);
  }

  /**
   * Build the full base URL for this API.
   */
  private buildBaseUrl(apiPath: string): string {
    const host = this.config.sandbox ? EBAY_HOSTS.sandbox : EBAY_HOSTS.production;
    return `${host}${apiPath}`;
  }

  /**
   * Make a request to the REST API.
   *
   * @param method - HTTP method
   * @param path - Request path (appended to base URL)
   * @param options - Optional request body and/or additional headers
   * @returns Parsed response data
   * @throws ApiError if the API returns an error
   */
  protected async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    options?: { body?: object; headers?: Record<string, string> }
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const authHeaders = buildOAuthHeaders(this.config.auth);
    const headers = options?.headers
      ? { ...authHeaders, ...options.headers }
      : authHeaders;

    const response = await httpRequest<T | RestApiError>(url, {
      method,
      headers,
      body: options?.body,
      retry: this.retryConfig,
    });

    if (!response.ok) {
      this.handleError(response.data as RestApiError, path);
    }

    return response.data as T;
  }

  /**
   * Handle API error response.
   */
  private handleError(errorData: RestApiError, path: string): never {
    const error = errorData.errors?.[0];
    const message = error?.longMessage ?? error?.message ?? 'eBay API error';

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

  /**
   * Get the configured API endpoint URL.
   */
  getEndpoint(): string {
    return this.baseUrl;
  }

  /**
   * Get the configured base URL.
   * Alias for getEndpoint() for backwards compatibility.
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
