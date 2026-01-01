import { describe, it, expect } from 'vitest';
import {
  buildAckResponse,
  buildChallengeResponse,
  ACK_RESPONSE_HEADERS,
  isChallengeRequest,
  getChallengeValue,
} from '../../../src/notifications/response.js';

describe('notifications/response', () => {
  describe('buildAckResponse', () => {
    it('returns OK', () => {
      expect(buildAckResponse()).toBe('OK');
    });
  });

  describe('buildChallengeResponse', () => {
    it('returns the challenge value unchanged', () => {
      expect(buildChallengeResponse('abc123')).toBe('abc123');
    });

    it('handles empty string', () => {
      expect(buildChallengeResponse('')).toBe('');
    });

    it('handles special characters', () => {
      const challenge = 'test=value&foo=bar';
      expect(buildChallengeResponse(challenge)).toBe(challenge);
    });

    it('handles long challenge strings', () => {
      const challenge = 'a'.repeat(100);
      expect(buildChallengeResponse(challenge)).toBe(challenge);
    });
  });

  describe('ACK_RESPONSE_HEADERS', () => {
    it('has correct Content-Type', () => {
      expect(ACK_RESPONSE_HEADERS['Content-Type']).toBe('text/plain; charset=utf-8');
    });

    it('is readonly', () => {
      // TypeScript enforces this at compile time, but we can verify it exists
      expect(ACK_RESPONSE_HEADERS).toBeDefined();
    });
  });

  describe('isChallengeRequest', () => {
    describe('with object query params', () => {
      it('returns true for GET with challenge param', () => {
        expect(isChallengeRequest('GET', { challenge: 'abc123' })).toBe(true);
      });

      it('returns false for POST with challenge param', () => {
        expect(isChallengeRequest('POST', { challenge: 'abc123' })).toBe(false);
      });

      it('returns false for GET without challenge param', () => {
        expect(isChallengeRequest('GET', {})).toBe(false);
      });

      it('returns false when challenge is undefined', () => {
        expect(isChallengeRequest('GET', { challenge: undefined })).toBe(false);
      });

      it('handles lowercase method', () => {
        expect(isChallengeRequest('get', { challenge: 'abc123' })).toBe(true);
      });

      it('handles mixed case method', () => {
        expect(isChallengeRequest('GeT', { challenge: 'abc123' })).toBe(true);
      });
    });

    describe('with URLSearchParams', () => {
      it('returns true for GET with challenge param', () => {
        const params = new URLSearchParams('challenge=abc123');
        expect(isChallengeRequest('GET', params)).toBe(true);
      });

      it('returns false for GET without challenge param', () => {
        const params = new URLSearchParams('other=value');
        expect(isChallengeRequest('GET', params)).toBe(false);
      });

      it('returns false for POST with challenge param', () => {
        const params = new URLSearchParams('challenge=abc123');
        expect(isChallengeRequest('POST', params)).toBe(false);
      });

      it('handles empty URLSearchParams', () => {
        const params = new URLSearchParams();
        expect(isChallengeRequest('GET', params)).toBe(false);
      });
    });
  });

  describe('getChallengeValue', () => {
    describe('with object query params', () => {
      it('returns challenge value', () => {
        expect(getChallengeValue({ challenge: 'abc123' })).toBe('abc123');
      });

      it('returns undefined when challenge is undefined', () => {
        expect(getChallengeValue({ challenge: undefined })).toBeUndefined();
      });

      it('returns undefined when challenge is not present', () => {
        expect(getChallengeValue({})).toBeUndefined();
      });

      it('handles empty string value', () => {
        expect(getChallengeValue({ challenge: '' })).toBe('');
      });
    });

    describe('with URLSearchParams', () => {
      it('returns challenge value', () => {
        const params = new URLSearchParams('challenge=abc123');
        expect(getChallengeValue(params)).toBe('abc123');
      });

      it('returns undefined when challenge not present', () => {
        const params = new URLSearchParams('other=value');
        expect(getChallengeValue(params)).toBeUndefined();
      });

      it('handles empty URLSearchParams', () => {
        const params = new URLSearchParams();
        expect(getChallengeValue(params)).toBeUndefined();
      });

      it('handles empty string value', () => {
        const params = new URLSearchParams('challenge=');
        expect(getChallengeValue(params)).toBe('');
      });
    });
  });
});
