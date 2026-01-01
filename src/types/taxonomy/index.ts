// Category Tree types
export type {
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
} from './category-tree.js';

// Aspect types
export type {
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
} from './aspect.js';

// Compatibility types
export type {
  CompatibilityProperty,
  GetCompatibilityPropertiesResponse,
  CompatibilityPropertyValue,
  GetCompatibilityPropertyValuesResponse,
} from './compatibility.js';

// Full OpenAPI-generated types (for reference during development)
// These provide complete eBay Taxonomy API schema coverage
export * as Generated from './generated/index.js';
