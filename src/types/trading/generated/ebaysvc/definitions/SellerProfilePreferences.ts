import { SupportedSellerProfiles } from './SupportedSellerProfiles.js';

/**
 * SellerProfilePreferences
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerProfilePreferences {
    /** xs:boolean */
    SellerProfileOptedIn?: boolean;
    /** SupportedSellerProfiles */
    SupportedSellerProfiles?: SupportedSellerProfiles;
}
