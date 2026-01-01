import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { TaxonomyClient } from '../../../src/clients/taxonomy.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { TaxonomyClientConfig } from '../../../src/types/config.js';
import { server } from './setup.js';
import {
  capturedRequests,
  clearCapturedRequests,
  unauthorizedHandler,
} from './handlers/taxonomy.js';

/**
 * Test configuration for Taxonomy API integration tests.
 */
const testConfig: TaxonomyClientConfig = {
  sandbox: true,
  auth: {
    type: 'oauth',
    accessToken: 'test-access-token',
  },
};

describe('Taxonomy API Integration (MSW)', () => {
  let client: TaxonomyClient;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    client = new TaxonomyClient(testConfig);
  });

  afterEach(() => {
    server.resetHandlers();
    clearCapturedRequests();
  });

  afterAll(() => {
    server.close();
  });

  // ===========================================================================
  // Category Tree Operations
  // ===========================================================================

  describe('Category Tree Operations', () => {
    describe('getDefaultCategoryTreeId', () => {
      it('retrieves default category tree ID for a marketplace', async () => {
        const result = await client.getDefaultCategoryTreeId('EBAY_GB');

        expect(result.categoryTreeId).toBe('3');
        expect(result.categoryTreeVersion).toBe('121');
      });

      it('sends marketplace_id parameter', async () => {
        await client.getDefaultCategoryTreeId('EBAY_US');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].path).toBe('/get_default_category_tree_id');
        expect(capturedRequests[0].query?.marketplace_id).toBe('EBAY_US');
      });

      it('sends correct authorization header', async () => {
        await client.getDefaultCategoryTreeId('EBAY_GB');

        const headers = capturedRequests[0].headers;
        expect(headers['authorization']).toBe('Bearer test-access-token');
        expect(headers['content-type']).toBe('application/json');
      });
    });

    describe('getCategoryTree', () => {
      it('retrieves full category tree', async () => {
        const result = await client.getCategoryTree('3');

        expect(result.categoryTreeId).toBe('3');
        expect(result.applicableMarketplaceIds).toContain('EBAY_GB');
        expect(result.rootCategoryNode?.category?.categoryName).toBe('Root');
      });

      it('sends Accept-Encoding header for gzip', async () => {
        await client.getCategoryTree('3');

        const headers = capturedRequests[0].headers;
        expect(headers['accept-encoding']).toBe('gzip');
      });

      it('sends GET request to correct path', async () => {
        await client.getCategoryTree('100');

        expect(capturedRequests).toHaveLength(1);
        expect(capturedRequests[0].method).toBe('GET');
        expect(capturedRequests[0].path).toBe('/category_tree/100');
      });
    });

    describe('getCategorySubtree', () => {
      it('retrieves category subtree', async () => {
        const result = await client.getCategorySubtree({
          categoryTreeId: '3',
          categoryId: '9355',
        });

        expect(result.categorySubtreeNode?.category?.categoryId).toBe('9355');
        expect(result.categorySubtreeNode?.category?.categoryName).toBe('Cell Phones & Smartphones');
        expect(result.categorySubtreeNode?.childCategoryTreeNodes).toHaveLength(2);
      });

      it('sends category_id parameter', async () => {
        await client.getCategorySubtree({
          categoryTreeId: '3',
          categoryId: '15032',
        });

        expect(capturedRequests[0].query?.category_id).toBe('15032');
      });

      it('throws ApiError for non-existent category', async () => {
        await expect(
          client.getCategorySubtree({
            categoryTreeId: '3',
            categoryId: 'NOT-FOUND',
          })
        ).rejects.toThrow(ApiError);
      });
    });

    describe('getCategorySuggestions', () => {
      it('retrieves category suggestions for query', async () => {
        const result = await client.getCategorySuggestions({
          categoryTreeId: '3',
          query: 'iPhone',
        });

        expect(result.categorySuggestions).toHaveLength(2);
        expect(result.categorySuggestions?.[0]?.category?.categoryName).toBe(
          'Cell Phones & Smartphones'
        );
      });

      it('sends query parameter', async () => {
        await client.getCategorySuggestions({
          categoryTreeId: '3',
          query: 'Samsung Galaxy',
        });

        expect(capturedRequests[0].query?.q).toBe('Samsung Galaxy');
      });

      it('includes ancestors in suggestions', async () => {
        const result = await client.getCategorySuggestions({
          categoryTreeId: '3',
          query: 'phone',
        });

        const firstSuggestion = result.categorySuggestions?.[0];
        expect(firstSuggestion?.categoryTreeNodeAncestors).toHaveLength(1);
        expect(firstSuggestion?.categoryTreeNodeAncestors?.[0]?.categoryName).toBe(
          'Cell Phones & Accessories'
        );
      });
    });

    describe('getExpiredCategories', () => {
      it('retrieves expired category mappings', async () => {
        const result = await client.getExpiredCategories('3');

        expect(result.expiredCategories).toHaveLength(2);
        expect(result.expiredCategories?.[0]?.fromCategoryId).toBe('12345');
        expect(result.expiredCategories?.[0]?.toCategoryId).toBe('67890');
      });

      it('sends GET request to correct path', async () => {
        await client.getExpiredCategories('3');

        expect(capturedRequests[0].path).toBe('/category_tree/3/get_expired_categories');
      });
    });
  });

  // ===========================================================================
  // Aspect Operations
  // ===========================================================================

  describe('Aspect Operations', () => {
    describe('getItemAspectsForCategory', () => {
      it('retrieves aspects for a leaf category', async () => {
        const result = await client.getItemAspectsForCategory({
          categoryTreeId: '3',
          categoryId: '9355',
        });

        expect(result.aspects).toHaveLength(3);
        expect(result.aspects?.[0]?.localizedAspectName).toBe('Brand');
        expect(result.aspects?.[0]?.aspectConstraint?.aspectRequired).toBe(true);
      });

      it('sends category_id parameter', async () => {
        await client.getItemAspectsForCategory({
          categoryTreeId: '3',
          categoryId: '9355',
        });

        expect(capturedRequests[0].query?.category_id).toBe('9355');
      });

      it('includes aspect values', async () => {
        const result = await client.getItemAspectsForCategory({
          categoryTreeId: '3',
          categoryId: '9355',
        });

        const brandAspect = result.aspects?.find((a) => a.localizedAspectName === 'Brand');
        expect(brandAspect?.aspectValues).toHaveLength(3);
        expect(brandAspect?.aspectValues?.[0]?.localizedValue).toBe('Apple');
      });

      it('includes aspect constraints', async () => {
        const result = await client.getItemAspectsForCategory({
          categoryTreeId: '3',
          categoryId: '9355',
        });

        const storageAspect = result.aspects?.find(
          (a) => a.localizedAspectName === 'Storage Capacity'
        );
        expect(storageAspect?.aspectConstraint?.aspectEnabledForVariations).toBe(true);
        expect(storageAspect?.aspectConstraint?.aspectRequired).toBe(false);
      });

      it('throws ApiError for non-existent category', async () => {
        await expect(
          client.getItemAspectsForCategory({
            categoryTreeId: '3',
            categoryId: 'NOT-FOUND',
          })
        ).rejects.toThrow(ApiError);
      });

      it('throws ApiError for non-leaf category', async () => {
        await expect(
          client.getItemAspectsForCategory({
            categoryTreeId: '3',
            categoryId: 'NOT-LEAF',
          })
        ).rejects.toThrow(ApiError);
      });
    });

    describe('fetchItemAspects', () => {
      it('retrieves aspects for all categories', async () => {
        const result = await client.fetchItemAspects('3');

        expect(result.categoryTreeId).toBe('3');
        expect(result.categoryAspects).toHaveLength(1);
        expect(result.categoryAspects?.[0]?.category?.categoryId).toBe('9355');
      });

      it('sends GET request to correct path', async () => {
        await client.fetchItemAspects('3');

        expect(capturedRequests[0].path).toBe('/category_tree/3/fetch_item_aspects');
      });
    });
  });

  // ===========================================================================
  // Compatibility Operations
  // ===========================================================================

  describe('Compatibility Operations', () => {
    describe('getCompatibilityProperties', () => {
      it('retrieves compatibility properties for a category', async () => {
        const result = await client.getCompatibilityProperties({
          categoryTreeId: '100',
          categoryId: '6016',
        });

        expect(result.compatibilityProperties).toHaveLength(5);
        expect(result.compatibilityProperties?.[0]?.name).toBe('Year');
        expect(result.compatibilityProperties?.[1]?.name).toBe('Make');
        expect(result.compatibilityProperties?.[2]?.name).toBe('Model');
      });

      it('sends category_id parameter', async () => {
        await client.getCompatibilityProperties({
          categoryTreeId: '100',
          categoryId: '6016',
        });

        expect(capturedRequests[0].query?.category_id).toBe('6016');
      });
    });

    describe('getCompatibilityPropertyValues', () => {
      it('retrieves values for a compatibility property', async () => {
        const result = await client.getCompatibilityPropertyValues({
          categoryTreeId: '100',
          categoryId: '6016',
          compatibilityProperty: 'Model',
        });

        expect(result.compatibilityPropertyValues).toHaveLength(4);
        expect(result.compatibilityPropertyValues?.[0]?.value).toBe('Camry');
      });

      it('sends compatibility_property parameter', async () => {
        await client.getCompatibilityPropertyValues({
          categoryTreeId: '100',
          categoryId: '6016',
          compatibilityProperty: 'Model',
        });

        expect(capturedRequests[0].query?.compatibility_property).toBe('Model');
      });

      it('sends filter parameter when provided', async () => {
        await client.getCompatibilityPropertyValues({
          categoryTreeId: '100',
          categoryId: '6016',
          compatibilityProperty: 'Model',
          filter: 'Year:2018,Make:Toyota',
        });

        expect(capturedRequests[0].query?.filter).toBe('Year:2018,Make:Toyota');
      });
    });
  });

  // ===========================================================================
  // Error Handling
  // ===========================================================================

  describe('Error Handling', () => {
    it('throws ApiError on 401 unauthorized', async () => {
      server.use(unauthorizedHandler);

      await expect(client.getDefaultCategoryTreeId('EBAY_GB')).rejects.toThrow(ApiError);
    });

    it('includes error details from API response', async () => {
      server.use(unauthorizedHandler);

      try {
        await client.getDefaultCategoryTreeId('EBAY_GB');
      } catch (error) {
        const apiError = error as ApiError;
        expect(apiError.message).toContain('Access token is invalid');
        expect(apiError.hasErrorCode('1001')).toBe(true);
      }
    });
  });

  // ===========================================================================
  // Client Configuration
  // ===========================================================================

  describe('Client Configuration', () => {
    it('uses sandbox endpoint', () => {
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/commerce/taxonomy/v1');
    });

    it('reports sandbox mode', () => {
      expect(client.isSandbox()).toBe(true);
    });

    it('uses production endpoint when sandbox=false', () => {
      const prodClient = new TaxonomyClient({
        ...testConfig,
        sandbox: false,
      });
      expect(prodClient.getBaseUrl()).toBe('https://api.ebay.com/commerce/taxonomy/v1');
    });
  });

  // ===========================================================================
  // Complete Workflows
  // ===========================================================================

  describe('Complete Workflows', () => {
    it('find category and get aspects workflow', async () => {
      // Step 1: Get default category tree ID
      const { categoryTreeId } = await client.getDefaultCategoryTreeId('EBAY_GB');
      expect(categoryTreeId).toBe('3');

      // Step 2: Get category suggestions for an item
      const suggestions = await client.getCategorySuggestions({
        categoryTreeId,
        query: 'iPhone 15 Pro Max',
      });
      expect(suggestions.categorySuggestions?.length).toBeGreaterThan(0);

      // Step 3: Get aspects for the suggested category
      const suggestedCategoryId = suggestions.categorySuggestions?.[0]?.category?.categoryId;
      const aspects = await client.getItemAspectsForCategory({
        categoryTreeId,
        categoryId: suggestedCategoryId!,
      });
      expect(aspects.aspects?.length).toBeGreaterThan(0);

      // Verify the request sequence
      expect(capturedRequests.map((r) => r.path)).toEqual([
        '/get_default_category_tree_id',
        '/category_tree/3/get_category_suggestions',
        '/category_tree/3/get_item_aspects_for_category',
      ]);
    });

    it('explore category tree workflow', async () => {
      // Step 1: Get default category tree
      const { categoryTreeId } = await client.getDefaultCategoryTreeId('EBAY_GB');

      // Step 2: Get full category tree (for caching)
      const tree = await client.getCategoryTree(categoryTreeId!);
      expect(tree.rootCategoryNode).toBeDefined();

      // Step 3: Get subtree for a specific category
      const subtree = await client.getCategorySubtree({
        categoryTreeId: categoryTreeId!,
        categoryId: '9355',
      });
      expect(subtree.categorySubtreeNode?.childCategoryTreeNodes?.length).toBeGreaterThan(0);

      // Verify request sequence
      expect(capturedRequests).toHaveLength(3);
    });

    it('vehicle parts compatibility workflow', async () => {
      // Step 1: Get compatibility properties for a parts category
      const properties = await client.getCompatibilityProperties({
        categoryTreeId: '100',
        categoryId: '6016',
      });
      expect(properties.compatibilityProperties?.some((p) => p.name === 'Make')).toBe(true);

      // Step 2: Get all makes
      const makes = await client.getCompatibilityPropertyValues({
        categoryTreeId: '100',
        categoryId: '6016',
        compatibilityProperty: 'Make',
      });
      expect(makes.compatibilityPropertyValues?.length).toBeGreaterThan(0);

      // Step 3: Get models for Toyota 2018
      const models = await client.getCompatibilityPropertyValues({
        categoryTreeId: '100',
        categoryId: '6016',
        compatibilityProperty: 'Model',
        filter: 'Year:2018,Make:Toyota',
      });
      expect(models.compatibilityPropertyValues?.some((v) => v.value === 'Camry')).toBe(true);

      // Verify requests include filter
      const modelRequest = capturedRequests.find((r) =>
        r.path.includes('get_compatibility_property_values') && r.query?.filter
      );
      expect(modelRequest?.query?.filter).toBe('Year:2018,Make:Toyota');
    });
  });
});
