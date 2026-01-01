import { describe, it, expect, beforeAll } from 'vitest';
import { TradingClient } from '../../../src/trading/client.js';
import { describeIfSandbox, sandboxConfig, logSandboxStatus } from './setup.js';

// Log sandbox status at module load
logSandboxStatus();

/**
 * These tests run against the real eBay Sandbox API.
 *
 * They are skipped if sandbox credentials are not available.
 * To run these tests, set the following environment variables:
 * - EBAY_SANDBOX_APP_ID
 * - EBAY_SANDBOX_DEV_ID
 * - EBAY_SANDBOX_CERT_ID
 * - EBAY_SANDBOX_AUTH_TOKEN
 *
 * Run with: npm run test:integration:sandbox
 */
describeIfSandbox('Trading API Sandbox (Real API)', () => {
  let client: TradingClient;
  let createdItemId: string | undefined;

  beforeAll(() => {
    client = new TradingClient(sandboxConfig);
  });

  describe('Health Check', () => {
    it('GetTokenStatus returns valid response', async () => {
      const result = await client.getTokenStatus();

      expect(result.Ack).toBe('Success');
      expect(result.TokenStatus).toBeDefined();
    });
  });

  describe('Full Listing Lifecycle', () => {
    it('VerifyAddItem validates item without creating', async () => {
      const result = await client.verifyAddItem({
        Item: {
          Title: 'Integration Test Item - DO NOT BID',
          Description: '<![CDATA[<p>This is an integration test item. Do not bid.</p>]]>',
          PrimaryCategory: { CategoryID: '11450' }, // Coins
          StartPrice: 9.99,
          Quantity: 1,
          ListingDuration: 'Days_7',
          ListingType: 'FixedPriceItem',
          Country: 'GB',
          Currency: 'GBP',
          ConditionID: 1000, // New
          PaymentMethods: 'PayPal',
          PayPalEmailAddress: 'test@example.com',
          DispatchTimeMax: 3,
          ShippingDetails: {
            ShippingType: 'Flat',
            ShippingServiceOptions: {
              ShippingService: 'UK_RoyalMailSecondClassStandard',
              ShippingServiceCost: 2.99,
            },
          },
          ReturnPolicy: {
            ReturnsAcceptedOption: 'ReturnsAccepted',
            RefundOption: 'MoneyBack',
            ReturnsWithinOption: 'Days_30',
            ShippingCostPaidByOption: 'Buyer',
          },
        },
      });

      expect(result.Ack).toMatch(/Success|Warning/);
      expect(result.Fees).toBeDefined();
    });

    it('AddItem creates a listing', async () => {
      const result = await client.addItem({
        Item: {
          Title: 'Integration Test Item - DO NOT BID - ' + Date.now(),
          Description: '<![CDATA[<p>This is an integration test item. Do not bid.</p>]]>',
          PrimaryCategory: { CategoryID: '11450' }, // Coins
          StartPrice: 9.99,
          Quantity: 1,
          ListingDuration: 'Days_7',
          ListingType: 'FixedPriceItem',
          Country: 'GB',
          Currency: 'GBP',
          ConditionID: 1000, // New
          PaymentMethods: 'PayPal',
          PayPalEmailAddress: 'test@example.com',
          DispatchTimeMax: 3,
          ShippingDetails: {
            ShippingType: 'Flat',
            ShippingServiceOptions: {
              ShippingService: 'UK_RoyalMailSecondClassStandard',
              ShippingServiceCost: 2.99,
            },
          },
          ReturnPolicy: {
            ReturnsAcceptedOption: 'ReturnsAccepted',
            RefundOption: 'MoneyBack',
            ReturnsWithinOption: 'Days_30',
            ShippingCostPaidByOption: 'Buyer',
          },
        },
      });

      expect(result.Ack).toMatch(/Success|Warning/);
      expect(result.ItemID).toBeDefined();
      createdItemId = result.ItemID;
    });

    it('GetItem retrieves the created listing', async () => {
      expect(createdItemId).toBeDefined();

      const result = await client.getItem({
        ItemID: createdItemId!,
        IncludeItemSpecifics: true,
      });

      expect(result.Ack).toBe('Success');
      expect(result.Item).toBeDefined();

      // Item may be array due to isArray config
      const item = Array.isArray(result.Item) ? result.Item[0] : result.Item;
      expect(item?.ItemID).toBe(createdItemId);
    });

    it('ReviseItem updates the listing', async () => {
      expect(createdItemId).toBeDefined();

      const result = await client.reviseItem({
        Item: {
          ItemID: createdItemId,
          Quantity: 5,
        },
      });

      expect(result.Ack).toMatch(/Success|Warning/);
      expect(result.ItemID).toBe(createdItemId);
    });

    it('EndItem ends the listing', async () => {
      expect(createdItemId).toBeDefined();

      const result = await client.endItem({
        ItemID: createdItemId!,
        EndingReason: 'NotAvailable',
      });

      expect(result.Ack).toBe('Success');
      expect(result.EndTime).toBeDefined();
    });
  });

  describe('Notification Preferences', () => {
    it('GetNotificationPreferences returns current settings', async () => {
      const result = await client.getNotificationPreferences('User');

      expect(result.Ack).toBe('Success');
    });

    it('GetFullNotificationPreferences returns both levels', async () => {
      const result = await client.getFullNotificationPreferences();

      expect(result.user.Ack).toBe('Success');
      expect(result.application.Ack).toBe('Success');
    });
  });
});

/**
 * Placeholder test that always runs (for CI verification).
 */
describe('Sandbox Test Suite', () => {
  it('is configured correctly', () => {
    expect(sandboxConfig.sandbox).toBe(true);
    expect(sandboxConfig.siteId).toBe(3);
  });
});
