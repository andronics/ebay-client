import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TradingClient } from '../../../src/clients/trading.js';
import { ApiError } from '../../../src/errors/api-error.js';
import { EbayError } from '../../../src/errors/ebay-error.js';
import type { TradingClientConfig } from '../../../src/types/config.js';
import * as http from '../../../src/utils/http.js';
import * as fixtures from '../fixtures/trading-responses.js';

// Mock the http module
vi.mock('../../../src/utils/http.js', async () => {
  const actual = await vi.importActual<typeof http>('../../../src/utils/http.js');
  return {
    ...actual,
    httpPost: vi.fn(),
  };
});

const mockHttpPost = vi.mocked(http.httpPost);

// Valid auth config for testing
const validAuthConfig: TradingClientConfig['auth'] = {
  type: 'auth-n-auth',
  appId: 'test-app-id',
  devId: 'test-dev-id',
  certId: 'test-cert-id',
  authToken: 'test-auth-token',
};

const createConfig = (overrides?: Partial<TradingClientConfig>): TradingClientConfig => ({
  sandbox: true,
  siteId: 3,
  auth: validAuthConfig,
  ...overrides,
});

describe('TradingClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('creates client with valid config', () => {
      const client = new TradingClient(createConfig());
      expect(client).toBeInstanceOf(TradingClient);
    });

    it('validates auth config', () => {
      expect(() => {
        new TradingClient(
          createConfig({
            auth: {
              ...validAuthConfig,
              appId: '',
            },
          })
        );
      }).toThrow('Auth config missing appId');
    });

    it('throws for missing devId', () => {
      expect(() => {
        new TradingClient(
          createConfig({
            auth: {
              ...validAuthConfig,
              devId: '',
            },
          })
        );
      }).toThrow('Auth config missing devId');
    });

    it('throws for missing certId', () => {
      expect(() => {
        new TradingClient(
          createConfig({
            auth: {
              ...validAuthConfig,
              certId: '',
            },
          })
        );
      }).toThrow('Auth config missing certId');
    });

    it('throws for missing authToken', () => {
      expect(() => {
        new TradingClient(
          createConfig({
            auth: {
              ...validAuthConfig,
              authToken: '',
            },
          })
        );
      }).toThrow('Auth config missing authToken');
    });

    it('uses sandbox endpoint when sandbox is true', () => {
      const client = new TradingClient(createConfig({ sandbox: true }));
      expect(client.getEndpoint()).toContain('sandbox');
    });

    it('uses production endpoint when sandbox is false', () => {
      const client = new TradingClient(createConfig({ sandbox: false }));
      expect(client.getEndpoint()).not.toContain('sandbox');
    });

    it('uses default compatibility level', () => {
      const client = new TradingClient(createConfig());
      expect(client).toBeDefined();
      // Default is 1225 (tested implicitly through request headers)
    });

    it('uses custom compatibility level', () => {
      const client = new TradingClient(
        createConfig({ compatibilityLevel: 1199 })
      );
      expect(client).toBeDefined();
    });

    it('uses custom retry config', () => {
      const client = new TradingClient(
        createConfig({
          retry: { maxRetries: 5, delayMs: 2000 },
        })
      );
      expect(client).toBeDefined();
    });
  });

  describe('getEndpoint', () => {
    it('returns sandbox endpoint', () => {
      const client = new TradingClient(createConfig({ sandbox: true }));
      expect(client.getEndpoint()).toBe('https://api.sandbox.ebay.com/ws/api.dll');
    });

    it('returns production endpoint', () => {
      const client = new TradingClient(createConfig({ sandbox: false }));
      expect(client.getEndpoint()).toBe('https://api.ebay.com/ws/api.dll');
    });
  });

  describe('isSandbox', () => {
    it('returns true for sandbox config', () => {
      const client = new TradingClient(createConfig({ sandbox: true }));
      expect(client.isSandbox()).toBe(true);
    });

    it('returns false for production config', () => {
      const client = new TradingClient(createConfig({ sandbox: false }));
      expect(client.isSandbox()).toBe(false);
    });
  });

  describe('getTokenStatus', () => {
    it('returns token status on success', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.getTokenStatus();

      expect(result.Ack).toBe('Success');
      expect(result.TokenStatus).toBeDefined();
    });

    it('calls httpPost with correct parameters', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.getTokenStatus();

      expect(mockHttpPost).toHaveBeenCalledWith(
        'https://api.sandbox.ebay.com/ws/api.dll',
        expect.stringContaining('GetTokenStatusRequest'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-EBAY-API-CALL-NAME': 'GetTokenStatus',
          }),
        })
      );
    });

    it('throws ApiError on failure response', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_FAILURE,
        raw: fixtures.GET_TOKEN_STATUS_FAILURE,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.getTokenStatus();
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect(caughtError?.message).toBe('The authentication token is invalid or expired.');
    });
  });

  describe('addItem', () => {
    const addItemRequest = {
      Item: {
        Title: 'Test Item',
        PrimaryCategory: { CategoryID: '12345' },
        StartPrice: '9.99',
        ConditionID: '1000',
        Description: 'Test description',
        Country: 'GB',
        Currency: 'GBP',
        DispatchTimeMax: '3',
        ListingDuration: 'Days_7',
        ListingType: 'FixedPriceItem',
        PaymentMethods: 'PayPal',
        PostalCode: 'SW1A 1AA',
        Quantity: '1',
      },
    };

    it('returns item ID on success', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.ADD_ITEM_SUCCESS,
        raw: fixtures.ADD_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.addItem(addItemRequest);

      expect(result.Ack).toBe('Success');
      expect(result.ItemID).toBe('123456789012');
    });

    it('throws ApiError on validation failure', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.ADD_ITEM_ERROR,
        raw: fixtures.ADD_ITEM_ERROR,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());

      let caughtError: Error | undefined;
      try {
        await client.addItem(addItemRequest);
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBeInstanceOf(ApiError);
      expect(caughtError?.message).toMatch(/Brand/);
    });

    it('includes Item in request body', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.ADD_ITEM_SUCCESS,
        raw: fixtures.ADD_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.addItem(addItemRequest);

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('<Title>Test Item</Title>'),
        expect.any(Object)
      );
    });
  });

  describe('verifyAddItem', () => {
    const verifyRequest = {
      Item: {
        Title: 'Test Item',
        PrimaryCategory: { CategoryID: '12345' },
        StartPrice: '9.99',
      },
    };

    it('validates item without creating', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.VERIFY_ADD_ITEM_SUCCESS,
        raw: fixtures.VERIFY_ADD_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.verifyAddItem(verifyRequest);

      expect(result.Ack).toBe('Success');
    });

    it('calls VerifyAddItem operation', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.VERIFY_ADD_ITEM_SUCCESS,
        raw: fixtures.VERIFY_ADD_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.verifyAddItem(verifyRequest);

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('VerifyAddItemRequest'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-EBAY-API-CALL-NAME': 'VerifyAddItem',
          }),
        })
      );
    });
  });

  describe('reviseItem', () => {
    const reviseRequest = {
      Item: {
        ItemID: '123456789012',
        Title: 'Updated Title',
      },
    };

    it('returns success on valid revision', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.REVISE_ITEM_SUCCESS,
        raw: fixtures.REVISE_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.reviseItem(reviseRequest);

      expect(result.Ack).toBe('Success');
      expect(result.ItemID).toBe('123456789012');
    });

    it('includes ItemID in request', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.REVISE_ITEM_SUCCESS,
        raw: fixtures.REVISE_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.reviseItem(reviseRequest);

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('<ItemID>123456789012</ItemID>'),
        expect.any(Object)
      );
    });
  });

  describe('endItem', () => {
    const endRequest = {
      ItemID: '123456789012',
      EndingReason: 'NotAvailable' as const,
    };

    it('returns success when item ended', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.END_ITEM_SUCCESS,
        raw: fixtures.END_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.endItem(endRequest);

      expect(result.Ack).toBe('Success');
    });

    it('includes EndingReason in request', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.END_ITEM_SUCCESS,
        raw: fixtures.END_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.endItem(endRequest);

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('NotAvailable'),
        expect.any(Object)
      );
    });
  });

  describe('getItem', () => {
    const getRequest = {
      ItemID: '123456789012',
    };

    it('returns item details on success', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ITEM_SUCCESS,
        raw: fixtures.GET_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.getItem(getRequest);

      expect(result.Ack).toBe('Success');
      expect(result.Item).toBeDefined();
    });

    it('includes detail level if specified', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ITEM_SUCCESS,
        raw: fixtures.GET_ITEM_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.getItem({
        ItemID: '123456789012',
        DetailLevel: 'ReturnAll',
      });

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('ReturnAll'),
        expect.any(Object)
      );
    });
  });

  describe('setNotificationPreferences', () => {
    const prefsRequest = {
      ApplicationDeliveryPreferences: {
        ApplicationURL: 'https://example.com/webhook',
        ApplicationEnable: 'Enable' as const,
      },
    };

    it('returns success when preferences set', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.SET_NOTIFICATION_PREFERENCES_SUCCESS,
        raw: fixtures.SET_NOTIFICATION_PREFERENCES_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.setNotificationPreferences(prefsRequest);

      expect(result.Ack).toBe('Success');
    });

    it('includes application URL in request', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.SET_NOTIFICATION_PREFERENCES_SUCCESS,
        raw: fixtures.SET_NOTIFICATION_PREFERENCES_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.setNotificationPreferences(prefsRequest);

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('https://example.com/webhook'),
        expect.any(Object)
      );
    });
  });

  describe('getNotificationPreferences', () => {
    it('returns notification preferences', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
        raw: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      const result = await client.getNotificationPreferences();

      expect(result.Ack).toBe('Success');
      expect(result.ApplicationDeliveryPreferences).toBeDefined();
    });

    it('defaults to User level', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
        raw: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.getNotificationPreferences();

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('<PreferenceLevel>User</PreferenceLevel>'),
        expect.any(Object)
      );
    });

    it('allows Application level', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
        raw: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.getNotificationPreferences('Application');

      expect(mockHttpPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('<PreferenceLevel>Application</PreferenceLevel>'),
        expect.any(Object)
      );
    });
  });

  describe('getFullNotificationPreferences', () => {
    it('fetches both User and Application preferences', async () => {
      mockHttpPost
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          statusText: 'OK',
          data: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
          raw: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          statusText: 'OK',
          data: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
          raw: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
          headers: new Headers(),
        });

      const client = new TradingClient(createConfig());
      const result = await client.getFullNotificationPreferences();

      expect(result.user).toBeDefined();
      expect(result.application).toBeDefined();
      expect(mockHttpPost).toHaveBeenCalledTimes(2);
    });

    it('makes parallel requests', async () => {
      let callOrder: string[] = [];
      mockHttpPost.mockImplementation(async (_, body) => {
        const level = (body as string).includes('User') ? 'User' : 'Application';
        callOrder.push(`start-${level}`);
        await new Promise((r) => setTimeout(r, 10));
        callOrder.push(`end-${level}`);
        return {
          ok: true,
          status: 200,
          statusText: 'OK',
          data: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
          raw: fixtures.GET_NOTIFICATION_PREFERENCES_SUCCESS,
          headers: new Headers(),
        };
      });

      const client = new TradingClient(createConfig());
      await client.getFullNotificationPreferences();

      // Both requests should start before either ends (parallel execution)
      expect(callOrder[0]).toMatch(/^start-/);
      expect(callOrder[1]).toMatch(/^start-/);
    });
  });

  describe('error handling', () => {
    it('includes operation name in ApiError', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_FAILURE,
        raw: fixtures.GET_TOKEN_STATUS_FAILURE,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());

      try {
        await client.getTokenStatus();
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).operation).toBe('GetTokenStatus');
      }
    });

    it('propagates HTTP errors', async () => {
      mockHttpPost.mockRejectedValueOnce(
        new EbayError('Network error')
      );

      const client = new TradingClient(createConfig());

      await expect(client.getTokenStatus()).rejects.toThrow(EbayError);
    });

    it('handles multiple API errors', async () => {
      const multiErrorResponse = `<?xml version="1.0" encoding="UTF-8"?>
<AddItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Failure</Ack>
  <Errors>
    <ShortMessage>Error 1</ShortMessage>
    <LongMessage>First error message</LongMessage>
    <ErrorCode>100</ErrorCode>
    <SeverityCode>Error</SeverityCode>
  </Errors>
  <Errors>
    <ShortMessage>Error 2</ShortMessage>
    <LongMessage>Second error message</LongMessage>
    <ErrorCode>200</ErrorCode>
    <SeverityCode>Error</SeverityCode>
  </Errors>
</AddItemResponse>`;

      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: multiErrorResponse,
        raw: multiErrorResponse,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());

      try {
        await client.addItem({ Item: { Title: 'Test' } });
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).details.length).toBe(2);
        expect((error as ApiError).message).toBe('First error message');
      }
    });

    it('uses ShortMessage when LongMessage missing', async () => {
      const shortMessageOnly = `<?xml version="1.0" encoding="UTF-8"?>
<GetTokenStatusResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Failure</Ack>
  <Errors>
    <ShortMessage>Short error only</ShortMessage>
    <ErrorCode>999</ErrorCode>
  </Errors>
</GetTokenStatusResponse>`;

      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: shortMessageOnly,
        raw: shortMessageOnly,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());

      await expect(client.getTokenStatus()).rejects.toThrow('Short error only');
    });
  });

  describe('request headers', () => {
    it('includes all required Trading API headers', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig({ siteId: 3 }));
      await client.getTokenStatus();

      const callArgs = mockHttpPost.mock.calls[0];
      const headers = callArgs[2]?.headers as Record<string, string>;

      expect(headers['Content-Type']).toBe('text/xml; charset=utf-8');
      expect(headers['X-EBAY-API-COMPATIBILITY-LEVEL']).toBe('1225');
      expect(headers['X-EBAY-API-SITEID']).toBe('3');
      expect(headers['X-EBAY-API-CALL-NAME']).toBe('GetTokenStatus');
      expect(headers['X-EBAY-API-APP-NAME']).toBe('test-app-id');
      expect(headers['X-EBAY-API-DEV-NAME']).toBe('test-dev-id');
      expect(headers['X-EBAY-API-CERT-NAME']).toBe('test-cert-id');
    });

    it('uses configured site ID', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig({ siteId: 0 }));
      await client.getTokenStatus();

      const callArgs = mockHttpPost.mock.calls[0];
      const headers = callArgs[2]?.headers as Record<string, string>;

      expect(headers['X-EBAY-API-SITEID']).toBe('0');
    });

    it('uses custom compatibility level', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(
        createConfig({ compatibilityLevel: 1199 })
      );
      await client.getTokenStatus();

      const callArgs = mockHttpPost.mock.calls[0];
      const headers = callArgs[2]?.headers as Record<string, string>;

      expect(headers['X-EBAY-API-COMPATIBILITY-LEVEL']).toBe('1199');
    });
  });

  describe('request body', () => {
    it('includes XML declaration', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.getTokenStatus();

      const callArgs = mockHttpPost.mock.calls[0];
      const body = callArgs[1] as string;

      expect(body).toMatch(/^<\?xml version="1\.0" encoding="utf-8"\?>/);
    });

    it('includes eBay namespace', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.getTokenStatus();

      const callArgs = mockHttpPost.mock.calls[0];
      const body = callArgs[1] as string;

      expect(body).toContain('xmlns="urn:ebay:apis:eBLBaseComponents"');
    });

    it('includes RequesterCredentials with auth token', async () => {
      mockHttpPost.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_TOKEN_STATUS_SUCCESS,
        raw: fixtures.GET_TOKEN_STATUS_SUCCESS,
        headers: new Headers(),
      });

      const client = new TradingClient(createConfig());
      await client.getTokenStatus();

      const callArgs = mockHttpPost.mock.calls[0];
      const body = callArgs[1] as string;

      expect(body).toContain('<RequesterCredentials>');
      expect(body).toContain('<eBayAuthToken>test-auth-token</eBayAuthToken>');
    });
  });
});
