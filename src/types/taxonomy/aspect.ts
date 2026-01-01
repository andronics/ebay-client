/**
 * eBay Taxonomy API - Aspect Types
 *
 * Types for item aspects (attributes) used in eBay listings.
 */

/**
 * Aspect data type.
 */
export type AspectDataType =
  | 'DATE'
  | 'NUMBER'
  | 'STRING'
  | 'STRING_ARRAY';

/**
 * How aspect values are entered.
 */
export type AspectMode =
  | 'FREE_TEXT'
  | 'SELECTION_ONLY';

/**
 * Whether the aspect is recommended or optional.
 */
export type AspectUsage =
  | 'RECOMMENDED'
  | 'OPTIONAL';

/**
 * Cardinality of aspect values.
 */
export type ItemToAspectCardinality =
  | 'MULTI'
  | 'SINGLE';

/**
 * Advanced data type requirements.
 */
export type AspectAdvancedDataType = 'NUMERIC_RANGE';

/**
 * Whether aspect applies to product or instance.
 */
export type AspectApplicableTo =
  | 'ITEM'
  | 'PRODUCT';

/**
 * Constraint on when an aspect value is available.
 * Specifies dependencies on other aspect values.
 */
export interface ValueConstraint {
  /** Name of the control aspect this depends on */
  applicableForLocalizedAspectName?: string;
  /** Values of the control aspect that enable this value */
  applicableForLocalizedAspectValues?: string[];
}

/**
 * A valid value for an aspect.
 */
export interface AspectValue {
  /** The localized value */
  localizedValue?: string;
  /** Constraints on when this value is available */
  valueConstraints?: ValueConstraint[];
}

/**
 * Relevance indicator for search popularity.
 * Only available with special permission.
 */
export interface RelevanceIndicator {
  /** Number of searches in the last 30 days */
  searchCount?: number;
}

/**
 * Constraints and metadata about an aspect.
 */
export interface AspectConstraint {
  /** Additional data type requirements (e.g., NUMERIC_RANGE) */
  aspectAdvancedDataType?: AspectAdvancedDataType;
  /** Whether aspect applies to product or item */
  aspectApplicableTo?: AspectApplicableTo[];
  /** The data type of this aspect */
  aspectDataType?: AspectDataType;
  /** Whether this aspect can be used for variations */
  aspectEnabledForVariations?: boolean;
  /** Format hints (e.g., YYYY for dates, int32 for numbers) */
  aspectFormat?: string;
  /** Maximum length for instance aspect values */
  aspectMaxLength?: number;
  /** How values are entered (free text or selection) */
  aspectMode?: AspectMode;
  /** Whether this aspect is required for listings */
  aspectRequired?: boolean;
  /** Whether aspect is recommended or optional */
  aspectUsage?: AspectUsage;
  /** Expected date when aspect becomes required */
  expectedRequiredByDate?: string;
  /** Whether aspect accepts single or multiple values */
  itemToAspectCardinality?: ItemToAspectCardinality;
}

/**
 * An item aspect (attribute) for a category.
 */
export interface Aspect {
  /** Constraints and metadata about this aspect */
  aspectConstraint?: AspectConstraint;
  /** Valid values for this aspect */
  aspectValues?: AspectValue[];
  /** The localized name of this aspect (e.g., "Color", "Size") */
  localizedAspectName?: string;
  /** Search relevance data (requires special permission) */
  relevanceIndicator?: RelevanceIndicator;
}

/**
 * Response from getItemAspectsForCategory.
 */
export interface AspectMetadata {
  /** List of aspects for the category */
  aspects?: Aspect[];
}

/**
 * Category with its aspects.
 * Used in fetchItemAspects response.
 */
export interface CategoryAspect {
  /** Aspects for this category */
  aspects?: Aspect[];
  /** The category details */
  category?: {
    categoryId?: string;
    categoryName?: string;
  };
}

/**
 * Response from fetchItemAspects.
 * Returns aspects for all leaf categories in a marketplace.
 */
export interface GetCategoriesAspectResponse {
  /** Aspects for each leaf category */
  categoryAspects?: CategoryAspect[];
  /** The category tree ID */
  categoryTreeId?: string;
  /** Version of the category tree */
  categoryTreeVersion?: string;
}
