import { Compatibility } from './Compatibility.js';

/**
 * ItemCompatibilityList
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ItemCompatibilityList {
    /** Compatibility[] */
    Compatibility?: Array<Compatibility>;
    /** xs:boolean */
    ReplaceAll?: boolean;
}
