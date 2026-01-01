import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InventoryClient } from '../../../src/inventory/client.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { InventoryClientConfig } from '../../../src/types/config.js';
import * as http from '../../../src/utils/http.js';
import * as fixtures from '../fixtures/inventory-responses.js';

// Mock the http module
vi.mock('../../../src/utils/http.js', async () => {
  const actual = await vi.importActual<typeof http>('../../../src/utils/http.js');
  return {
    ...actual,
    httpRequest: vi.fn(),
  };
});

const mockHttpRequest = vi.mocked(http.httpRequest);

// Valid auth config for testing
const validAuthConfig: InventoryClientConfig['auth'] = {
  type: 'oauth',
  accessToken: 'test-access-token',
};

const createConfig = (overrides?: Partial<InventoryClientConfig>): InventoryClientConfig => ({
  sandbox: true,
  auth: validAuthConfig,
  ...overrides,
});

describe('InventoryClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('creates client with valid config', () => {
      const client = new InventoryClient(createConfig());
      expect(client).toBeInstanceOf(InventoryClient);
    });

    it('validates OAuth config - missing access token', () => {
      expect(() => {
        new InventoryClient(createConfig({
          auth: { type: 'oauth', accessToken: '' },
        }));
      }).toThrow('OAuth config missing accessToken');
    });

    it('uses sandbox endpoint when sandbox is true', () => {
      const client = new InventoryClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toContain('sandbox');
    });

    it('uses production endpoint when sandbox is false', () => {
      const client = new InventoryClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).not.toContain('sandbox');
    });
  });

  describe('getBaseUrl', () => {
    it('returns sandbox endpoint', () => {
      const client = new InventoryClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/sell/inventory/v1');
    });

    it('returns production endpoint', () => {
      const client = new InventoryClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).toBe('https://api.ebay.com/sell/inventory/v1');
    });
  });

  describe('isSandbox', () => {
    it('returns true for sandbox config', () => {
      const client = new InventoryClient(createConfig({ sandbox: true }));
      expect(client.isSandbox()).toBe(true);
    });

    it('returns false for production config', () => {
      const client = new InventoryClient(createConfig({ sandbox: false }));
      expect(client.isSandbox()).toBe(false);
    });
  });

  // =========================================================================
  // Inventory Item Operations
  // =========================================================================

  describe('getInventoryItem', () => {
    it('returns inventory item on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEM_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEM_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.getInventoryItem('TEST-SKU-001');

      expect(result.sku).toBe('TEST-SKU-001');
      expect(result.product?.title).toBe('Test Product');
      expect(result.condition).toBe('NEW');
    });

    it('encodes SKU in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEM_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEM_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getInventoryItem('SKU/WITH/SLASHES');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/inventory_item/SKU%2FWITH%2FSLASHES'),
        expect.any(Object)
      );
    });

    it('throws ApiError when item not found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.API_ERROR_NOT_FOUND,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_FOUND),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await expect(client.getInventoryItem('INVALID-SKU')).rejects.toThrow(ApiError);
    });
  });

  describe('getInventoryItems', () => {
    it('returns inventory items list', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.getInventoryItems();

      expect(result.inventoryItems).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('returns empty list when no items', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_EMPTY,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_EMPTY),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.getInventoryItems();

      expect(result.inventoryItems).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it('includes limit parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getInventoryItems({ limit: 50 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=50'),
        expect.any(Object)
      );
    });

    it('clamps limit to maximum 100', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getInventoryItems({ limit: 500 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=100'),
        expect.any(Object)
      );
    });

    it('clamps limit to minimum 1', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getInventoryItems({ limit: -5 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=1'),
        expect.any(Object)
      );
    });

    it('includes offset parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getInventoryItems({ offset: 25 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('offset=25'),
        expect.any(Object)
      );
    });
  });

  describe('createOrReplaceInventoryItem', () => {
    it('creates item with PUT request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        data: undefined,
        raw: '',
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.createOrReplaceInventoryItem('NEW-SKU', {
        product: { title: 'New Product' },
        condition: 'NEW',
        availability: { shipToLocationAvailability: { quantity: 10 } },
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/inventory_item/NEW-SKU'),
        expect.objectContaining({
          method: 'PUT',
          body: expect.objectContaining({
            product: { title: 'New Product' },
            condition: 'NEW',
          }),
        })
      );
    });

    it('encodes SKU with special characters', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        data: undefined,
        raw: '',
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.createOrReplaceInventoryItem('SKU#123', {
        product: { title: 'Test' },
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/inventory_item/SKU%23123'),
        expect.any(Object)
      );
    });
  });

  describe('deleteInventoryItem', () => {
    it('deletes item with DELETE request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        data: undefined,
        raw: '',
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.deleteInventoryItem('TEST-SKU');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/inventory_item/TEST-SKU'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  // =========================================================================
  // Offer Operations
  // =========================================================================

  describe('createOffer', () => {
    it('returns offer ID on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_OFFER_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_OFFER_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.createOffer({
        sku: 'TEST-SKU-001',
        marketplaceId: 'EBAY_GB',
        pricingSummary: { price: { value: '29.99', currency: 'GBP' } },
      });

      expect(result.offerId).toBe('OFF-12345678');
    });

    it('uses POST method to /offer', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_OFFER_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_OFFER_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.createOffer({
        sku: 'TEST-SKU-001',
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringMatching(/\/offer$/),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('getOffer', () => {
    it('returns offer details', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFER_SUCCESS,
        raw: JSON.stringify(fixtures.GET_OFFER_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.getOffer('OFF-12345678');

      expect(result.offerId).toBe('OFF-12345678');
      expect(result.sku).toBe('TEST-SKU-001');
      expect(result.status).toBe('UNPUBLISHED');
    });

    it('encodes offer ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFER_SUCCESS,
        raw: JSON.stringify(fixtures.GET_OFFER_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getOffer('OFF/123');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/offer/OFF%2F123'),
        expect.any(Object)
      );
    });
  });

  describe('updateOffer', () => {
    it('updates offer with PUT request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        data: undefined,
        raw: '',
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.updateOffer('OFF-12345678', {
        pricingSummary: { price: { value: '39.99', currency: 'GBP' } },
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/offer/OFF-12345678'),
        expect.objectContaining({
          method: 'PUT',
          body: expect.objectContaining({
            pricingSummary: { price: { value: '39.99', currency: 'GBP' } },
          }),
        })
      );
    });
  });

  describe('publishOffer', () => {
    it('returns listing ID on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.PUBLISH_OFFER_SUCCESS,
        raw: JSON.stringify(fixtures.PUBLISH_OFFER_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.publishOffer('OFF-12345678');

      expect(result.listingId).toBe('123456789012');
    });

    it('uses POST to /offer/{id}/publish', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.PUBLISH_OFFER_SUCCESS,
        raw: JSON.stringify(fixtures.PUBLISH_OFFER_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.publishOffer('OFF-12345678');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/offer/OFF-12345678/publish'),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('getOffers', () => {
    it('returns offers list', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_OFFERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.getOffers();

      expect(result.offers).toHaveLength(2);
    });

    it('returns empty list when no offers', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFERS_EMPTY,
        raw: JSON.stringify(fixtures.GET_OFFERS_EMPTY),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      const result = await client.getOffers();

      expect(result.offers).toHaveLength(0);
    });

    it('includes SKU filter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_OFFERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getOffers({ sku: 'TEST-SKU-001' });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('sku=TEST-SKU-001'),
        expect.any(Object)
      );
    });

    it('includes marketplace_id filter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_OFFERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getOffers({ marketplaceId: 'EBAY_GB' });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('marketplace_id=EBAY_GB'),
        expect.any(Object)
      );
    });

    it('includes format filter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_OFFERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getOffers({ format: 'FIXED_PRICE' });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('format=FIXED_PRICE'),
        expect.any(Object)
      );
    });

    it('clamps limit to maximum 200', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_OFFERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_OFFERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getOffers({ limit: 500 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=200'),
        expect.any(Object)
      );
    });
  });

  // =========================================================================
  // Headers and Auth
  // =========================================================================

  describe('request headers', () => {
    it('includes OAuth Authorization header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getInventoryItems();

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-access-token',
          }),
        })
      );
    });

    it('includes Content-Type header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_INVENTORY_ITEMS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_INVENTORY_ITEMS_SUCCESS),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await client.getInventoryItems();

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });

  // =========================================================================
  // Error handling
  // =========================================================================

  describe('error handling', () => {
    it('throws ApiError on non-OK response', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        data: fixtures.API_ERROR_UNAUTHORIZED,
        raw: JSON.stringify(fixtures.API_ERROR_UNAUTHORIZED),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());
      await expect(client.getInventoryItems()).rejects.toThrow(ApiError);
    });

    it('includes error message from API response', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.API_ERROR_NOT_FOUND,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_FOUND),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());

      try {
        await client.getInventoryItem('test-sku');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toContain('inventory item was not found');
      }
    });

    it('includes path in ApiError operation', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.API_ERROR_NOT_FOUND,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_FOUND),
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());

      try {
        await client.getInventoryItem('test-sku');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).operation).toContain('/inventory_item/test-sku');
      }
    });

    it('handles empty error response gracefully', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        data: {},
        raw: '{}',
        headers: new Headers(),
      });

      const client = new InventoryClient(createConfig());

      try {
        await client.getInventoryItems();
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe('eBay API error');
      }
    });
  });
});
