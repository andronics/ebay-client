import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaxonomyClient } from '../../../src/taxonomy/client.js';
import { ApiError } from '../../../src/errors/api-error.js';
import type { TaxonomyClientConfig } from '../../../src/types/config.js';
import * as http from '../../../src/utils/http.js';
import * as fixtures from '../fixtures/taxonomy-responses.js';

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
const validAuthConfig: TaxonomyClientConfig['auth'] = {
  type: 'oauth',
  accessToken: 'test-access-token',
};

const createConfig = (overrides?: Partial<TaxonomyClientConfig>): TaxonomyClientConfig => ({
  sandbox: true,
  auth: validAuthConfig,
  ...overrides,
});

describe('TaxonomyClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('creates client with valid config', () => {
      const client = new TaxonomyClient(createConfig());
      expect(client).toBeInstanceOf(TaxonomyClient);
    });

    it('validates OAuth config - missing access token', () => {
      expect(() => {
        new TaxonomyClient(createConfig({
          auth: { type: 'oauth', accessToken: '' },
        }));
      }).toThrow('OAuth config missing accessToken');
    });

    it('uses sandbox endpoint when sandbox is true', () => {
      const client = new TaxonomyClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toContain('sandbox');
    });

    it('uses production endpoint when sandbox is false', () => {
      const client = new TaxonomyClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).not.toContain('sandbox');
    });
  });

  describe('getBaseUrl', () => {
    it('returns sandbox endpoint', () => {
      const client = new TaxonomyClient(createConfig({ sandbox: true }));
      expect(client.getBaseUrl()).toBe('https://api.sandbox.ebay.com/commerce/taxonomy/v1');
    });

    it('returns production endpoint', () => {
      const client = new TaxonomyClient(createConfig({ sandbox: false }));
      expect(client.getBaseUrl()).toBe('https://api.ebay.com/commerce/taxonomy/v1');
    });
  });

  describe('isSandbox', () => {
    it('returns true for sandbox config', () => {
      const client = new TaxonomyClient(createConfig({ sandbox: true }));
      expect(client.isSandbox()).toBe(true);
    });

    it('returns false for production config', () => {
      const client = new TaxonomyClient(createConfig({ sandbox: false }));
      expect(client.isSandbox()).toBe(false);
    });
  });

  // ===========================================================================
  // Category Tree Operations
  // ===========================================================================

  describe('getDefaultCategoryTreeId', () => {
    it('returns category tree info on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS,
        raw: JSON.stringify(fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getDefaultCategoryTreeId('EBAY_GB');

      expect(result.categoryTreeId).toBe('3');
      expect(result.categoryTreeVersion).toBe('121');
    });

    it('includes marketplace_id parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS,
        raw: JSON.stringify(fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getDefaultCategoryTreeId('EBAY_US');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('marketplace_id=EBAY_US'),
        expect.any(Object)
      );
    });
  });

  describe('getCategoryTree', () => {
    it('returns full category tree on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_TREE_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_TREE_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getCategoryTree('3');

      expect(result.categoryTreeId).toBe('3');
      expect(result.rootCategoryNode?.category?.categoryName).toBe('Root');
      expect(result.applicableMarketplaceIds).toContain('EBAY_GB');
    });

    it('includes Accept-Encoding header for gzip', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_TREE_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_TREE_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCategoryTree('3');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Encoding': 'gzip',
          }),
        })
      );
    });

    it('encodes category tree ID in path', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_TREE_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_TREE_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCategoryTree('100');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/category_tree/100'),
        expect.any(Object)
      );
    });
  });

  describe('getCategorySubtree', () => {
    it('returns category subtree on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_SUBTREE_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_SUBTREE_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getCategorySubtree({
        categoryTreeId: '3',
        categoryId: '9355',
      });

      expect(result.categorySubtreeNode?.category?.categoryId).toBe('9355');
      expect(result.categorySubtreeNode?.childCategoryTreeNodes).toHaveLength(2);
    });

    it('includes category_id parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_SUBTREE_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_SUBTREE_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCategorySubtree({
        categoryTreeId: '3',
        categoryId: '9355',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('category_id=9355'),
        expect.any(Object)
      );
    });
  });

  describe('getCategorySuggestions', () => {
    it('returns category suggestions on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_SUGGESTIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_SUGGESTIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getCategorySuggestions({
        categoryTreeId: '3',
        query: 'iPhone 15 Pro Max',
      });

      expect(result.categorySuggestions).toHaveLength(2);
      expect(result.categorySuggestions?.[0]?.category?.categoryName).toBe('Cell Phones & Smartphones');
    });

    it('includes q parameter with query', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_SUGGESTIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_SUGGESTIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCategorySuggestions({
        categoryTreeId: '3',
        query: 'iPhone',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('q=iPhone'),
        expect.any(Object)
      );
    });

    it('URL encodes query parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_CATEGORY_SUGGESTIONS_SUCCESS,
        raw: JSON.stringify(fixtures.GET_CATEGORY_SUGGESTIONS_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCategorySuggestions({
        categoryTreeId: '3',
        query: 'iPhone 15 Pro',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('q=iPhone+15+Pro'),
        expect.any(Object)
      );
    });
  });

  describe('getExpiredCategories', () => {
    it('returns expired categories on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_EXPIRED_CATEGORIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_EXPIRED_CATEGORIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getExpiredCategories('3');

      expect(result.expiredCategories).toHaveLength(2);
      expect(result.expiredCategories?.[0]?.fromCategoryId).toBe('12345');
      expect(result.expiredCategories?.[0]?.toCategoryId).toBe('67890');
    });

    it('calls correct endpoint', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_EXPIRED_CATEGORIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_EXPIRED_CATEGORIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getExpiredCategories('3');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/category_tree/3/get_expired_categories'),
        expect.any(Object)
      );
    });
  });

  // ===========================================================================
  // Aspect Operations
  // ===========================================================================

  describe('getItemAspectsForCategory', () => {
    it('returns aspects on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ITEM_ASPECTS_FOR_CATEGORY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ITEM_ASPECTS_FOR_CATEGORY_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getItemAspectsForCategory({
        categoryTreeId: '3',
        categoryId: '9355',
      });

      expect(result.aspects).toHaveLength(4);
      expect(result.aspects?.[0]?.localizedAspectName).toBe('Brand');
      expect(result.aspects?.[0]?.aspectConstraint?.aspectRequired).toBe(true);
    });

    it('includes category_id parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_ITEM_ASPECTS_FOR_CATEGORY_SUCCESS,
        raw: JSON.stringify(fixtures.GET_ITEM_ASPECTS_FOR_CATEGORY_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getItemAspectsForCategory({
        categoryTreeId: '3',
        categoryId: '9355',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('category_id=9355'),
        expect.any(Object)
      );
    });

    it('throws ApiError when category not found', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        data: fixtures.API_ERROR_NOT_FOUND,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_FOUND),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await expect(
        client.getItemAspectsForCategory({
          categoryTreeId: '3',
          categoryId: 'invalid',
        })
      ).rejects.toThrow(ApiError);
    });

    it('throws ApiError when category is not a leaf', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: fixtures.API_ERROR_NOT_LEAF_CATEGORY,
        raw: JSON.stringify(fixtures.API_ERROR_NOT_LEAF_CATEGORY),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await expect(
        client.getItemAspectsForCategory({
          categoryTreeId: '3',
          categoryId: '293', // Electronics - not a leaf
        })
      ).rejects.toThrow(ApiError);
    });
  });

  describe('fetchItemAspects', () => {
    it('returns aspects for all categories on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.FETCH_ITEM_ASPECTS_SUCCESS,
        raw: JSON.stringify(fixtures.FETCH_ITEM_ASPECTS_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.fetchItemAspects('3');

      expect(result.categoryAspects).toHaveLength(1);
      expect(result.categoryTreeId).toBe('3');
    });

    it('calls correct endpoint', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.FETCH_ITEM_ASPECTS_SUCCESS,
        raw: JSON.stringify(fixtures.FETCH_ITEM_ASPECTS_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.fetchItemAspects('3');

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('/category_tree/3/fetch_item_aspects'),
        expect.any(Object)
      );
    });
  });

  // ===========================================================================
  // Compatibility Operations
  // ===========================================================================

  describe('getCompatibilityProperties', () => {
    it('returns compatibility properties on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_COMPATIBILITY_PROPERTIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_COMPATIBILITY_PROPERTIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getCompatibilityProperties({
        categoryTreeId: '100',
        categoryId: '6016',
      });

      expect(result.compatibilityProperties).toHaveLength(5);
      expect(result.compatibilityProperties?.[0]?.name).toBe('Year');
      expect(result.compatibilityProperties?.[1]?.name).toBe('Make');
    });

    it('includes category_id parameter', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_COMPATIBILITY_PROPERTIES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_COMPATIBILITY_PROPERTIES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCompatibilityProperties({
        categoryTreeId: '100',
        categoryId: '6016',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('category_id=6016'),
        expect.any(Object)
      );
    });
  });

  describe('getCompatibilityPropertyValues', () => {
    it('returns property values on success', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      const result = await client.getCompatibilityPropertyValues({
        categoryTreeId: '100',
        categoryId: '6016',
        compatibilityProperty: 'Model',
        filter: 'Year:2018,Make:Toyota',
      });

      expect(result.compatibilityPropertyValues).toHaveLength(5);
      expect(result.compatibilityPropertyValues?.[0]?.value).toBe('Camry');
    });

    it('includes all required parameters', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCompatibilityPropertyValues({
        categoryTreeId: '100',
        categoryId: '6016',
        compatibilityProperty: 'Model',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('category_id=6016'),
        expect.any(Object)
      );
      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('compatibility_property=Model'),
        expect.any(Object)
      );
    });

    it('includes filter parameter when provided', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCompatibilityPropertyValues({
        categoryTreeId: '100',
        categoryId: '6016',
        compatibilityProperty: 'Model',
        filter: 'Year:2018,Make:Toyota',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.stringContaining('filter='),
        expect.any(Object)
      );
    });

    it('omits filter parameter when not provided', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        data: fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS,
        raw: JSON.stringify(fixtures.GET_COMPATIBILITY_PROPERTY_VALUES_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getCompatibilityPropertyValues({
        categoryTreeId: '100',
        categoryId: '6016',
        compatibilityProperty: 'Make',
      });

      expect(mockHttpRequest).toHaveBeenCalledWith(
        expect.not.stringContaining('filter='),
        expect.any(Object)
      );
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
        data: fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS,
        raw: JSON.stringify(fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getDefaultCategoryTreeId('EBAY_GB');

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
        data: fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS,
        raw: JSON.stringify(fixtures.GET_DEFAULT_CATEGORY_TREE_ID_SUCCESS),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());
      await client.getDefaultCategoryTreeId('EBAY_GB');

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

      const client = new TaxonomyClient(createConfig());
      await expect(client.getDefaultCategoryTreeId('EBAY_GB')).rejects.toThrow(ApiError);
    });

    it('includes error message from API response', async () => {
      mockHttpRequest.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        data: fixtures.API_ERROR_INVALID_CATEGORY_TREE,
        raw: JSON.stringify(fixtures.API_ERROR_INVALID_CATEGORY_TREE),
        headers: new Headers(),
      });

      const client = new TaxonomyClient(createConfig());

      try {
        await client.getCategoryTree('invalid');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toContain('invalid');
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

      const client = new TaxonomyClient(createConfig());

      try {
        await client.getCategoryTree('999');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).operation).toContain('/category_tree/999');
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

      const client = new TaxonomyClient(createConfig());

      try {
        await client.getDefaultCategoryTreeId('EBAY_GB');
        expect.fail('Should have thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe('Taxonomy API error');
      }
    });
  });
});
