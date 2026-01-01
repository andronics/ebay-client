import { NameValueList } from './NameValueList.js';

/**
 * Compatibility
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Compatibility {
    /** xs:boolean */
    Delete?: boolean;
    /** NameValueList[] */
    NameValueList?: Array<NameValueList>;
    /** xs:string */
    CompatibilityNotes?: string;
}
