import { BrandMpn } from './BrandMpn.js';
import { NameValueList } from './NameValueList.js';

/**
 * ProductListingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ProductListingDetails {
    /** xs:boolean */
    IncludeStockPhotoURL?: boolean;
    /** xs:boolean */
    UseStockPhotoURLAsGallery?: boolean;
    /** xs:anyURI */
    StockPhotoURL?: string;
    /** xs:string */
    Copyright?: Array<string>;
    /** xs:string */
    ProductReferenceID?: string;
    /** xs:anyURI */
    DetailsURL?: string;
    /** xs:anyURI */
    ProductDetailsURL?: string;
    /** xs:boolean */
    ReturnSearchResultOnDuplicates?: boolean;
    /** xs:string */
    ISBN?: string;
    /** xs:string */
    UPC?: string;
    /** xs:string */
    EAN?: string;
    /** BrandMPN */
    BrandMPN?: BrandMpn;
    /** xs:boolean */
    UseFirstProduct?: boolean;
    /** xs:boolean */
    IncludeeBayProductDetails?: boolean;
    /** NameValueList[] */
    NameValueList?: Array<NameValueList>;
}
