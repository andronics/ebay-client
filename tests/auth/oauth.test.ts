import { describe, it, expect } from 'vitest';
import {
  buildOAuthHeaders,
  isTokenExpired,
  validateOAuthConfig,
  OAuthScopes,
} from '../../src/auth/oauth.js';
import type { OAuthConfig } from '../../src/types/config.js';

describe('oauth', () => {
  describe('buildOAuthHeaders', () => {
    it('returns Bearer token format', () => {
      const config: OAuthConfig = { accessToken: 'abc123' };
      const headers = buildOAuthHeaders(config);
      expect(headers['Authorization']).toBe('Bearer abc123');
    });

    it('includes JSON Content-Type', () => {
      const config: OAuthConfig = { accessToken: 'abc123' };
      const headers = buildOAuthHeaders(config);
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('includes JSON Accept header', () => {
      const config: OAuthConfig = { accessToken: 'abc123' };
      const headers = buildOAuthHeaders(config);
      expect(headers['Accept']).toBe('application/json');
    });

    it('returns exactly 3 headers', () => {
      const config: OAuthConfig = { accessToken: 'abc123' };
      const headers = buildOAuthHeaders(config);
      expect(Object.keys(headers)).toHaveLength(3);
    });

    it('handles token with special characters', () => {
      const config: OAuthConfig = { accessToken: 'abc#123$%^&*' };
      const headers = buildOAuthHeaders(config);
      expect(headers['Authorization']).toBe('Bearer abc#123$%^&*');
    });

    it('handles long tokens', () => {
      const longToken = 'a'.repeat(2000);
      const config: OAuthConfig = { accessToken: longToken };
      const headers = buildOAuthHeaders(config);
      expect(headers['Authorization']).toBe(`Bearer ${longToken}`);
    });
  });

  describe('isTokenExpired', () => {
    it('returns false when expiresAt is undefined', () => {
      const config: OAuthConfig = { accessToken: 'token' };
      expect(isTokenExpired(config)).toBe(false);
    });

    it('returns false for future expiry (1 hour from now)', () => {
      const futureDate = new Date(Date.now() + 60 * 60 * 1000); // +1 hour
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: futureDate,
      };
      expect(isTokenExpired(config)).toBe(false);
    });

    it('returns true for past expiry', () => {
      const pastDate = new Date(Date.now() - 60 * 60 * 1000); // -1 hour
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: pastDate,
      };
      expect(isTokenExpired(config)).toBe(true);
    });

    it('returns true when within default buffer (5 minutes)', () => {
      const nearFuture = new Date(Date.now() + 4 * 60 * 1000); // +4 minutes
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: nearFuture,
      };
      expect(isTokenExpired(config)).toBe(true);
    });

    it('returns false when outside default buffer', () => {
      const nearFuture = new Date(Date.now() + 6 * 60 * 1000); // +6 minutes
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: nearFuture,
      };
      expect(isTokenExpired(config)).toBe(false);
    });

    it('respects custom buffer', () => {
      const nearFuture = new Date(Date.now() + 30 * 1000); // +30 seconds
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: nearFuture,
      };
      // With 60 second buffer, should be expired
      expect(isTokenExpired(config, 60000)).toBe(true);
      // With 10 second buffer, should not be expired
      expect(isTokenExpired(config, 10000)).toBe(false);
    });

    it('handles zero buffer', () => {
      const nearFuture = new Date(Date.now() + 1000); // +1 second
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: nearFuture,
      };
      expect(isTokenExpired(config, 0)).toBe(false);
    });

    it('handles Date object for expiresAt', () => {
      const futureDate = new Date(Date.now() + 60 * 60 * 1000);
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: futureDate,
      };
      expect(isTokenExpired(config)).toBe(false);
    });

    it('handles ISO string for expiresAt', () => {
      const futureDate = new Date(Date.now() + 60 * 60 * 1000);
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: futureDate.toISOString() as unknown as Date,
      };
      expect(isTokenExpired(config)).toBe(false);
    });

    it('returns true when exactly at expiry time', () => {
      const now = new Date();
      const config: OAuthConfig = {
        accessToken: 'token',
        expiresAt: now,
      };
      expect(isTokenExpired(config, 0)).toBe(true);
    });
  });

  describe('validateOAuthConfig', () => {
    it('passes with valid config', () => {
      const config: OAuthConfig = { accessToken: 'valid-token' };
      expect(() => validateOAuthConfig(config)).not.toThrow();
    });

    it('passes with optional fields', () => {
      const config: OAuthConfig = {
        accessToken: 'valid-token',
        refreshToken: 'refresh-token',
        expiresAt: new Date(),
      };
      expect(() => validateOAuthConfig(config)).not.toThrow();
    });

    it('throws when accessToken is empty string', () => {
      const config: OAuthConfig = { accessToken: '' };
      expect(() => validateOAuthConfig(config)).toThrow(
        'OAuth config missing accessToken'
      );
    });
  });

  describe('OAuthScopes', () => {
    it('has correct SELL scope', () => {
      expect(OAuthScopes.SELL).toBe(
        'https://api.ebay.com/oauth/api_scope/sell.inventory'
      );
    });

    it('has correct FULFILLMENT scope', () => {
      expect(OAuthScopes.FULFILLMENT).toBe(
        'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
      );
    });

    it('has correct ACCOUNT scope', () => {
      expect(OAuthScopes.ACCOUNT).toBe(
        'https://api.ebay.com/oauth/api_scope/sell.account'
      );
    });

    it('has correct MARKETING scope', () => {
      expect(OAuthScopes.MARKETING).toBe(
        'https://api.ebay.com/oauth/api_scope/sell.marketing'
      );
    });

    it('has correct FINANCES scope', () => {
      expect(OAuthScopes.FINANCES).toBe(
        'https://api.ebay.com/oauth/api_scope/sell.finances'
      );
    });

    it('has exactly 5 scopes', () => {
      expect(Object.keys(OAuthScopes)).toHaveLength(5);
    });
  });
});
