import { describe, it, expect } from 'vitest';
import {
  buildAuthNAuthHeaders,
  validateAuthNAuthConfig,
} from '../../../src/auth/auth-n-auth.js';
import type { AuthNAuthConfig } from '../../../src/types/config.js';

const validConfig: AuthNAuthConfig = {
  appId: 'test-app-id',
  devId: 'test-dev-id',
  certId: 'test-cert-id',
  authToken: 'test-auth-token',
};

describe('auth-n-auth', () => {
  describe('buildAuthNAuthHeaders', () => {
    it('returns correct Content-Type header', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(headers['Content-Type']).toBe('text/xml; charset=utf-8');
    });

    it('includes compatibility level as string', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(headers['X-EBAY-API-COMPATIBILITY-LEVEL']).toBe('1225');
    });

    it('includes site ID as string', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(headers['X-EBAY-API-SITEID']).toBe('3');
    });

    it('handles US site ID (0)', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 0, 1225);
      expect(headers['X-EBAY-API-SITEID']).toBe('0');
    });

    it('includes operation name', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(headers['X-EBAY-API-CALL-NAME']).toBe('GetItem');
    });

    it('includes app credentials', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(headers['X-EBAY-API-APP-NAME']).toBe('test-app-id');
    });

    it('includes dev credentials', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(headers['X-EBAY-API-DEV-NAME']).toBe('test-dev-id');
    });

    it('includes cert credentials', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(headers['X-EBAY-API-CERT-NAME']).toBe('test-cert-id');
    });

    it('returns all 7 required headers', () => {
      const headers = buildAuthNAuthHeaders(validConfig, 'GetItem', 3, 1225);
      expect(Object.keys(headers)).toHaveLength(7);
    });

    it('handles different operation names', () => {
      const ops = ['AddItem', 'ReviseItem', 'EndItem', 'GetTokenStatus'];
      for (const op of ops) {
        const headers = buildAuthNAuthHeaders(validConfig, op, 3, 1225);
        expect(headers['X-EBAY-API-CALL-NAME']).toBe(op);
      }
    });
  });

  describe('validateAuthNAuthConfig', () => {
    it('passes with valid config', () => {
      expect(() => validateAuthNAuthConfig(validConfig)).not.toThrow();
    });

    it('throws when appId is missing', () => {
      const config = { ...validConfig, appId: '' };
      expect(() => validateAuthNAuthConfig(config)).toThrow(
        'Auth config missing appId'
      );
    });

    it('throws when devId is missing', () => {
      const config = { ...validConfig, devId: '' };
      expect(() => validateAuthNAuthConfig(config)).toThrow(
        'Auth config missing devId'
      );
    });

    it('throws when certId is missing', () => {
      const config = { ...validConfig, certId: '' };
      expect(() => validateAuthNAuthConfig(config)).toThrow(
        'Auth config missing certId'
      );
    });

    it('throws when authToken is missing', () => {
      const config = { ...validConfig, authToken: '' };
      expect(() => validateAuthNAuthConfig(config)).toThrow(
        'Auth config missing authToken'
      );
    });
  });
});
