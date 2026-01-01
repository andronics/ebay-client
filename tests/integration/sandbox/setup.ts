import type { TradingClientConfig } from '../../../src/types/config.js';

/**
 * Sandbox configuration from environment variables.
 */
export const sandboxConfig: TradingClientConfig = {
  sandbox: true,
  siteId: 3, // UK
  auth: {
    type: 'auth-n-auth',
    appId: process.env.EBAY_SANDBOX_APP_ID ?? '',
    devId: process.env.EBAY_SANDBOX_DEV_ID ?? '',
    certId: process.env.EBAY_SANDBOX_CERT_ID ?? '',
    authToken: process.env.EBAY_SANDBOX_AUTH_TOKEN ?? '',
  },
};

/**
 * Check if sandbox credentials are available.
 */
export const hasSandboxCredentials = !!(
  sandboxConfig.auth.appId &&
  sandboxConfig.auth.devId &&
  sandboxConfig.auth.certId &&
  sandboxConfig.auth.authToken
);

/**
 * Conditionally run a describe block only when sandbox credentials are available.
 *
 * @example
 * ```typescript
 * describeIfSandbox('Trading API Sandbox', () => {
 *   it('creates a listing', async () => {
 *     // ...
 *   });
 * });
 * ```
 */
export const describeIfSandbox = hasSandboxCredentials ? describe : describe.skip;

/**
 * Log sandbox credential status for debugging.
 */
export function logSandboxStatus(): void {
  if (hasSandboxCredentials) {
    console.log('Sandbox credentials found - running real API tests');
  } else {
    console.log('Sandbox credentials not found - skipping real API tests');
    console.log('To run sandbox tests, set these environment variables:');
    console.log('  - EBAY_SANDBOX_APP_ID');
    console.log('  - EBAY_SANDBOX_DEV_ID');
    console.log('  - EBAY_SANDBOX_CERT_ID');
    console.log('  - EBAY_SANDBOX_AUTH_TOKEN');
  }
}
