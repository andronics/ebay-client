import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { InventoryClient } from '../../../src/clients/inventory.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { InventoryClientConfig } from '../../../src/types/config.js';
import { server } from './setup.js';
import {
  capturedRequests,
  clearCapturedRequests,
  unauthorizedHandler,
} from './handlers/inventory.js';

/**
 * Test configuration for Inventory API integration tests.
 */
const testConfig: InventoryClientConfig = {
  sandbox: true,
  auth: {
    accessToken: 'test-access-token',
  },
};

describe('Inventory API Integration (MSW)', () => {
  let client: InventoryClient;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    client = new InventoryClient(testConfig);
  });

  afterEach(() => {
    server.resetHandlers();
    clearCapturedRequests();
  });

  afterAll(() => {
    server.close();
  });

  describe('Inventory Item Operations', () => {
    describe('createOrReplaceInventoryItem', () => {
      it('creates an inventory item with PUT request', async () => {
        await client.createOrReplaceInventoryItem('TEST-SKU-001', {
          product: {
            title: 'Test Product',
            description: 'A test description',
          },
          condition: 'NEW',
          availability: {
            shipToLocationAvailability: {
              quantity: 10,
            },
          },
        });

        expect(capturedRequests).toHaveLength(1);
        const request = capturedRequests[0];
        expect(request.method).toBe('PUT');
        expect(request.path).toBe('/inventory_item/TEST-SKU-001');
        expect(request.body).toMatchObject({
          product: { title: 'Test Product' },
          condition: 'NEW',
        });
      });

      it('sends correct authorization header', async () => {
        await client.createOrReplaceInventoryItem('TEST-SKU-001', {
          product: { title: 'Test' },
          condition: 'NEW',
        });

        const headers = capturedRequests[0].headers;
        expect(headers['authorization']).toBe('Bearer test-access-token');
        expect(headers['content-type']).toBe('application/json');
      });
    });

    describe('getInventoryItem', () => {
      it('retrieves an inventory item by SKU', async () => {
        const item = await client.getInventoryItem('TEST-SKU-001');

        expect(item.sku).toBe('TEST-SKU-001');
        expect(item.product?.title).toBe('Test Product');
        expect(item.condition).toBe('NEW');
        expect(item.availability?.shipToLocationAvailability?.quantity).toBe(10);
      });

      it('sends GET request with correct path', async () => {
        await client.getInventoryItem('MY-CUSTOM-SKU');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].path).toBe('/inventory_item/MY-CUSTOM-SKU');
      });

      it('throws ApiError for non-existent item', async () => {
        await expect(
          client.getInventoryItem('NOT-FOUND-SKU')
        ).rejects.toThrow(ApiError);
      });

      it('includes error details in ApiError', async () => {
        try {
          await client.getInventoryItem('NOT-FOUND-SKU');
        } catch (error) {
          expect(error).toBeInstanceOf(ApiError);
          const apiError = error as ApiError;
          expect(apiError.message).toContain('not found');
          expect(apiError.hasErrorCode('25001')).toBe(true);
        }
      });
    });

    describe('deleteInventoryItem', () => {
      it('deletes an inventory item by SKU', async () => {
        await client.deleteInventoryItem('TEST-SKU-001');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('DELETE');
        expect(capturedRequests[0].path).toBe('/inventory_item/TEST-SKU-001');
      });

      it('throws ApiError for non-existent item', async () => {
        await expect(
          client.deleteInventoryItem('NOT-FOUND-SKU')
        ).rejects.toThrow(ApiError);
      });
    });

    describe('getInventoryItems', () => {
      it('retrieves paginated list of inventory items', async () => {
        const result = await client.getInventoryItems();

        expect(result.total).toBe(2);
        expect(result.inventoryItems).toHaveLength(2);
        expect(result.inventoryItems?.[0].sku).toBe('TEST-SKU-001');
        expect(result.inventoryItems?.[1].sku).toBe('TEST-SKU-002');
      });

      it('sends pagination parameters', async () => {
        await client.getInventoryItems({ limit: 10, offset: 20 });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].body).toMatchObject({
          limit: '10',
          offset: '20',
        });
      });
    });
  });

  describe('Offer Operations', () => {
    describe('createOffer', () => {
      it('creates an offer and returns offerId', async () => {
        const result = await client.createOffer({
          sku: 'TEST-SKU-001',
          marketplaceId: 'EBAY_GB',
          format: 'FIXED_PRICE',
          listingPolicies: {
            fulfillmentPolicyId: 'FUL-001',
            paymentPolicyId: 'PAY-001',
            returnPolicyId: 'RET-001',
          },
          pricingSummary: {
            price: { value: '29.99', currency: 'GBP' },
          },
          categoryId: '11450',
        });

        expect(result.offerId).toBe('OFF-12345678');
      });

      it('sends POST request with offer data', async () => {
        await client.createOffer({
          sku: 'TEST-SKU-001',
          marketplaceId: 'EBAY_GB',
          format: 'FIXED_PRICE',
          categoryId: '11450',
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('POST');
        expect(capturedRequests[0].path).toBe('/offer');
        expect(capturedRequests[0].body).toMatchObject({
          sku: 'TEST-SKU-001',
          marketplaceId: 'EBAY_GB',
        });
      });
    });

    describe('getOffer', () => {
      it('retrieves offer by ID', async () => {
        const offer = await client.getOffer('OFF-12345678');

        expect(offer.offerId).toBe('OFF-12345678');
        expect(offer.sku).toBe('TEST-SKU-001');
        expect(offer.marketplaceId).toBe('EBAY_GB');
        expect(offer.status).toBe('UNPUBLISHED');
      });

      it('throws ApiError for non-existent offer', async () => {
        await expect(
          client.getOffer('NOT-FOUND-OFFER')
        ).rejects.toThrow(ApiError);
      });
    });

    describe('updateOffer', () => {
      it('updates an offer by ID', async () => {
        await client.updateOffer('OFF-12345678', {
          pricingSummary: {
            price: { value: '39.99', currency: 'GBP' },
          },
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('PUT');
        expect(capturedRequests[0].path).toBe('/offer/OFF-12345678');
        expect(capturedRequests[0].body).toMatchObject({
          pricingSummary: {
            price: { value: '39.99', currency: 'GBP' },
          },
        });
      });
    });

    describe('publishOffer', () => {
      it('publishes an offer and returns listingId', async () => {
        const result = await client.publishOffer('OFF-12345678');

        expect(result.listingId).toBe('123456789012');
      });

      it('sends POST request to publish endpoint', async () => {
        await client.publishOffer('OFF-12345678');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('POST');
        expect(capturedRequests[0].path).toBe('/offer/OFF-12345678/publish');
      });
    });

    describe('getOffers', () => {
      it('retrieves offers by SKU', async () => {
        const result = await client.getOffers({ sku: 'TEST-SKU-001' });

        expect(result.total).toBe(2);
        expect(result.offers).toHaveLength(2);
        expect(result.offers?.[0].offerId).toBe('OFF-12345678');
      });

      it('sends SKU and pagination parameters', async () => {
        await client.getOffers({ sku: 'TEST-SKU-001', limit: 10, offset: 5 });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].body).toMatchObject({
          sku: 'TEST-SKU-001',
          limit: '10',
          offset: '5',
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('throws ApiError on 401 unauthorized', async () => {
      server.use(unauthorizedHandler);

      await expect(
        client.getInventoryItem('TEST-SKU-001')
      ).rejects.toThrow(ApiError);
    });

    it('includes error details from API response', async () => {
      server.use(unauthorizedHandler);

      try {
        await client.getInventoryItem('TEST-SKU-001');
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toContain('Access token is invalid');
        expect(apiError.hasErrorCode('1001')).toBe(true);
      }
    });
  });

  describe('Client Configuration', () => {
    it('uses sandbox endpoint', () => {
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/sell/inventory/v1');
    });

    it('reports sandbox mode', () => {
      expect(client.isSandbox()).toBe(true);
    });

    it('uses production endpoint when sandbox=false', () => {
      const prodClient = new InventoryClient({
        ...testConfig,
        sandbox: false,
      });
      expect(prodClient.getBaseUrl()).toBe('https://api.ebay.com/sell/inventory/v1');
    });
  });

  describe('Complete Inventory Workflow', () => {
    it('createItem → createOffer → publishOffer', async () => {
      // Step 1: Create inventory item
      await client.createOrReplaceInventoryItem('WORKFLOW-SKU', {
        product: {
          title: 'Workflow Test Product',
          description: 'Testing complete workflow',
        },
        condition: 'NEW',
        availability: {
          shipToLocationAvailability: {
            quantity: 5,
          },
        },
      });

      // Step 2: Create offer for the item
      const offerResult = await client.createOffer({
        sku: 'WORKFLOW-SKU',
        marketplaceId: 'EBAY_GB',
        format: 'FIXED_PRICE',
        listingPolicies: {
          fulfillmentPolicyId: 'FUL-001',
          paymentPolicyId: 'PAY-001',
          returnPolicyId: 'RET-001',
        },
        pricingSummary: {
          price: { value: '19.99', currency: 'GBP' },
        },
        categoryId: '11450',
      });

      expect(offerResult.offerId).toBeDefined();

      // Step 3: Publish the offer
      const publishResult = await client.publishOffer(offerResult.offerId!);
      expect(publishResult.listingId).toBeDefined();

      // Verify the workflow sequence
      expect(capturedRequests.map((r) => `${r.method} ${r.path}`)).toEqual([
        'PUT /inventory_item/WORKFLOW-SKU',
        'POST /offer',
        'POST /offer/OFF-12345678/publish',
      ]);
    });

    it('getItem → updateOffer → verify update', async () => {
      // Get existing item
      const item = await client.getInventoryItem('TEST-SKU-001');
      expect(item.sku).toBe('TEST-SKU-001');

      // Get offers for item
      const offersResult = await client.getOffers({ sku: item.sku! });
      expect(offersResult.offers).toBeDefined();

      // Update first offer
      const offerId = offersResult.offers![0].offerId!;
      await client.updateOffer(offerId, {
        pricingSummary: {
          price: { value: '24.99', currency: 'GBP' },
        },
      });

      // Verify offer was updated
      const updatedOffer = await client.getOffer(offerId);
      expect(updatedOffer.offerId).toBe(offerId);

      // Verify the sequence
      expect(capturedRequests.map((r) => `${r.method} ${r.path}`)).toEqual([
        'GET /inventory_item/TEST-SKU-001',
        'GET /offer',
        'PUT /offer/OFF-12345678',
        'GET /offer/OFF-12345678',
      ]);
    });
  });
});
