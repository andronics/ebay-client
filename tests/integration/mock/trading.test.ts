import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { TradingClient } from '../../../src/clients/trading.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { TradingClientConfig } from '../../../src/types/config.js';
import { server } from './setup.js';
import {
  capturedRequests,
  clearCapturedRequests,
  error500Handler,
} from './handlers/trading.js';

/**
 * Test configuration for Trading API integration tests.
 */
const testConfig: TradingClientConfig = {
  sandbox: true,
  siteId: 3, // UK
  auth: {
    type: 'auth-n-auth',
    appId: 'test-app-id',
    devId: 'test-dev-id',
    certId: 'test-cert-id',
    authToken: 'test-auth-token',
  },
};

describe('Trading API Integration (MSW)', () => {
  let client: TradingClient;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    client = new TradingClient(testConfig);
  });

  afterEach(() => {
    server.resetHandlers();
    clearCapturedRequests();
  });

  afterAll(() => {
    server.close();
  });

  describe('Full AddItem Flow', () => {
    it('creates a listing and returns item ID', async () => {
      const result = await client.addItem({
        Item: {
          Title: 'Test Integration Item',
          Description: '<![CDATA[<p>Test description</p>]]>',
          PrimaryCategory: { CategoryID: '11450' },
          StartPrice: 9.99,
          Quantity: 10,
          ListingDuration: 'GTC',
          ListingType: 'FixedPriceItem',
          Country: 'GB',
          Currency: 'GBP',
          ConditionID: 1000,
        },
      });

      expect(result.Ack).toBe('Success');
      expect(result.ItemID).toBe('110123456789');
      expect(result.Fees).toBeDefined();
    });

    it('sends correct XML request structure', async () => {
      await client.addItem({
        Item: {
          Title: 'Test Item',
          PrimaryCategory: { CategoryID: '11450' },
          StartPrice: 9.99,
          Quantity: 1,
        },
      });

      expect(capturedRequests).toHaveLength(1);
      const request = capturedRequests[0];
      expect(request.callName).toBe('AddItem');
      expect(request.body).toContain('<AddItemRequest');
      expect(request.body).toContain('<Title>Test Item</Title>');
      expect(request.body).toContain('<CategoryID>11450</CategoryID>');
    });

    it('includes all required auth headers', async () => {
      await client.addItem({
        Item: { Title: 'Test', PrimaryCategory: { CategoryID: '11450' } },
      });

      const headers = capturedRequests[0].headers;
      expect(headers['x-ebay-api-call-name']).toBe('AddItem');
      expect(headers['x-ebay-api-siteid']).toBe('3');
      expect(headers['x-ebay-api-compatibility-level']).toBe('1225');
      expect(headers['x-ebay-api-app-name']).toBe('test-app-id');
      expect(headers['x-ebay-api-dev-name']).toBe('test-dev-id');
      expect(headers['x-ebay-api-cert-name']).toBe('test-cert-id');
      expect(headers['content-type']).toBe('text/xml; charset=utf-8');
    });
  });

  describe('Full GetItem Flow', () => {
    it('retrieves item details by ID', async () => {
      const result = await client.getItem({
        ItemID: '110123456789',
      });

      expect(result.Ack).toBe('Success');
      expect(result.Item).toBeDefined();
      // Item is parsed as array due to isArray config in xml.ts
      const item = Array.isArray(result.Item) ? result.Item[0] : result.Item;
      expect(item?.ItemID).toBe('110123456789');
      expect(item?.Title).toBe('Test Integration Item');
    });

    it('includes item category and pricing', async () => {
      const result = await client.getItem({ ItemID: '110123456789' });

      // Item is parsed as array due to isArray config in xml.ts
      const item = Array.isArray(result.Item) ? result.Item[0] : result.Item;
      expect(item?.PrimaryCategory?.CategoryID).toBe('11450');
      expect(item?.StartPrice).toBeDefined();
      expect(item?.Quantity).toBe('10');
    });

    it('throws ApiError for invalid item ID', async () => {
      await expect(
        client.getItem({ ItemID: '999999999999' })
      ).rejects.toThrow(ApiError);
    });

    it('includes error details in ApiError', async () => {
      try {
        await client.getItem({ ItemID: '999999999999' });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        const apiError = error as ApiError;
        expect(apiError.hasErrorCode('17')).toBe(true);
        expect(apiError.operation).toBe('GetItem');
      }
    });
  });

  describe('Full ReviseItem Flow', () => {
    it('updates item successfully', async () => {
      const result = await client.reviseItem({
        Item: {
          ItemID: '110123456789',
          Quantity: 5,
        },
      });

      expect(result.Ack).toBe('Success');
      expect(result.ItemID).toBe('110123456789');
    });

    it('sends only specified fields for update', async () => {
      await client.reviseItem({
        Item: {
          ItemID: '110123456789',
          Title: 'Updated Title',
        },
      });

      const body = capturedRequests[0].body;
      expect(body).toContain('<ItemID>110123456789</ItemID>');
      expect(body).toContain('<Title>Updated Title</Title>');
    });
  });

  describe('Full EndItem Flow', () => {
    it('ends listing successfully', async () => {
      const result = await client.endItem({
        ItemID: '110123456789',
        EndingReason: 'NotAvailable',
      });

      expect(result.Ack).toBe('Success');
      expect(result.EndTime).toBeDefined();
    });

    it('includes end reason in request', async () => {
      await client.endItem({
        ItemID: '110123456789',
        EndingReason: 'LostOrBroken',
      });

      const body = capturedRequests[0].body;
      expect(body).toContain('<EndingReason>LostOrBroken</EndingReason>');
    });
  });

  describe('VerifyAddItem Flow', () => {
    it('validates item without creating', async () => {
      const result = await client.verifyAddItem({
        Item: {
          Title: 'Test Verify Item',
          PrimaryCategory: { CategoryID: '11450' },
          StartPrice: 9.99,
          Quantity: 1,
        },
      });

      expect(result.Ack).toBe('Success');
      expect(result.ItemID).toBe('0'); // Verify returns 0 as placeholder
      expect(result.Fees).toBeDefined();
    });
  });

  describe('GetTokenStatus Flow', () => {
    it('returns token status', async () => {
      const result = await client.getTokenStatus();

      expect(result.Ack).toBe('Success');
      expect(result.TokenStatus).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('throws ApiError on Failure response', async () => {
      await expect(
        client.getItem({ ItemID: '999999999999' })
      ).rejects.toThrow(ApiError);
    });

    it('captures error codes from response', async () => {
      try {
        await client.getItem({ ItemID: '999999999999' });
      } catch (error) {
        const apiError = error as ApiError;
        const codes = apiError.getErrorCodes();
        expect(codes).toContain('17');
      }
    });
  });

  describe('Client Configuration', () => {
    it('uses sandbox endpoint', () => {
      expect(client.getEndpoint()).toBe('https://api.sandbox.ebay.com/ws/api.dll');
    });

    it('reports sandbox mode', () => {
      expect(client.isSandbox()).toBe(true);
    });

    it('uses production endpoint when sandbox=false', () => {
      const prodClient = new TradingClient({
        ...testConfig,
        sandbox: false,
      });
      expect(prodClient.getEndpoint()).toBe('https://api.ebay.com/ws/api.dll');
    });
  });

  describe('Complete Listing Lifecycle', () => {
    it('AddItem → GetItem → ReviseItem → EndItem', async () => {
      // Create
      const addResult = await client.addItem({
        Item: {
          Title: 'Lifecycle Test Item',
          PrimaryCategory: { CategoryID: '11450' },
          StartPrice: 9.99,
          Quantity: 10,
        },
      });
      expect(addResult.Ack).toBe('Success');
      const itemId = addResult.ItemID;

      // Read
      const getResult = await client.getItem({ ItemID: itemId! });
      expect(getResult.Ack).toBe('Success');

      // Update
      const reviseResult = await client.reviseItem({
        Item: { ItemID: itemId, Quantity: 5 },
      });
      expect(reviseResult.Ack).toBe('Success');

      // Delete
      const endResult = await client.endItem({
        ItemID: itemId!,
        EndingReason: 'NotAvailable',
      });
      expect(endResult.Ack).toBe('Success');

      // Verify all operations were called
      expect(capturedRequests.map((r) => r.callName)).toEqual([
        'AddItem',
        'GetItem',
        'ReviseItem',
        'EndItem',
      ]);
    });
  });
});
