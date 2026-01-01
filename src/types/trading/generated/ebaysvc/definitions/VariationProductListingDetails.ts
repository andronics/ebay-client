import { NameValueList } from './NameValueList.js';

/**
 * VariationProductListingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface VariationProductListingDetails {
    /** xs:string */
    ISBN?: string;
    /** xs:string */
    UPC?: string;
    /** xs:string */
    EAN?: string;
    /** xs:string */
    ProductReferenceID?: string;
    /** NameValueList[] */
    NameValueList?: Array<NameValueList>;
}
