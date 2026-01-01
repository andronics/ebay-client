import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { AccountClient } from '../../../src/clients/account.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { AccountClientConfig } from '../../../src/types/config.js';
import { server } from './setup.js';
import {
  capturedRequests,
  clearCapturedRequests,
  unauthorizedHandler,
  invalidPolicyHandler,
} from './handlers/account.js';

/**
 * Test configuration for Account API integration tests.
 */
const testConfig: AccountClientConfig = {
  sandbox: true,
  auth: {
    accessToken: 'test-access-token',
  },
};

describe('Account API Integration (MSW)', () => {
  let client: AccountClient;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    client = new AccountClient(testConfig);
  });

  afterEach(() => {
    server.resetHandlers();
    clearCapturedRequests();
  });

  afterAll(() => {
    server.close();
  });

  // ===========================================================================
  // Fulfillment Policy Operations
  // ===========================================================================

  describe('Fulfillment Policy Operations', () => {
    describe('createFulfillmentPolicy', () => {
      it('creates a fulfillment policy and returns policy ID', async () => {
        const result = await client.createFulfillmentPolicy({
          name: 'Standard UK Shipping',
          marketplaceId: 'EBAY_GB',
          handlingTime: { unit: 'DAY', value: 1 },
        });

        expect(result.fulfillmentPolicyId).toBe('FUL-NEW-12345');
        expect(result.name).toBe('New Shipping Policy');
      });

      it('sends POST request with policy data', async () => {
        await client.createFulfillmentPolicy({
          name: 'Express Shipping',
          marketplaceId: 'EBAY_GB',
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('POST');
        expect(capturedRequests[0].path).toBe('/fulfillment_policy/');
        expect(capturedRequests[0].body).toMatchObject({
          name: 'Express Shipping',
          marketplaceId: 'EBAY_GB',
        });
      });

      it('sends correct authorization header', async () => {
        await client.createFulfillmentPolicy({
          name: 'Test Policy',
          marketplaceId: 'EBAY_GB',
        });

        const headers = capturedRequests[0].headers;
        expect(headers['authorization']).toBe('Bearer test-access-token');
        expect(headers['content-type']).toBe('application/json');
      });
    });

    describe('getFulfillmentPolicy', () => {
      it('retrieves a fulfillment policy by ID', async () => {
        const policy = await client.getFulfillmentPolicy('FUL-12345678');

        expect(policy.fulfillmentPolicyId).toBe('FUL-12345678');
        expect(policy.name).toBe('Standard UK Shipping');
        expect(policy.marketplaceId).toBe('EBAY_GB');
      });

      it('sends GET request with correct path', async () => {
        await client.getFulfillmentPolicy('FUL-CUSTOM-ID');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].path).toBe('/fulfillment_policy/FUL-CUSTOM-ID');
      });

      it('throws ApiError for non-existent policy', async () => {
        await expect(
          client.getFulfillmentPolicy('NOT-FOUND-ID')
        ).rejects.toThrow(ApiError);
      });
    });

    describe('getFulfillmentPolicies', () => {
      it('retrieves list of fulfillment policies', async () => {
        const result = await client.getFulfillmentPolicies('EBAY_GB');

        expect(result.total).toBe(2);
        expect(result.fulfillmentPolicies).toHaveLength(2);
        expect(result.fulfillmentPolicies?.[0].fulfillmentPolicyId).toBe('FUL-12345678');
      });

      it('sends marketplace_id parameter', async () => {
        await client.getFulfillmentPolicies('EBAY_US');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].body).toMatchObject({
          marketplace_id: 'EBAY_US',
        });
      });
    });

    describe('updateFulfillmentPolicy', () => {
      it('updates a fulfillment policy by ID', async () => {
        const result = await client.updateFulfillmentPolicy('FUL-12345678', {
          name: 'Updated Shipping Policy',
          marketplaceId: 'EBAY_GB',
        });

        expect(result.fulfillmentPolicyId).toBe('FUL-12345678');
      });

      it('sends PUT request with updated data', async () => {
        await client.updateFulfillmentPolicy('FUL-12345678', {
          name: 'New Name',
          marketplaceId: 'EBAY_GB',
          handlingTime: { unit: 'DAY', value: 2 },
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('PUT');
        expect(capturedRequests[0].path).toBe('/fulfillment_policy/FUL-12345678');
        expect(capturedRequests[0].body).toMatchObject({
          name: 'New Name',
          handlingTime: { unit: 'DAY', value: 2 },
        });
      });
    });

    describe('deleteFulfillmentPolicy', () => {
      it('deletes a fulfillment policy by ID', async () => {
        await client.deleteFulfillmentPolicy('FUL-12345678');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('DELETE');
        expect(capturedRequests[0].path).toBe('/fulfillment_policy/FUL-12345678');
      });

      it('throws ApiError for non-existent policy', async () => {
        await expect(
          client.deleteFulfillmentPolicy('NOT-FOUND-ID')
        ).rejects.toThrow(ApiError);
      });
    });
  });

  // ===========================================================================
  // Payment Policy Operations
  // ===========================================================================

  describe('Payment Policy Operations', () => {
    describe('createPaymentPolicy', () => {
      it('creates a payment policy and returns policy ID', async () => {
        const result = await client.createPaymentPolicy({
          name: 'Standard Payment',
          marketplaceId: 'EBAY_GB',
        });

        expect(result.paymentPolicyId).toBe('PAY-NEW-12345');
      });

      it('sends POST request with policy data', async () => {
        await client.createPaymentPolicy({
          name: 'Immediate Payment',
          marketplaceId: 'EBAY_GB',
          immediatePay: true,
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('POST');
        expect(capturedRequests[0].path).toBe('/payment_policy');
        expect(capturedRequests[0].body).toMatchObject({
          name: 'Immediate Payment',
          immediatePay: true,
        });
      });
    });

    describe('getPaymentPolicy', () => {
      it('retrieves a payment policy by ID', async () => {
        const policy = await client.getPaymentPolicy('PAY-12345678');

        expect(policy.paymentPolicyId).toBe('PAY-12345678');
        expect(policy.name).toBe('Standard Payment');
        expect(policy.immediatePay).toBe(true);
      });

      it('throws ApiError for non-existent policy', async () => {
        await expect(
          client.getPaymentPolicy('NOT-FOUND-ID')
        ).rejects.toThrow(ApiError);
      });
    });

    describe('getPaymentPolicies', () => {
      it('retrieves list of payment policies', async () => {
        const result = await client.getPaymentPolicies('EBAY_GB');

        expect(result.total).toBe(2);
        expect(result.paymentPolicies).toHaveLength(2);
        expect(result.paymentPolicies?.[0].paymentPolicyId).toBe('PAY-12345678');
      });
    });

    describe('updatePaymentPolicy', () => {
      it('updates a payment policy by ID', async () => {
        await client.updatePaymentPolicy('PAY-12345678', {
          name: 'Updated Payment Policy',
          marketplaceId: 'EBAY_GB',
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('PUT');
        expect(capturedRequests[0].path).toBe('/payment_policy/PAY-12345678');
      });
    });

    describe('deletePaymentPolicy', () => {
      it('deletes a payment policy by ID', async () => {
        await client.deletePaymentPolicy('PAY-12345678');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('DELETE');
        expect(capturedRequests[0].path).toBe('/payment_policy/PAY-12345678');
      });
    });
  });

  // ===========================================================================
  // Return Policy Operations
  // ===========================================================================

  describe('Return Policy Operations', () => {
    describe('createReturnPolicy', () => {
      it('creates a return policy and returns policy ID', async () => {
        const result = await client.createReturnPolicy({
          name: '30 Day Returns',
          marketplaceId: 'EBAY_GB',
          returnsAccepted: true,
        });

        expect(result.returnPolicyId).toBe('RET-NEW-12345');
      });

      it('sends POST request with policy data', async () => {
        await client.createReturnPolicy({
          name: 'Extended Returns',
          marketplaceId: 'EBAY_GB',
          returnsAccepted: true,
          returnPeriod: { unit: 'DAY', value: 60 },
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('POST');
        expect(capturedRequests[0].path).toBe('/return_policy/');
        expect(capturedRequests[0].body).toMatchObject({
          name: 'Extended Returns',
          returnPeriod: { unit: 'DAY', value: 60 },
        });
      });
    });

    describe('getReturnPolicy', () => {
      it('retrieves a return policy by ID', async () => {
        const policy = await client.getReturnPolicy('RET-12345678');

        expect(policy.returnPolicyId).toBe('RET-12345678');
        expect(policy.name).toBe('Standard Returns');
        expect(policy.returnsAccepted).toBe(true);
        expect(policy.returnPeriod?.value).toBe(30);
      });

      it('throws ApiError for non-existent policy', async () => {
        await expect(
          client.getReturnPolicy('NOT-FOUND-ID')
        ).rejects.toThrow(ApiError);
      });
    });

    describe('getReturnPolicies', () => {
      it('retrieves list of return policies', async () => {
        const result = await client.getReturnPolicies('EBAY_GB');

        expect(result.total).toBe(2);
        expect(result.returnPolicies).toHaveLength(2);
        expect(result.returnPolicies?.[0].returnPolicyId).toBe('RET-12345678');
      });
    });

    describe('updateReturnPolicy', () => {
      it('updates a return policy by ID', async () => {
        await client.updateReturnPolicy('RET-12345678', {
          name: 'Updated Return Policy',
          marketplaceId: 'EBAY_GB',
        });

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('PUT');
        expect(capturedRequests[0].path).toBe('/return_policy/RET-12345678');
      });
    });

    describe('deleteReturnPolicy', () => {
      it('deletes a return policy by ID', async () => {
        await client.deleteReturnPolicy('RET-12345678');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('DELETE');
        expect(capturedRequests[0].path).toBe('/return_policy/RET-12345678');
      });
    });
  });

  // ===========================================================================
  // Privilege Operations
  // ===========================================================================

  describe('Privilege Operations', () => {
    describe('getPrivileges', () => {
      it('retrieves seller privileges', async () => {
        const privileges = await client.getPrivileges();

        expect(privileges.sellerRegistrationCompleted).toBe(true);
        expect(privileges.sellingLimit?.amount?.value).toBe('25000.00');
        expect(privileges.sellingLimit?.quantity).toBe(500);
      });

      it('sends GET request to /privilege', async () => {
        await client.getPrivileges();

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].path).toBe('/privilege');
      });
    });
  });

  // ===========================================================================
  // Error Handling
  // ===========================================================================

  describe('Error Handling', () => {
    it('throws ApiError on 401 unauthorized', async () => {
      server.use(unauthorizedHandler);

      await expect(client.getPrivileges()).rejects.toThrow(ApiError);
    });

    it('includes error details from API response', async () => {
      server.use(unauthorizedHandler);

      try {
        await client.getPrivileges();
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toContain('Access token is invalid');
        expect(apiError.hasErrorCode('1001')).toBe(true);
      }
    });

    it('throws ApiError for invalid policy data', async () => {
      server.use(invalidPolicyHandler);

      await expect(
        client.createFulfillmentPolicy({
          name: '',
          marketplaceId: 'EBAY_GB',
        })
      ).rejects.toThrow(ApiError);
    });

    it('includes invalid policy error details', async () => {
      server.use(invalidPolicyHandler);

      try {
        await client.createFulfillmentPolicy({
          name: '',
          marketplaceId: 'EBAY_GB',
        });
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toContain('invalid');
        expect(apiError.hasErrorCode('25002')).toBe(true);
      }
    });
  });

  // ===========================================================================
  // Client Configuration
  // ===========================================================================

  describe('Client Configuration', () => {
    it('uses sandbox endpoint', () => {
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/sell/account/v1');
    });

    it('reports sandbox mode', () => {
      expect(client.isSandbox()).toBe(true);
    });

    it('uses production endpoint when sandbox=false', () => {
      const prodClient = new AccountClient({
        ...testConfig,
        sandbox: false,
      });
      expect(prodClient.getBaseUrl()).toBe('https://api.ebay.com/sell/account/v1');
    });
  });

  // ===========================================================================
  // Complete Workflows
  // ===========================================================================

  describe('Complete Policy Workflow', () => {
    it('create → get → update → delete fulfillment policy', async () => {
      // Step 1: Create policy
      const createResult = await client.createFulfillmentPolicy({
        name: 'Workflow Shipping',
        marketplaceId: 'EBAY_GB',
        handlingTime: { unit: 'DAY', value: 1 },
      });
      expect(createResult.fulfillmentPolicyId).toBeDefined();

      // Step 2: Get the created policy
      const policy = await client.getFulfillmentPolicy(createResult.fulfillmentPolicyId!);
      expect(policy.name).toBe('Standard UK Shipping');

      // Step 3: Update the policy
      await client.updateFulfillmentPolicy(createResult.fulfillmentPolicyId!, {
        name: 'Updated Shipping',
        marketplaceId: 'EBAY_GB',
        handlingTime: { unit: 'DAY', value: 2 },
      });

      // Step 4: Delete the policy
      await client.deleteFulfillmentPolicy(createResult.fulfillmentPolicyId!);

      // Verify the workflow sequence
      expect(capturedRequests.map((r) => `${r.method} ${r.path}`)).toEqual([
        'POST /fulfillment_policy/',
        'GET /fulfillment_policy/FUL-NEW-12345',
        'PUT /fulfillment_policy/FUL-NEW-12345',
        'DELETE /fulfillment_policy/FUL-NEW-12345',
      ]);
    });

    it('get all policies for a marketplace', async () => {
      // Get all policy types for EBAY_GB
      const [fulfillment, payment, returns] = await Promise.all([
        client.getFulfillmentPolicies('EBAY_GB'),
        client.getPaymentPolicies('EBAY_GB'),
        client.getReturnPolicies('EBAY_GB'),
      ]);

      expect(fulfillment.total).toBe(2);
      expect(payment.total).toBe(2);
      expect(returns.total).toBe(2);

      // Verify all three requests were made
      expect(capturedRequests.map((r) => r.path)).toContain('/fulfillment_policy');
      expect(capturedRequests.map((r) => r.path)).toContain('/payment_policy');
      expect(capturedRequests.map((r) => r.path)).toContain('/return_policy');
    });

    it('check privileges and then create policies', async () => {
      // Step 1: Check if seller can sell
      const privileges = await client.getPrivileges();
      expect(privileges.sellerRegistrationCompleted).toBe(true);

      // Step 2: Create all policy types
      const [fulfillment, payment, returns] = await Promise.all([
        client.createFulfillmentPolicy({
          name: 'Shipping',
          marketplaceId: 'EBAY_GB',
        }),
        client.createPaymentPolicy({
          name: 'Payment',
          marketplaceId: 'EBAY_GB',
        }),
        client.createReturnPolicy({
          name: 'Returns',
          marketplaceId: 'EBAY_GB',
        }),
      ]);

      expect(fulfillment.fulfillmentPolicyId).toBeDefined();
      expect(payment.paymentPolicyId).toBeDefined();
      expect(returns.returnPolicyId).toBeDefined();

      // Verify privileges check came first
      expect(capturedRequests[0].path).toBe('/privilege');
    });
  });
});
