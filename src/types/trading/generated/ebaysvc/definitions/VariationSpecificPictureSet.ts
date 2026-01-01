import { ExtendedPictureDetails } from './ExtendedPictureDetails.js';

/**
 * VariationSpecificPictureSet
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface VariationSpecificPictureSet {
    /** xs:string */
    VariationSpecificValue?: string;
    /** xs:anyURI */
    PictureURL?: Array<string>;
    /** xs:anyURI */
    ExternalPictureURL?: Array<string>;
    /** ExtendedPictureDetails */
    ExtendedPictureDetails?: ExtendedPictureDetails;
}
