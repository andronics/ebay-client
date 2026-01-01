import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  verifySignature,
  extractSignatureFromXml,
  validateNotificationStructure,
} from '../../src/notifications/signature.js';
import { SignatureError } from '../../src/errors/signature-error.js';
import * as fixtures from '../fixtures/notifications.js';

describe('notifications/signature', () => {
  describe('verifySignature', () => {
    const validConfig = {
      certId: 'test-cert-id',
    };

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15T10:30:00.000Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns true for notification with signature in XML', async () => {
      const result = await verifySignature(
        fixtures.ITEM_SOLD_SOAP,
        {},
        validConfig
      );

      expect(result).toBe(true);
    });

    it('returns true when no signature required', async () => {
      const result = await verifySignature(
        fixtures.NOTIFICATION_NO_ITEM,
        {},
        validConfig
      );

      expect(result).toBe(true);
    });

    it('throws SignatureError for expired timestamp', async () => {
      // Set time to 20 minutes later (beyond default 10 min max age)
      vi.setSystemTime(new Date('2024-01-15T10:55:00.000Z'));

      await expect(
        verifySignature(
          fixtures.ITEM_SOLD_SOAP,
          { 'x-ebay-timestamp': '2024-01-15T10:30:00.000Z' },
          validConfig
        )
      ).rejects.toThrow(SignatureError);
    });

    it('throws with expired_timestamp reason', async () => {
      vi.setSystemTime(new Date('2024-01-15T10:55:00.000Z'));

      let caughtError: SignatureError | undefined;
      try {
        await verifySignature(
          fixtures.ITEM_SOLD_SOAP,
          { 'x-ebay-timestamp': '2024-01-15T10:30:00.000Z' },
          validConfig
        );
      } catch (e) {
        caughtError = e as SignatureError;
      }

      expect(caughtError?.reason).toBe('expired_timestamp');
    });

    it('respects custom maxAgeMs', async () => {
      vi.setSystemTime(new Date('2024-01-15T10:35:00.000Z'));

      // 5 minutes later, default 10 min would pass
      const result = await verifySignature(
        fixtures.ITEM_SOLD_SOAP,
        { 'x-ebay-timestamp': '2024-01-15T10:30:00.000Z' },
        validConfig
      );

      expect(result).toBe(true);

      // But with 3 minute max, it should fail
      await expect(
        verifySignature(
          fixtures.ITEM_SOLD_SOAP,
          { 'x-ebay-timestamp': '2024-01-15T10:30:00.000Z' },
          { ...validConfig, maxAgeMs: 180000 } // 3 minutes
        )
      ).rejects.toThrow(SignatureError);
    });

    it('skips timestamp check when configured', async () => {
      vi.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));

      const result = await verifySignature(
        fixtures.ITEM_SOLD_SOAP,
        { 'x-ebay-timestamp': '2024-01-15T10:30:00.000Z' },
        { ...validConfig, skipTimestampCheck: true }
      );

      expect(result).toBe(true);
    });

    it('normalizes header keys to lowercase', async () => {
      const result = await verifySignature(
        fixtures.ITEM_SOLD_SOAP,
        { 'X-EBAY-TIMESTAMP': '2024-01-15T10:30:00.000Z' },
        validConfig
      );

      expect(result).toBe(true);
    });

    it('handles Headers object', async () => {
      const headers = new Headers();
      headers.set('x-ebay-timestamp', '2024-01-15T10:30:00.000Z');

      const result = await verifySignature(
        fixtures.ITEM_SOLD_SOAP,
        headers,
        validConfig
      );

      expect(result).toBe(true);
    });

    it('handles Headers object with signature', async () => {
      const headers = new Headers();
      headers.set('x-ebay-signature', 'test-signature');

      const result = await verifySignature(
        fixtures.ITEM_SOLD_SOAP,
        headers,
        validConfig
      );

      expect(result).toBe(true);
    });
  });

  describe('extractSignatureFromXml', () => {
    it('extracts signature from SOAP notification', () => {
      const signature = extractSignatureFromXml(fixtures.ITEM_SOLD_SOAP);

      expect(signature).toBe('abc123signature==');
    });

    it('returns undefined when no signature present', () => {
      const signature = extractSignatureFromXml(fixtures.ITEM_ENDED);

      expect(signature).toBeUndefined();
    });

    it('returns undefined for malformed XML', () => {
      const signature = extractSignatureFromXml('<NotificationSignature>');

      expect(signature).toBeUndefined();
    });

    it('returns undefined for empty signature element', () => {
      // The regex requires at least one char between tags: ([^<]+)
      const xml = '<Root><NotificationSignature></NotificationSignature></Root>';
      const signature = extractSignatureFromXml(xml);

      expect(signature).toBeUndefined();
    });
  });

  describe('validateNotificationStructure', () => {
    it('returns true for valid notification structure', () => {
      const result = validateNotificationStructure(fixtures.VALID_STRUCTURE_XML);

      expect(result).toBe(true);
    });

    it('returns false when NotificationEventName is missing', () => {
      const xml = `<Root>
        <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
        <RecipientUserID>user123</RecipientUserID>
      </Root>`;

      expect(validateNotificationStructure(xml)).toBe(false);
    });

    it('returns false when RecipientUserID is missing', () => {
      const xml = `<Root>
        <NotificationEventName>Test</NotificationEventName>
        <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
      </Root>`;

      expect(validateNotificationStructure(xml)).toBe(false);
    });

    it('returns false when Timestamp is missing', () => {
      const xml = `<Root>
        <NotificationEventName>Test</NotificationEventName>
        <RecipientUserID>user123</RecipientUserID>
      </Root>`;

      expect(validateNotificationStructure(xml)).toBe(false);
    });

    it('returns false for malformed notification', () => {
      expect(validateNotificationStructure(fixtures.MALFORMED_NOTIFICATION)).toBe(false);
    });

    it('returns true for SOAP-wrapped notification', () => {
      expect(validateNotificationStructure(fixtures.ITEM_SOLD_SOAP)).toBe(true);
    });

    it('returns true for direct notification', () => {
      expect(validateNotificationStructure(fixtures.ITEM_SOLD_DIRECT)).toBe(true);
    });
  });
});
