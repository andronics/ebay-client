import type { TaxonomyClientConfig } from '../types/config.js';
import { BaseRestClient } from '../base/index.js';

import type {
  MarketplaceId,
  BaseCategoryTree,
  CategoryTree,
  CategorySubtree,
  CategorySuggestionResponse,
  AspectMetadata,
  GetCategoriesAspectResponse,
  ExpiredCategoriesResponse,
  GetCompatibilityPropertiesResponse,
  GetCompatibilityPropertyValuesResponse,
} from '../types/taxonomy/index.js';

// ============================================================================
// Parameter Types
// ============================================================================

/**
 * Parameters for getCategorySubtree.
 */
export interface GetCategorySubtreeParams {
  /** The category tree ID */
  categoryTreeId: string;
  /** The category ID to get the subtree from */
  categoryId: string;
}

/**
 * Parameters for getCategorySuggestions.
 */
export interface GetCategorySuggestionsParams {
  /** The category tree ID */
  categoryTreeId: string;
  /** Search query describing the item */
  query: string;
}

/**
 * Parameters for getItemAspectsForCategory.
 */
export interface GetItemAspectsForCategoryParams {
  /** The category tree ID */
  categoryTreeId: string;
  /** The leaf category ID */
  categoryId: string;
}

/**
 * Parameters for getCompatibilityProperties.
 */
export interface GetCompatibilityPropertiesParams {
  /** The category tree ID */
  categoryTreeId: string;
  /** The category ID that supports parts compatibility */
  categoryId: string;
}

/**
 * Parameters for getCompatibilityPropertyValues.
 */
export interface GetCompatibilityPropertyValuesParams {
  /** The category tree ID */
  categoryTreeId: string;
  /** The category ID that supports parts compatibility */
  categoryId: string;
  /** The property to get values for (e.g., 'Make', 'Model', 'Year') */
  compatibilityProperty: string;
  /** Optional filter to narrow results (e.g., 'Year:2018,Make:Toyota') */
  filter?: string;
}

/**
 * API path for the Taxonomy API.
 */
const API_PATH = '/commerce/taxonomy/v1';

// ============================================================================
// Client Class
// ============================================================================

/**
 * Client for eBay Taxonomy API (REST-based).
 *
 * The Taxonomy API provides access to the eBay category tree structure and item
 * aspects (attributes) for listings. It helps sellers find the right category
 * for their items and understand what product attributes are required.
 *
 * @example
 * ```typescript
 * const client = new TaxonomyClient({
 *   sandbox: false,
 *   auth: {
 *     type: 'oauth',
 *     accessToken: 'your-access-token',
 *   },
 * });
 *
 * // Get the default category tree ID for a marketplace
 * const { categoryTreeId } = await client.getDefaultCategoryTreeId('EBAY_GB');
 *
 * // Get category suggestions for an item
 * const suggestions = await client.getCategorySuggestions({
 *   categoryTreeId,
 *   query: 'iPhone 15 Pro Max 256GB',
 * });
 *
 * // Get aspects (attributes) for a category
 * const aspects = await client.getItemAspectsForCategory({
 *   categoryTreeId,
 *   categoryId: '9355', // Cell Phones & Smartphones
 * });
 * ```
 */
export class TaxonomyClient extends BaseRestClient<TaxonomyClientConfig> {
  constructor(config: TaxonomyClientConfig) {
    super(config, API_PATH);
  }

  // ===========================================================================
  // Category Tree Operations
  // ===========================================================================

  /**
   * Get the default category tree ID for a marketplace.
   *
   * @param marketplaceId - The eBay marketplace ID (e.g., 'EBAY_GB', 'EBAY_US')
   */
  async getDefaultCategoryTreeId(marketplaceId: MarketplaceId | string): Promise<BaseCategoryTree> {
    const path = `/get_default_category_tree_id?marketplace_id=${encodeURIComponent(marketplaceId)}`;
    return this.request<BaseCategoryTree>('GET', path);
  }

  /**
   * Get the complete category tree for a marketplace.
   *
   * Note: This can return a very large payload. Consider using getCategorySubtree
   * for more targeted queries.
   *
   * @param categoryTreeId - The category tree ID
   */
  async getCategoryTree(categoryTreeId: string): Promise<CategoryTree> {
    const path = `/category_tree/${encodeURIComponent(categoryTreeId)}`;
    return this.request<CategoryTree>('GET', path, {
      headers: { 'Accept-Encoding': 'gzip' },
    });
  }

  /**
   * Get a subtree of the category hierarchy starting from a specific category.
   *
   * @param params - Category tree ID and starting category ID
   */
  async getCategorySubtree(params: GetCategorySubtreeParams): Promise<CategorySubtree> {
    const queryParams = new URLSearchParams({
      category_id: params.categoryId,
    });
    const path = `/category_tree/${encodeURIComponent(params.categoryTreeId)}/get_category_subtree?${queryParams}`;
    return this.request<CategorySubtree>('GET', path, {
      headers: { 'Accept-Encoding': 'gzip' },
    });
  }

  /**
   * Get category suggestions based on a search query.
   *
   * Returns categories that best match the provided keywords, sorted by relevance.
   *
   * Note: This method does not work properly in sandbox - it returns random category names.
   *
   * @param params - Category tree ID and search query
   */
  async getCategorySuggestions(
    params: GetCategorySuggestionsParams
  ): Promise<CategorySuggestionResponse> {
    const queryParams = new URLSearchParams({
      q: params.query,
    });
    const path = `/category_tree/${encodeURIComponent(params.categoryTreeId)}/get_category_suggestions?${queryParams}`;
    return this.request<CategorySuggestionResponse>('GET', path);
  }

  /**
   * Get expired category mappings.
   *
   * Returns mappings of expired leaf categories to their replacement categories.
   *
   * @param categoryTreeId - The category tree ID
   */
  async getExpiredCategories(categoryTreeId: string): Promise<ExpiredCategoriesResponse> {
    const path = `/category_tree/${encodeURIComponent(categoryTreeId)}/get_expired_categories`;
    return this.request<ExpiredCategoriesResponse>('GET', path);
  }

  // ===========================================================================
  // Aspect Operations
  // ===========================================================================

  /**
   * Get item aspects for a specific leaf category.
   *
   * Returns the aspects (attributes) that are required or recommended when
   * listing items in the specified category.
   *
   * @param params - Category tree ID and leaf category ID
   */
  async getItemAspectsForCategory(params: GetItemAspectsForCategoryParams): Promise<AspectMetadata> {
    const queryParams = new URLSearchParams({
      category_id: params.categoryId,
    });
    const path = `/category_tree/${encodeURIComponent(params.categoryTreeId)}/get_item_aspects_for_category?${queryParams}`;
    return this.request<AspectMetadata>('GET', path);
  }

  /**
   * Fetch all item aspects for all leaf categories in a category tree.
   *
   * Note: This returns a very large gzipped payload (can be over 100 MB).
   * The response is returned as binary data and needs to be decompressed.
   *
   * @param categoryTreeId - The category tree ID
   */
  async fetchItemAspects(categoryTreeId: string): Promise<GetCategoriesAspectResponse> {
    const path = `/category_tree/${encodeURIComponent(categoryTreeId)}/fetch_item_aspects`;
    return this.request<GetCategoriesAspectResponse>('GET', path);
  }

  // ===========================================================================
  // Compatibility Operations (Vehicle Parts)
  // ===========================================================================

  /**
   * Get compatibility properties for a category.
   *
   * Returns vehicle compatibility properties (Make, Model, Year, etc.) for
   * categories that support parts compatibility.
   *
   * @param params - Category tree ID and category ID
   */
  async getCompatibilityProperties(
    params: GetCompatibilityPropertiesParams
  ): Promise<GetCompatibilityPropertiesResponse> {
    const queryParams = new URLSearchParams({
      category_id: params.categoryId,
    });
    const path = `/category_tree/${encodeURIComponent(params.categoryTreeId)}/get_compatibility_properties?${queryParams}`;
    return this.request<GetCompatibilityPropertiesResponse>('GET', path);
  }

  /**
   * Get values for a compatibility property.
   *
   * Returns values for a specific vehicle compatibility property, optionally
   * filtered by other property values.
   *
   * @example
   * ```typescript
   * // Get all Toyota models for 2018
   * const models = await client.getCompatibilityPropertyValues({
   *   categoryTreeId: '100',
   *   categoryId: '6016',
   *   compatibilityProperty: 'Model',
   *   filter: 'Year:2018,Make:Toyota',
   * });
   * ```
   *
   * @param params - Category tree ID, category ID, property name, and optional filter
   */
  async getCompatibilityPropertyValues(
    params: GetCompatibilityPropertyValuesParams
  ): Promise<GetCompatibilityPropertyValuesResponse> {
    const queryParams = new URLSearchParams({
      category_id: params.categoryId,
      compatibility_property: params.compatibilityProperty,
    });
    if (params.filter) {
      queryParams.set('filter', params.filter);
    }
    const path = `/category_tree/${encodeURIComponent(params.categoryTreeId)}/get_compatibility_property_values?${queryParams}`;
    return this.request<GetCompatibilityPropertyValuesResponse>('GET', path);
  }
}
