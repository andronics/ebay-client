/**
 * Taxonomy API module - discover eBay categories and item aspects.
 *
 * @example
 * ```typescript
 * import { TaxonomyClient } from '@andronics/ebay-client/taxonomy';
 *
 * const client = new TaxonomyClient({
 *   sandbox: false,
 *   auth: { type: 'oauth', accessToken: 'token' },
 * });
 *
 * // Get the default category tree for UK
 * const { categoryTreeId } = await client.getDefaultCategoryTreeId('EBAY_GB');
 *
 * // Get category suggestions for an item
 * const suggestions = await client.getCategorySuggestions({
 *   categoryTreeId,
 *   query: 'iPhone 15 Pro Max',
 * });
 *
 * // Get required aspects for a category
 * const aspects = await client.getItemAspectsForCategory({
 *   categoryTreeId,
 *   categoryId: suggestions.categorySuggestions?.[0]?.category?.categoryId!,
 * });
 * ```
 */

export {
  TaxonomyClient,
  type GetCategorySubtreeParams,
  type GetCategorySuggestionsParams,
  type GetItemAspectsForCategoryParams,
  type GetCompatibilityPropertiesParams,
  type GetCompatibilityPropertyValuesParams,
} from './client.js';

// Re-export config types for convenience
export type { TaxonomyClientConfig, OAuthConfig } from '../types/config.js';

// Re-export domain types for convenience
export type {
  // Category Tree types
  MarketplaceId,
  BaseCategoryTree,
  Category,
  CategoryTreeNode,
  CategoryTree,
  CategorySubtree,
  AncestorReference,
  CategorySuggestion,
  CategorySuggestionResponse,
  ExpiredCategory,
  ExpiredCategoriesResponse,
  // Aspect types
  AspectDataType,
  AspectMode,
  AspectUsage,
  ItemToAspectCardinality,
  AspectAdvancedDataType,
  AspectApplicableTo,
  ValueConstraint,
  AspectValue,
  RelevanceIndicator,
  AspectConstraint,
  Aspect,
  AspectMetadata,
  CategoryAspect,
  GetCategoriesAspectResponse,
  // Compatibility types
  CompatibilityProperty,
  GetCompatibilityPropertiesResponse,
  CompatibilityPropertyValue,
  GetCompatibilityPropertyValuesResponse,
} from '../types/taxonomy/index.js';
