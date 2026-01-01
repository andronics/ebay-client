import { describe, it, expect } from 'vitest';
import { SignatureError } from '../../src/errors/signature-error.js';
import { EbayError } from '../../src/errors/ebay-error.js';

describe('SignatureError', () => {
  describe('constructor', () => {
    it('extends EbayError', () => {
      const error = new SignatureError('Test', 'missing_signature');
      expect(error).toBeInstanceOf(EbayError);
      expect(error).toBeInstanceOf(Error);
    });

    it('sets name to SignatureError', () => {
      const error = new SignatureError('Test', 'missing_signature');
      expect(error.name).toBe('SignatureError');
    });

    it('sets message', () => {
      const error = new SignatureError('Custom message', 'missing_signature');
      expect(error.message).toBe('Custom message');
    });

    it('sets reason', () => {
      const error = new SignatureError('Test', 'expired_timestamp');
      expect(error.reason).toBe('expired_timestamp');
    });

    it('sets expected value', () => {
      const error = new SignatureError('Test', 'invalid_signature', {
        expected: 'abc123',
      });
      expect(error.expected).toBe('abc123');
    });

    it('sets actual value', () => {
      const error = new SignatureError('Test', 'invalid_signature', {
        actual: 'xyz789',
      });
      expect(error.actual).toBe('xyz789');
    });
  });

  describe('missingSignature', () => {
    it('creates error with correct message', () => {
      const error = SignatureError.missingSignature();
      expect(error.message).toBe('Notification is missing signature header');
    });

    it('sets reason to missing_signature', () => {
      const error = SignatureError.missingSignature();
      expect(error.reason).toBe('missing_signature');
    });

    it('is instance of SignatureError', () => {
      const error = SignatureError.missingSignature();
      expect(error).toBeInstanceOf(SignatureError);
    });
  });

  describe('missingTimestamp', () => {
    it('creates error with correct message', () => {
      const error = SignatureError.missingTimestamp();
      expect(error.message).toBe('Notification is missing timestamp header');
    });

    it('sets reason to missing_timestamp', () => {
      const error = SignatureError.missingTimestamp();
      expect(error.reason).toBe('missing_timestamp');
    });
  });

  describe('expiredTimestamp', () => {
    it('creates error with timestamp in message', () => {
      const error = SignatureError.expiredTimestamp('2024-01-15T10:00:00Z');
      expect(error.message).toContain('2024-01-15T10:00:00Z');
    });

    it('sets reason to expired_timestamp', () => {
      const error = SignatureError.expiredTimestamp('2024-01-15T10:00:00Z');
      expect(error.reason).toBe('expired_timestamp');
    });

    it('includes expiration prefix in message', () => {
      const error = SignatureError.expiredTimestamp('2024-01-15T10:00:00Z');
      expect(error.message).toBe(
        'Notification timestamp has expired: 2024-01-15T10:00:00Z'
      );
    });
  });

  describe('invalidSignature', () => {
    it('creates error with correct message', () => {
      const error = SignatureError.invalidSignature();
      expect(error.message).toBe('Notification signature verification failed');
    });

    it('sets reason to invalid_signature', () => {
      const error = SignatureError.invalidSignature();
      expect(error.reason).toBe('invalid_signature');
    });

    it('stores expected value', () => {
      const error = SignatureError.invalidSignature('expected123', 'actual456');
      expect(error.expected).toBe('expected123');
    });

    it('stores actual value', () => {
      const error = SignatureError.invalidSignature('expected123', 'actual456');
      expect(error.actual).toBe('actual456');
    });

    it('handles undefined values', () => {
      const error = SignatureError.invalidSignature();
      expect(error.expected).toBeUndefined();
      expect(error.actual).toBeUndefined();
    });
  });

  describe('invalidPayload', () => {
    it('creates error with default message when no details', () => {
      const error = SignatureError.invalidPayload();
      expect(error.message).toBe('Invalid notification payload');
    });

    it('includes details in message when provided', () => {
      const error = SignatureError.invalidPayload('Missing required field');
      expect(error.message).toBe(
        'Invalid notification payload: Missing required field'
      );
    });

    it('sets reason to invalid_payload', () => {
      const error = SignatureError.invalidPayload();
      expect(error.reason).toBe('invalid_payload');
    });
  });

  describe('reason types', () => {
    it('accepts all valid reason types', () => {
      const reasons = [
        'missing_signature',
        'missing_timestamp',
        'expired_timestamp',
        'invalid_signature',
        'invalid_payload',
      ] as const;

      for (const reason of reasons) {
        const error = new SignatureError('Test', reason);
        expect(error.reason).toBe(reason);
      }
    });
  });
});
