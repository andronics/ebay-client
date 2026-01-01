import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AccountClient } from '../../../src/account/client.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { AccountClientConfig } from '../../../src/types/config.js';
import * as http from '../../../src/utils/http.js';
import * as fixtures from '../fixtures/account-responses.js';

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
const validAuthConfig: AccountClientConfig['auth'] = {
  type: 'oauth',
  accessToken: 'test-access-token',
};

const createConfig = (overrides?: Partial<AccountClientConfig>): AccountClientConfig => ({
  sandbox: true,
  auth: validAuthConfig,
  ...overrides,
});

describe('AccountClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('creates client with valid config', () => {
      const client = new AccountClient(createConfig());
      expect(client).toBeInstanceOf(AccountClient);
    });

    it('validates OAuth config - missing access token', () => {
      expect(() => {
        new AccountClient(createConfig({
          auth: { type: 'oauth', accessToken: '' },
        }));
      }).toThrow('OAuth config missing accessToken');
    });

    it('uses sandbox endpoint when sandbox is true', () => {
      const client = new AccountClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toContain('sandbox');
    });

    it('uses production endpoint when sandbox is false', () => {
      const client = new AccountClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).not.toContain('sandbox');
    });
  });

  describe('getBaseUrl', () => {
    it('returns sandbox endpoint', () => {
      const client = new AccountClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/sell/account/v1');
    });

    it('returns production endpoint', () => {
      const client = new AccountClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).toBe('https://api.ebay.com/sell/account/v1');
    });
  });

  describe('isSandbox', () => {
    it('returns true for sandbox config', () => {
      const client = new AccountClient(createConfig({ sandbox: true }));
      expect(client.isSandbox()).toBe(true);
    });

    it('returns false for production config', () => {
      const client = new AccountClient(createConfig({ sandbox: false }));
      expect(client.isSandbox()).toBe(false);
    });
  });

  // ===========================================================================
  // Fulfillment Policy Operations
  // ===========================================================================

  describe('createFulfillmentPolicy', () => {
    it('returns policy response on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_FULFILLMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_FULFILLMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.createFulfillmentPolicy({
        name: 'New Shipping Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(result.fulfillmentPolicyId).toBe('FUL-NEW-12345');
      expect(result.name).toBe('New Shipping Policy');
    });

    it('uses POST method to /fulfillment_policy/', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_FULFILLMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_FULFILLMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.createFulfillmentPolicy({
        name: 'Test Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringMatching(/\/fulfillment_policy\/$/),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('getFulfillmentPolicy', () => {
    it('returns fulfillment policy on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_FULFILLMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_FULFILLMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.getFulfillmentPolicy('FUL-12345678');

      expect(result.fulfillmentPolicyId).toBe('FUL-12345678');
      expect(result.name).toBe('Standard UK Shipping');
      expect(result.marketplaceId).toBe('EBAY_GB');
    });

    it('encodes policy ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_FULFILLMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_FULFILLMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getFulfillmentPolicy('FUL/123');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/fulfillment_policy/FUL%2F123'),
        expect.any(Object)
      );
    });

    it('throws ApiError when policy not found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.API_ERROR_NOT_FOUND,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_FOUND),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await expect(client.getFulfillmentPolicy('INVALID-ID')).rejects.toThrow(ApiError);
    });
  });

  describe('getFulfillmentPolicies', () => {
    it('returns fulfillment policies list', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_FULFILLMENT_POLICIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_FULFILLMENT_POLICIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.getFulfillmentPolicies('EBAY_GB');

      expect(result.fulfillmentPolicies).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('includes marketplace_id parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_FULFILLMENT_POLICIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_FULFILLMENT_POLICIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getFulfillmentPolicies('EBAY_GB');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('marketplace_id=EBAY_GB'),
        expect.any(Object)
      );
    });
  });

  describe('updateFulfillmentPolicy', () => {
    it('updates policy with PUT request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_FULFILLMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_FULFILLMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.updateFulfillmentPolicy('FUL-12345678', {
        name: 'Updated Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/fulfillment_policy/FUL-12345678'),
        expect.objectContaining({
          method: 'PUT',
          body: expect.objectContaining({
            name: 'Updated Policy',
          }),
        })
      );
    });
  });

  describe('deleteFulfillmentPolicy', () => {
    it('deletes policy with DELETE request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        data: undefined,
        raw: '',
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.deleteFulfillmentPolicy('FUL-12345678');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/fulfillment_policy/FUL-12345678'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  // ===========================================================================
  // Payment Policy Operations
  // ===========================================================================

  describe('createPaymentPolicy', () => {
    it('returns policy response on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_PAYMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_PAYMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.createPaymentPolicy({
        name: 'New Payment Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(result.paymentPolicyId).toBe('PAY-NEW-12345');
      expect(result.name).toBe('New Payment Policy');
    });

    it('uses POST method to /payment_policy', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_PAYMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_PAYMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.createPaymentPolicy({
        name: 'Test Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringMatching(/\/payment_policy$/),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('getPaymentPolicy', () => {
    it('returns payment policy on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_PAYMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PAYMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.getPaymentPolicy('PAY-12345678');

      expect(result.paymentPolicyId).toBe('PAY-12345678');
      expect(result.name).toBe('Standard Payment');
      expect(result.immediatePay).toBe(true);
    });

    it('encodes policy ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_PAYMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PAYMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getPaymentPolicy('PAY#123');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/payment_policy/PAY%23123'),
        expect.any(Object)
      );
    });

    it('throws ApiError when policy not found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.API_ERROR_NOT_FOUND,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_FOUND),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await expect(client.getPaymentPolicy('INVALID-ID')).rejects.toThrow(ApiError);
    });
  });

  describe('getPaymentPolicies', () => {
    it('returns payment policies list', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_PAYMENT_POLICIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PAYMENT_POLICIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.getPaymentPolicies('EBAY_GB');

      expect(result.paymentPolicies).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('includes marketplace_id parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_PAYMENT_POLICIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PAYMENT_POLICIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getPaymentPolicies('EBAY_US');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('marketplace_id=EBAY_US'),
        expect.any(Object)
      );
    });
  });

  describe('updatePaymentPolicy', () => {
    it('updates policy with PUT request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_PAYMENT_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_PAYMENT_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.updatePaymentPolicy('PAY-12345678', {
        name: 'Updated Payment Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/payment_policy/PAY-12345678'),
        expect.objectContaining({
          method: 'PUT',
          body: expect.objectContaining({
            name: 'Updated Payment Policy',
          }),
        })
      );
    });
  });

  describe('deletePaymentPolicy', () => {
    it('deletes policy with DELETE request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        data: undefined,
        raw: '',
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.deletePaymentPolicy('PAY-12345678');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/payment_policy/PAY-12345678'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  // ===========================================================================
  // Return Policy Operations
  // ===========================================================================

  describe('createReturnPolicy', () => {
    it('returns policy response on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_RETURN_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_RETURN_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.createReturnPolicy({
        name: 'New Return Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(result.returnPolicyId).toBe('RET-NEW-12345');
      expect(result.name).toBe('New Return Policy');
    });

    it('uses POST method to /return_policy/', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 201,
        statusText: 'Created',
        data: fixtures.CREATE_RETURN_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_RETURN_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.createReturnPolicy({
        name: 'Test Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringMatching(/\/return_policy\/$/),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  describe('getReturnPolicy', () => {
    it('returns return policy on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_RETURN_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_RETURN_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.getReturnPolicy('RET-12345678');

      expect(result.returnPolicyId).toBe('RET-12345678');
      expect(result.name).toBe('Standard Returns');
      expect(result.returnsAccepted).toBe(true);
    });

    it('encodes policy ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_RETURN_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_RETURN_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getReturnPolicy('RET/ABC');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/return_policy/RET%2FABC'),
        expect.any(Object)
      );
    });

    it('throws ApiError when policy not found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.API_ERROR_NOT_FOUND,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_FOUND),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await expect(client.getReturnPolicy('INVALID-ID')).rejects.toThrow(ApiError);
    });
  });

  describe('getReturnPolicies', () => {
    it('returns return policies list', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_RETURN_POLICIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_RETURN_POLICIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.getReturnPolicies('EBAY_GB');

      expect(result.returnPolicies).toHaveLength(2);
      expect(result.total).toBe(2);
    });

    it('includes marketplace_id parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_RETURN_POLICIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_RETURN_POLICIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getReturnPolicies('EBAY_DE');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('marketplace_id=EBAY_DE'),
        expect.any(Object)
      );
    });
  });

  describe('updateReturnPolicy', () => {
    it('updates policy with PUT request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.CREATE_RETURN_POLICY_SUCCESS,
        raw: JSON.stringify(fixtures.CREATE_RETURN_POLICY_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.updateReturnPolicy('RET-12345678', {
        name: 'Updated Return Policy',
        marketplaceId: 'EBAY_GB',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/return_policy/RET-12345678'),
        expect.objectContaining({
          method: 'PUT',
          body: expect.objectContaining({
            name: 'Updated Return Policy',
          }),
        })
      );
    });
  });

  describe('deleteReturnPolicy', () => {
    it('deletes policy with DELETE request', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 204,
        statusText: 'No Content',
        data: undefined,
        raw: '',
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.deleteReturnPolicy('RET-12345678');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/return_policy/RET-12345678'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  // ===========================================================================
  // Privilege Operations
  // ===========================================================================

  describe('getPrivileges', () => {
    it('returns selling privileges on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_PRIVILEGES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PRIVILEGES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      const result = await client.getPrivileges();

      expect(result.sellerRegistrationCompleted).toBe(true);
      expect(result.sellingLimit?.amount?.value).toBe('25000.00');
      expect(result.sellingLimit?.quantity).toBe(500);
    });

    it('uses GET method to /privilege', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_PRIVILEGES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PRIVILEGES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getPrivileges();

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringMatching(/\/privilege$/),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('throws ApiError on unauthorized', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        data: fixtures.API_ERROR_UNAUTHORIZED,
        raw: JSON.stringify(fixtures.API_ERROR_UNAUTHORIZED),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await expect(client.getPrivileges()).rejects.toThrow(ApiError);
    });
  });

  // ===========================================================================
  // Headers and Auth
  // ===========================================================================

  describe('request headers', () => {
    it('includes OAuth Authorization header', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_PRIVILEGES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PRIVILEGES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getPrivileges();

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
        data: fixtures.GET_PRIVILEGES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_PRIVILEGES_SUCCESS),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());
      await client.getPrivileges();

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

  // ===========================================================================
  // Error handling
  // ===========================================================================

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

      const client = new AccountClient(createConfig());
      await expect(client.getPrivileges()).rejects.toThrow(ApiError);
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

      const client = new AccountClient(createConfig());

      try {
        await client.getFulfillmentPolicy('test-id');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toContain('policy was not found');
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

      const client = new AccountClient(createConfig());

      try {
        await client.getFulfillmentPolicy('test-id');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).operation).toContain('/fulfillment_policy/test-id');
      }
    });

    it('handles invalid policy error', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: fixtures.API_ERROR_INVALID_POLICY,
        raw: JSON.stringify(fixtures.API_ERROR_INVALID_POLICY),
        headers: new Headers(),
      });

      const client = new AccountClient(createConfig());

      try {
        await client.createFulfillmentPolicy({
          name: '',
          marketplaceId: 'EBAY_GB',
        });
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toContain('invalid');
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

      const client = new AccountClient(createConfig());

      try {
        await client.getPrivileges();
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe('eBay API error');
      }
    });
  });
});
