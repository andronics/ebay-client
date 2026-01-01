import type { AuthNAuthConfig } from '../types/config.js';

/**
 * Build HTTP headers for eBay Trading API calls using Auth'n'Auth.
 *
 * @param config - Auth'n'Auth configuration
 * @param operationName - The API operation being called
 * @param siteId - eBay site ID
 * @param compatibilityLevel - API compatibility level
 * @returns Headers object for the request
 */
export function buildAuthNAuthHeaders(
  config: AuthNAuthConfig,
  operationName: string,
  siteId: number,
  compatibilityLevel: number
): Record<string, string> {
  return {
    'Content-Type': 'text/xml; charset=utf-8',
    'X-EBAY-API-COMPATIBILITY-LEVEL': String(compatibilityLevel),
    'X-EBAY-API-SITEID': String(siteId),
    'X-EBAY-API-CALL-NAME': operationName,
    'X-EBAY-API-APP-NAME': config.appId,
    'X-EBAY-API-DEV-NAME': config.devId,
    'X-EBAY-API-CERT-NAME': config.certId,
  };
}

/**
 * Validate an Auth'n'Auth configuration.
 *
 * @param config - The configuration to validate
 * @throws Error if configuration is invalid
 */
export function validateAuthNAuthConfig(config: AuthNAuthConfig): void {
  if (!config.appId) {
    throw new Error('Auth config missing appId');
  }
  if (!config.devId) {
    throw new Error('Auth config missing devId');
  }
  if (!config.certId) {
    throw new Error('Auth config missing certId');
  }
  if (!config.authToken) {
    throw new Error('Auth config missing authToken');
  }
}
