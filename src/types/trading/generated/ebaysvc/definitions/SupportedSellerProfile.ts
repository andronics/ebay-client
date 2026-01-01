import { CategoryGroup } from './CategoryGroup.js';

/**
 * SupportedSellerProfile
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SupportedSellerProfile {
    /** xs:long */
    ProfileID?: number;
    /** xs:string */
    ProfileType?: string;
    /** xs:string */
    ProfileName?: string;
    /** xs:string */
    ShortSummary?: string;
    /** CategoryGroup */
    CategoryGroup?: CategoryGroup;
}
