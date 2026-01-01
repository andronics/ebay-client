import { VariationSpecificPictureSet } from './VariationSpecificPictureSet.js';

/**
 * Pictures
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Pictures {
    /** xs:string */
    VariationSpecificName?: string;
    /** VariationSpecificPictureSet[] */
    VariationSpecificPictureSet?: Array<VariationSpecificPictureSet>;
}
