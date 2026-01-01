import type { RetryConfig } from '../utils/http.js';

/**
 * Auth'n'Auth (legacy) authentication configuration.
 * Used for Trading API with long-lived tokens.
 */
export interface AuthNAuthConfig {
  type: 'auth-n-auth';
  /** eBay Application ID */
  appId: string;
  /** eBay Developer ID */
  devId: string;
  /** eBay Certificate ID */
  certId: string;
  /** eBay Auth Token (long-lived, ~18 months) */
  authToken: string;
}

/**
 * OAuth 2.0 authentication configuration.
 * Used for modern APIs like Fulfillment.
 */
export interface OAuthConfig {
  type: 'oauth';
  /** Current access token */
  accessToken: string;
  /** Refresh token for obtaining new access tokens */
  refreshToken?: string;
  /** When the access token expires */
  expiresAt?: Date;
}

/**
 * Union of all authentication configurations.
 */
export type AuthConfig = AuthNAuthConfig | OAuthConfig;

/**
 * Common eBay site IDs.
 */
export const EbaySiteId = {
  US: 0,
  Canada: 2,
  UK: 3,
  Australia: 15,
  Germany: 77,
  France: 71,
  Italy: 101,
  Spain: 186,
} as const;

export type EbaySiteIdValue = (typeof EbaySiteId)[keyof typeof EbaySiteId];

/**
 * Trading API client configuration.
 */
export interface TradingClientConfig {
  /** Use sandbox (true) or production (false) environment */
  sandbox: boolean;
  /** eBay site ID (0=US, 3=UK, etc.) */
  siteId: number;
  /** API compatibility level (default: 1225) */
  compatibilityLevel?: number;
  /** Authentication configuration */
  auth: AuthNAuthConfig;
  /** Retry configuration */
  retry?: Partial<RetryConfig>;
}

/**
 * Fulfillment API client configuration.
 */
export interface FulfillmentClientConfig {
  /** Use sandbox (true) or production (false) environment */
  sandbox: boolean;
  /** Authentication configuration */
  auth: OAuthConfig;
  /** Retry configuration */
  retry?: Partial<RetryConfig>;
}

/**
 * Inventory API client configuration.
 */
export interface InventoryClientConfig {
  /** Use sandbox (true) or production (false) environment */
  sandbox: boolean;
  /** Authentication configuration */
  auth: OAuthConfig;
  /** Retry configuration */
  retry?: Partial<RetryConfig>;
}

/**
 * Get the eBay Trading API endpoint URL.
 */
export function getTradingEndpoint(sandbox: boolean): string {
  return sandbox
    ? 'https://api.sandbox.ebay.com/ws/api.dll'
    : 'https://api.ebay.com/ws/api.dll';
}

/**
 * Get the eBay Fulfillment API base URL.
 */
export function getFulfillmentEndpoint(sandbox: boolean): string {
  return sandbox
    ? 'https://api.sandbox.ebay.com/sell/fulfillment/v1'
    : 'https://api.ebay.com/sell/fulfillment/v1';
}

/**
 * Get the eBay Inventory API base URL.
 */
export function getInventoryEndpoint(sandbox: boolean): string {
  return sandbox
    ? 'https://api.sandbox.ebay.com/sell/inventory/v1'
    : 'https://api.ebay.com/sell/inventory/v1';
}
