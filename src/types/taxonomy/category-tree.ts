/**
 * eBay Taxonomy API - Category Tree Types
 *
 * Types for category trees, nodes, and category suggestions.
 */

/**
 * eBay marketplace ID for Taxonomy API.
 * Used with getDefaultCategoryTreeId.
 */
export type MarketplaceId =
  | 'EBAY_US'
  | 'EBAY_AT'
  | 'EBAY_AU'
  | 'EBAY_BE'
  | 'EBAY_CA'
  | 'EBAY_CH'
  | 'EBAY_DE'
  | 'EBAY_ES'
  | 'EBAY_FR'
  | 'EBAY_GB'
  | 'EBAY_HK'
  | 'EBAY_IE'
  | 'EBAY_IN'
  | 'EBAY_IT'
  | 'EBAY_MY'
  | 'EBAY_NL'
  | 'EBAY_PH'
  | 'EBAY_PL'
  | 'EBAY_SG'
  | 'EBAY_TW'
  | 'EBAY_MOTORS_US';

/**
 * Basic category tree identifier.
 * Returned by getDefaultCategoryTreeId.
 */
export interface BaseCategoryTree {
  /** The unique identifier of the eBay category tree */
  categoryTreeId?: string;
  /** Version of the category tree */
  categoryTreeVersion?: string;
}

/**
 * Basic category information.
 */
export interface Category {
  /** The unique identifier of the category */
  categoryId?: string;
  /** The localized name of the category */
  categoryName?: string;
}

/**
 * A node in the category tree hierarchy.
 */
export interface CategoryTreeNode {
  /** Details about the category at this node */
  category?: Category;
  /** The level of this node in the tree (0 = root) */
  categoryTreeNodeLevel?: number;
  /** Child nodes of this category (recursive) */
  childCategoryTreeNodes?: CategoryTreeNode[];
  /** True if this is a leaf node (no children) */
  leafCategoryTreeNode?: boolean;
  /** URL to get the parent's subtree */
  parentCategoryTreeNodeHref?: string;
}

/**
 * Full category tree structure.
 * Returned by getCategoryTree.
 */
export interface CategoryTree {
  /** Marketplace IDs that use this category tree */
  applicableMarketplaceIds?: string[];
  /** The unique identifier of this category tree */
  categoryTreeId?: string;
  /** Version of the category tree */
  categoryTreeVersion?: string;
  /** Root node of the tree (recursive structure) */
  rootCategoryNode?: CategoryTreeNode;
}

/**
 * A subtree of the category hierarchy.
 * Returned by getCategorySubtree.
 */
export interface CategorySubtree {
  /** The subtree starting from the specified category */
  categorySubtreeNode?: CategoryTreeNode;
  /** The category tree ID this subtree belongs to */
  categoryTreeId?: string;
  /** Version of the category tree */
  categoryTreeVersion?: string;
}

/**
 * Reference to an ancestor category.
 * Used in category suggestions to show the path to root.
 */
export interface AncestorReference {
  /** The unique identifier of the ancestor category */
  categoryId?: string;
  /** The localized name of the ancestor category */
  categoryName?: string;
  /** URL to get the subtree from this ancestor */
  categorySubtreeNodeHref?: string;
  /** Level of this ancestor in the tree (0 = root) */
  categoryTreeNodeLevel?: number;
}

/**
 * A suggested category based on search query.
 */
export interface CategorySuggestion {
  /** Details about the suggested category */
  category?: Category;
  /** Path from this category to the root */
  categoryTreeNodeAncestors?: AncestorReference[];
  /** Level of this category in the tree */
  categoryTreeNodeLevel?: number;
  /** Internal relevancy indicator (reserved) */
  relevancy?: string;
}

/**
 * Response from getCategorySuggestions.
 */
export interface CategorySuggestionResponse {
  /** Array of suggested categories, sorted by relevance */
  categorySuggestions?: CategorySuggestion[];
  /** The category tree ID for these suggestions */
  categoryTreeId?: string;
  /** Version of the category tree */
  categoryTreeVersion?: string;
}

/**
 * Mapping of an expired category to its replacement.
 */
export interface ExpiredCategory {
  /** The expired category ID */
  fromCategoryId?: string;
  /** The replacement category ID */
  toCategoryId?: string;
}

/**
 * Response from getExpiredCategories.
 */
export interface ExpiredCategoriesResponse {
  /** Array of expired category mappings */
  expiredCategories?: ExpiredCategory[];
}
