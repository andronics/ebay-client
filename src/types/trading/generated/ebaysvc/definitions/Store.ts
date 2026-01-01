import { Logo } from './Logo.js';
import { CustomCategories } from './CustomCategories.js';

/**
 * Store
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Store {
    /** xs:string */
    Name?: string;
    /** xs:string */
    URLPath?: string;
    /** xs:anyURI */
    URL?: string;
    /** xs:string */
    Description?: string;
    /** Logo */
    Logo?: Logo;
    /** CustomCategories */
    CustomCategories?: CustomCategories;
    /** MerchDisplayCodeType|xs:token|DefaultTheme,StoreTheme,CustomCode */
    MerchDisplay?: string;
    /** xs:dateTime */
    LastOpenedTime?: Date;
}
