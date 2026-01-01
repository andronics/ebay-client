import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FulfillmentClient } from '../../../src/fulfillment/client.js';
import { ApiError } from '../../../src/errors/api-error.js';
import { EbayError } from '../../../src/errors/ebay-error.js';
import type { FulfillmentClientConfig } from '../../../src/types/config.js';
import * as http from '../../../src/utils/http.js';
import * as fixtures from '../fixtures/fulfillment-responses.js';

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
const validAuthConfig: FulfillmentClientConfig['auth'] = {
  type: 'oauth',
  accessToken: 'test-access-token',
};

const createConfig = (overrides?: Partial<FulfillmentClientConfig>): FulfillmentClientConfig => ({
  sandbox: true,
  auth: validAuthConfig,
  ...overrides,
});

describe('FulfillmentClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('creates client with valid config', () => {
      const client = new FulfillmentClient(createConfig());
      expect(client).toBeInstanceOf(FulfillmentClient);
    });

    it('validates OAuth config', () => {
      expect(() => {
        new FulfillmentClient(
          createConfig({
            auth: {
              ...validAuthConfig,
              accessToken: '',
            },
          })
        );
      }).toThrow('OAuth config missing accessToken');
    });

    it('uses sandbox endpoint when sandbox is true', () => {
      const client = new FulfillmentClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toContain('sandbox');
    });

    it('uses production endpoint when sandbox is false', () => {
      const client = new FulfillmentClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).not.toContain('sandbox');
    });

    it('uses custom retry config', () => {
      const client = new FulfillmentClient(
        createConfig({
          retry: { maxRetries: 5, delayMs: 2000 },
        })
      );
      expect(client).toBeDefined();
    });
  });

  describe('getBaseUrl', () => {
    it('returns sandbox endpoint', () => {
      const client = new FulfillmentClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/sell/fulfillment/v1');
    });

    it('returns production endpoint', () => {
      const client = new FulfillmentClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).toBe('https://api.ebay.com/sell/fulfillment/v1');
    });
  });

  describe('isSandbox', () => {
    it('returns true for sandbox config', () => {
      const client = new FulfillmentClient(createConfig({ sandbox: true }));
      expect(client.isSandbox()).toBe(true);
    });

    it('returns false for production config', () => {
      const client = new FulfillmentClient(createConfig({ sandbox: false }));
      expect(client.isSandbox()).toBe(false);
    });
  });

  describe('getOrders', () => {
    it('returns orders on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      const result = await client.getOrders();

      expect(result.orders).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('calls httpRequest with correct URL', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders();

      expect(mockHttpRequest).toHaveBeenCalledWith(
        'https://api.sandbox.ebay.com/sell/fulfillment/v1/order',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });

    it('includes limit parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders({ limit: 25 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=25'),
        expect.any(Object)
      );
    });

    it('clamps limit to maximum 200', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders({ limit: 500 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('limit=200'),
        expect.any(Object)
      );
    });

    it('clamps limit to minimum 1', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders({ limit: -5 });

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
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders({ offset: 50 });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('offset=50'),
        expect.any(Object)
      );
    });

    it('includes orderFulfillmentStatus filter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders({ orderFulfillmentStatus: 'NOT_STARTED' });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('orderFulfillmentStatus=NOT_STARTED'),
        expect.any(Object)
      );
    });

    it('includes filter expression', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders({ filter: 'creationdate:[2024-01-01T00:00:00Z..]' });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('filter='),
        expect.any(Object)
      );
    });

    it('returns empty orders array when none found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_EMPTY,
        raw: JSON.stringify(fixtures.GET_ORDERS_EMPTY),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      const result = await client.getOrders();

      expect(result.orders).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe('getOrder', () => {
    it('returns order details on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDER_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDER_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      const result = await client.getOrder({ orderId: '12-34567-89012' });

      expect(result.orderId).toBe('12-34567-89012');
      expect(result.buyer?.username).toBe('testbuyer123');
    });

    it('includes order ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDER_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDER_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrder({ orderId: '12-34567-89012' });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/order/12-34567-89012'),
        expect.any(Object)
      );
    });

    it('includes fieldGroups parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDER_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDER_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrder({ orderId: '12-34567-89012', fieldGroups: 'TAX_BREAKDOWN' });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('fieldGroups=TAX_BREAKDOWN'),
        expect.any(Object)
      );
    });

    it('throws ApiError when order not found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.GET_ORDER_ERROR,
        raw: JSON.stringify(fixtures.GET_ORDER_ERROR),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());

      await expect(
        client.getOrder({ orderId: 'invalid-order' })
      ).rejects.toThrow(ApiError);
    });
  });

  describe('createShipment', () => {
    const shipmentParams = {
      orderId: '12-34567-89012',
      trackingNumber: '1Z999AA10123456784',
      shippingCarrierCode: 'UPS',
      lineItems: [
        {
          lineItemId: '8888888888',
          quantity: 1,
        },
      ],
    };

    it('returns fulfillment ID on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_SHIPMENT_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_SHIPMENT_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      const result = await client.createShipment(shipmentParams);

      expect(result.fulfillmentId).toBe('FUL-12345678');
    });

    it('uses POST method', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_SHIPMENT_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_SHIPMENT_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.createShipment(shipmentParams);

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    it('includes order ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_SHIPMENT_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_SHIPMENT_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.createShipment(shipmentParams);

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/order/12-34567-89012/shipping_fulfillment'),
        expect.any(Object)
      );
    });

    it('sends shipment data in body', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_SHIPMENT_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_SHIPMENT_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.createShipment(shipmentParams);

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.objectContaining({
            trackingNumber: '1Z999AA10123456784',
            shippingCarrierCode: 'UPS',
          }),
        })
      );
    });
  });

  describe('getShipment', () => {
    it('returns shipment details', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_SHIPMENT_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_SHIPMENT_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      const result = await client.getShipment('12-34567-89012', 'FUL-12345678');

      expect(result.fulfillmentId).toBe('FUL-12345678');
    });

    it('includes order and fulfillment ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_SHIPMENT_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_SHIPMENT_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getShipment('12-34567-89012', 'FUL-12345678');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/order/12-34567-89012/shipping_fulfillment/FUL-12345678'),
        expect.any(Object)
      );
    });
  });

  describe('getShipments', () => {
    it('returns all shipments for order', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_SHIPMENTS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_SHIPMENTS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      const result = await client.getShipments('12-34567-89012');

      expect(result.fulfillments).toHaveLength(2);
    });

    it('includes order ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_SHIPMENTS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_SHIPMENTS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getShipments('12-34567-89012');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/order/12-34567-89012/shipping_fulfillment'),
        expect.objectContaining({
          method: 'GET',
        })
      );
    });
  });

  describe('request headers', () => {
    it('includes OAuth Authorization header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders();

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-access-token',
          }),
        })
      );
    });

    it('includes JSON Content-Type', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders();

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('includes JSON Accept header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ORDERS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ORDERS_SUCCESS),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());
      await client.getOrders();

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: 'application/json',
          }),
        })
      );
    });
  });

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

      const client = new FulfillmentClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.getOrders();
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect(caughtError?.message).toMatch(/invalid or expired/);
    });

    it('extracts error message from response', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        data: fixtures.API_ERROR_RATE_LIMIT,
        raw: JSON.stringify(fixtures.API_ERROR_RATE_LIMIT),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.getOrders();
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect(caughtError?.message).toBe('You have exceeded the rate limit for this API.');
    });

    it('uses shortMessage when longMessage missing', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: {
          errors: [{ message: 'Short message only' }],
        },
        raw: '{}',
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());

      await expect(client.getOrders()).rejects.toThrow('Short message only');
    });

    it('uses default message when no messages available', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        data: { errors: [{}] },
        raw: '{}',
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());

      await expect(client.getOrders()).rejects.toThrow('Fulfillment API error');
    });

    it('propagates HTTP errors', async () => {
      mockHttpRequest.mockRejectedValueOnce(new EbayError('Network error'));

      const client = new FulfillmentClient(createConfig());

      await expect(client.getOrders()).rejects.toThrow(EbayError);
    });

    it('includes path in ApiError operation', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.GET_ORDER_ERROR,
        raw: JSON.stringify(fixtures.GET_ORDER_ERROR),
        headers: new Headers(),
      });

      const client = new FulfillmentClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.getOrder({ orderId: 'test-123' });
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect((caughtError as ApiError).operation).toContain('/order/test-123');
    });
  });
});
