import { Condition } from './Condition.js';

/**
 * ConditionValues
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ConditionValues {
    /** Condition[] */
    Condition?: Array<Condition>;
    /** xs:anyURI */
    ConditionHelpURL?: string;
}
