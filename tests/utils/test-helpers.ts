import type { OAuthConfig, AuthNAuthConfig } from '../../src/types/config.js';

/**
 * Standard OAuth test configuration.
 */
export const TEST_OAUTH_CONFIG: OAuthConfig = {
  type: 'oauth',
  accessToken: 'test-access-token',
};

/**
 * Standard Auth'n'Auth test configuration.
 */
export const TEST_AUTH_N_AUTH_CONFIG: AuthNAuthConfig = {
  type: 'auth-n-auth',
  appId: 'test-app-id',
  devId: 'test-dev-id',
  certId: 'test-cert-id',
  authToken: 'test-auth-token',
};

/**
 * Create a REST client configuration for testing.
 */
export function createRestClientConfig(overrides: Record<string, unknown> = {}) {
  return {
    sandbox: true,
    auth: TEST_OAUTH_CONFIG,
    ...overrides,
  };
}

/**
 * Create a Trading client configuration for testing.
 */
export function createTradingClientConfig(overrides: Record<string, unknown> = {}) {
  return {
    sandbox: true,
    siteId: 3,
    auth: TEST_AUTH_N_AUTH_CONFIG,
    ...overrides,
  };
}

/**
 * API paths for eBay APIs.
 */
export const API_PATHS = {
  trading: '/ws/api.dll',
  fulfillment: '/sell/fulfillment/v1',
  inventory: '/sell/inventory/v1',
  account: '/sell/account/v1',
  taxonomy: '/commerce/taxonomy/v1',
} as const;

/**
 * eBay host URLs.
 */
export const EBAY_HOSTS = {
  sandbox: 'https://api.sandbox.ebay.com',
  production: 'https://api.ebay.com',
} as const;

/**
 * Assert a URL points to the sandbox endpoint for a given API.
 */
export function assertSandboxEndpoint(url: string, apiPath: string) {
  const expected = `${EBAY_HOSTS.sandbox}${apiPath}`;
  if (url !== expected) {
    throw new Error(`Expected sandbox endpoint ${expected}, got ${url}`);
  }
}

/**
 * Assert a URL points to the production endpoint for a given API.
 */
export function assertProductionEndpoint(url: string, apiPath: string) {
  const expected = `${EBAY_HOSTS.production}${apiPath}`;
  if (url !== expected) {
    throw new Error(`Expected production endpoint ${expected}, got ${url}`);
  }
}

/**
 * Standard error response structure for eBay REST APIs.
 */
export function createErrorResponse(options: {
  errorId?: number;
  message?: string;
  longMessage?: string;
} = {}) {
  return {
    errors: [{
      errorId: options.errorId ?? 25001,
      domain: 'API_ERROR',
      category: 'REQUEST',
      message: options.message ?? 'Error message',
      longMessage: options.longMessage ?? 'Long error message',
    }],
  };
}

/**
 * Create a mock HTTP response for testing.
 */
export function createMockHttpResponse<T>(data: T, ok = true) {
  return {
    data,
    ok,
    status: ok ? 200 : 400,
    raw: JSON.stringify(data),
  };
}
