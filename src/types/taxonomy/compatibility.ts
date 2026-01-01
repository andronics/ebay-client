/**
 * eBay Taxonomy API - Compatibility Types
 *
 * Types for vehicle parts compatibility (Make, Model, Year, etc.).
 */

/**
 * A compatible vehicle property (e.g., Make, Model, Year, Trim).
 */
export interface CompatibilityProperty {
  /** Localized name of the property */
  localizedName?: string;
  /** Property name as used in API queries */
  name?: string;
}

/**
 * Response from getCompatibilityProperties.
 */
export interface GetCompatibilityPropertiesResponse {
  /** List of compatibility properties for the category */
  compatibilityProperties?: CompatibilityProperty[];
}

/**
 * A value for a compatibility property.
 */
export interface CompatibilityPropertyValue {
  /** The property value (e.g., "Toyota", "Camry", "2018") */
  value?: string;
}

/**
 * Response from getCompatibilityPropertyValues.
 */
export interface GetCompatibilityPropertyValuesResponse {
  /** List of values for the specified property */
  compatibilityPropertyValues?: CompatibilityPropertyValue[];
}
