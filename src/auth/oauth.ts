import type { OAuthConfig } from '../types/config.js';

/**
 * Build HTTP headers for eBay REST API calls using OAuth.
 *
 * @param config - OAuth configuration
 * @returns Headers object for the request
 */
export function buildOAuthHeaders(config: OAuthConfig): Record<string, string> {
  return {
    'Authorization': `Bearer ${config.accessToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

/**
 * Check if an OAuth token is expired or about to expire.
 *
 * @param config - OAuth configuration
 * @param bufferMs - Buffer time before expiration to consider it expired (default: 5 minutes)
 * @returns True if token is expired or will expire within buffer time
 */
export function isTokenExpired(config: OAuthConfig, bufferMs: number = 300000): boolean {
  if (!config.expiresAt) {
    // If no expiration is set, assume it's valid
    return false;
  }

  const now = new Date();
  const expiresAt = new Date(config.expiresAt);
  const bufferTime = new Date(expiresAt.getTime() - bufferMs);

  return now >= bufferTime;
}

/**
 * Validate an OAuth configuration.
 *
 * @param config - The configuration to validate
 * @throws Error if configuration is invalid
 */
export function validateOAuthConfig(config: OAuthConfig): void {
  if (!config.accessToken) {
    throw new Error('OAuth config missing accessToken');
  }
}

/**
 * Scopes commonly used with eBay OAuth.
 */
export const OAuthScopes = {
  /** Sell products on eBay */
  SELL: 'https://api.ebay.com/oauth/api_scope/sell.inventory',
  /** Manage orders */
  FULFILLMENT: 'https://api.ebay.com/oauth/api_scope/sell.fulfillment',
  /** View account information */
  ACCOUNT: 'https://api.ebay.com/oauth/api_scope/sell.account',
  /** Manage marketing campaigns */
  MARKETING: 'https://api.ebay.com/oauth/api_scope/sell.marketing',
  /** Manage finances */
  FINANCES: 'https://api.ebay.com/oauth/api_scope/sell.finances',
} as const;
