import { describe, it, expect } from 'vitest';
import {
  parseNotification,
  parseFullNotification,
} from '../../../src/notifications/parser.js';
import {
  validateNotification,
  validateNotificationStrict,
} from '../../../src/notifications/validator.js';
import {
  isChallengeRequest,
  getChallengeValue,
  buildChallengeResponse,
  buildAckResponse,
} from '../../../src/notifications/response.js';
import {
  verifySignature,
  validateNotificationStructure,
} from '../../../src/notifications/signature.js';
import { ValidationError } from '../../../src/errors/validation-error.js';

/**
 * Sample SOAP-wrapped ItemSold notification.
 */
const ITEM_SOLD_SOAP = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <GetItemTransactionsResponse xmlns="urn:ebay:apis:eBLBaseComponents">
      <NotificationEventName>ItemSold</NotificationEventName>
      <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
      <RecipientUserID>seller123</RecipientUserID>
      <CorrelationID>notification-123</CorrelationID>
      <NotificationSignature>test-signature==</NotificationSignature>
      <Item>
        <ItemID>110123456789</ItemID>
        <Title>Vintage Book Collection</Title>
        <SellingStatus>
          <CurrentPrice currencyID="GBP">29.99</CurrentPrice>
        </SellingStatus>
        <Quantity>1</Quantity>
        <ListingType>FixedPriceItem</ListingType>
      </Item>
      <TransactionArray>
        <Transaction>
          <TransactionID>987654321</TransactionID>
          <TransactionPrice currencyID="GBP">29.99</TransactionPrice>
          <QuantityPurchased>1</QuantityPurchased>
          <CreatedDate>2024-01-15T10:30:00.000Z</CreatedDate>
          <Buyer>
            <UserID>buyer456</UserID>
            <Email>buyer@example.com</Email>
          </Buyer>
        </Transaction>
      </TransactionArray>
    </GetItemTransactionsResponse>
  </soapenv:Body>
</soapenv:Envelope>`;

/**
 * Sample direct (non-SOAP) ItemEnded notification.
 */
const ITEM_ENDED_DIRECT = `<?xml version="1.0" encoding="UTF-8"?>
<ItemEndedNotification xmlns="urn:ebay:apis:eBLBaseComponents">
  <NotificationEventName>ItemEnded</NotificationEventName>
  <Timestamp>2024-01-15T12:00:00.000Z</Timestamp>
  <RecipientUserID>seller123</RecipientUserID>
  <Item>
    <ItemID>110123456789</ItemID>
    <Title>Ended Item</Title>
    <EndReason>NotSold</EndReason>
  </Item>
</ItemEndedNotification>`;

describe('Notifications Integration (End-to-End)', () => {
  describe('SOAP Notification Parsing Flow', () => {
    it('parses SOAP-wrapped notification end-to-end', () => {
      const notification = parseFullNotification(ITEM_SOLD_SOAP);

      expect(notification.eventType).toBe('ItemSold');
      expect(notification.timestamp).toBe('2024-01-15T10:30:00.000Z');
      expect(notification.recipientUserId).toBe('seller123');
      expect(notification.notificationId).toBe('notification-123');
      expect(notification.signature).toBe('test-signature==');
    });

    it('extracts item from SOAP notification', () => {
      const notification = parseFullNotification(ITEM_SOLD_SOAP);

      expect(notification.item).toBeDefined();
      expect(notification.item?.itemId).toBe('110123456789');
      expect(notification.item?.title).toBe('Vintage Book Collection');
    });

    it('extracts transaction from SOAP notification', () => {
      const notification = parseFullNotification(ITEM_SOLD_SOAP);

      expect(notification.transaction).toBeDefined();
      expect(notification.transaction?.transactionId).toBe('987654321');
      expect(notification.transaction?.transactionPrice?.value).toBe('29.99');
      expect(notification.transaction?.quantityPurchased).toBe(1);
    });

    it('extracts buyer from SOAP notification', () => {
      const notification = parseFullNotification(ITEM_SOLD_SOAP);

      expect(notification.buyer).toBeDefined();
      expect(notification.buyer?.userId).toBe('buyer456');
      expect(notification.buyer?.email).toBe('buyer@example.com');
    });
  });

  describe('Direct Notification Parsing Flow', () => {
    it('parses direct notification format', () => {
      const notification = parseFullNotification(ITEM_ENDED_DIRECT);

      expect(notification.eventType).toBe('ItemEnded');
      expect(notification.timestamp).toBe('2024-01-15T12:00:00.000Z');
      expect(notification.recipientUserId).toBe('seller123');
    });

    it('extracts item from direct notification', () => {
      const notification = parseFullNotification(ITEM_ENDED_DIRECT);

      expect(notification.item).toBeDefined();
      expect(notification.item?.itemId).toBe('110123456789');
      expect(notification.item?.title).toBe('Ended Item');
    });
  });

  describe('Validation Flow', () => {
    it('validates complete ItemSold notification', () => {
      const notification = parseFullNotification(ITEM_SOLD_SOAP);

      // Manually construct a complete notification for validation
      const validNotification = {
        eventType: 'ItemSold' as const,
        timestamp: notification.timestamp,
        recipientUserId: notification.recipientUserId,
        raw: notification.raw,
        item: notification.item,
        buyer: notification.buyer,
        transaction: notification.transaction,
      };

      const result = validateNotification(validNotification);
      expect(result.success).toBe(true);
    });

    it('validates ItemEnded notification (requires only item)', () => {
      const notification = parseFullNotification(ITEM_ENDED_DIRECT);

      const validNotification = {
        eventType: 'ItemEnded' as const,
        timestamp: notification.timestamp,
        recipientUserId: notification.recipientUserId,
        raw: notification.raw,
        item: notification.item,
      };

      const result = validateNotification(validNotification);
      expect(result.success).toBe(true);
    });

    it('fails validation for incomplete ItemSold', () => {
      const incompleteNotification = {
        eventType: 'ItemSold' as const,
        timestamp: '2024-01-15T10:30:00.000Z',
        recipientUserId: 'seller',
        raw: {},
        // Missing item, buyer, transaction
      };

      const result = validateNotification(incompleteNotification);
      expect(result.success).toBe(false);
    });

    it('strict validation throws on invalid', () => {
      const invalid = {
        eventType: 'InvalidEventType' as never,
        timestamp: '2024-01-15T10:30:00.000Z',
        recipientUserId: 'seller',
        raw: {},
      };

      expect(() => validateNotificationStrict(invalid)).toThrow(ValidationError);
    });
  });

  describe('Challenge Response Flow', () => {
    it('detects challenge request', () => {
      expect(isChallengeRequest('GET', { challenge: 'abc123xyz' })).toBe(true);
    });

    it('does not detect normal request as challenge', () => {
      expect(isChallengeRequest('GET', {})).toBe(false);
      expect(isChallengeRequest('GET', { other: 'param' })).toBe(false);
      expect(isChallengeRequest('POST', { challenge: 'abc123' })).toBe(false);
    });

    it('extracts challenge value from query', () => {
      expect(getChallengeValue({ challenge: 'abc123xyz' })).toBe('abc123xyz');
      expect(getChallengeValue({})).toBeUndefined();
    });

    it('builds correct challenge response', () => {
      const response = buildChallengeResponse('abc123xyz');

      expect(response).toBe('abc123xyz');
    });

    it('builds acknowledgment response', () => {
      const response = buildAckResponse();

      expect(response).toBe('OK');
    });
  });

  describe('Signature Verification Flow', () => {
    it('validates notification structure', () => {
      expect(validateNotificationStructure(ITEM_SOLD_SOAP)).toBe(true);
      expect(validateNotificationStructure(ITEM_ENDED_DIRECT)).toBe(true);
    });

    it('rejects malformed structure', () => {
      const malformed = '<Invalid><NoEventName/></Invalid>';
      expect(validateNotificationStructure(malformed)).toBe(false);
    });

    it('verifies signature with valid config', async () => {
      const result = await verifySignature(
        ITEM_SOLD_SOAP,
        { 'x-ebay-timestamp': '2024-01-15T10:30:00.000Z' },
        { certId: 'test-cert', skipTimestampCheck: true }
      );

      expect(result).toBe(true);
    });
  });

  describe('Full Pipeline: XML → Parse → Validate → Extract', () => {
    it('processes ItemSold through full pipeline', () => {
      // Step 1: Structure validation
      expect(validateNotificationStructure(ITEM_SOLD_SOAP)).toBe(true);

      // Step 2: Parse
      const parsed = parseFullNotification(ITEM_SOLD_SOAP);
      expect(parsed.eventType).toBe('ItemSold');

      // Step 3: Validate
      const validNotification = {
        eventType: parsed.eventType,
        timestamp: parsed.timestamp,
        recipientUserId: parsed.recipientUserId,
        raw: parsed.raw,
        item: parsed.item,
        buyer: parsed.buyer,
        transaction: parsed.transaction,
      };
      const validationResult = validateNotification(validNotification);
      expect(validationResult.success).toBe(true);

      // Step 4: Extract and use data
      expect(parsed.item?.itemId).toBeDefined();
      expect(parsed.buyer?.userId).toBeDefined();
      expect(parsed.transaction?.transactionId).toBeDefined();
    });

    it('processes ItemEnded through full pipeline', () => {
      // Step 1: Structure validation
      expect(validateNotificationStructure(ITEM_ENDED_DIRECT)).toBe(true);

      // Step 2: Parse
      const parsed = parseFullNotification(ITEM_ENDED_DIRECT);
      expect(parsed.eventType).toBe('ItemEnded');

      // Step 3: Validate
      const validNotification = {
        eventType: parsed.eventType,
        timestamp: parsed.timestamp,
        recipientUserId: parsed.recipientUserId,
        raw: parsed.raw,
        item: parsed.item,
      };
      const validationResult = validateNotification(validNotification);
      expect(validationResult.success).toBe(true);

      // Step 4: Extract and use data
      expect(parsed.item?.itemId).toBe('110123456789');
    });
  });
});
