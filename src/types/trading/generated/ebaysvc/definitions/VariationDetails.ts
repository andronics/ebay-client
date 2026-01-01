
/**
 * VariationDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface VariationDetails {
    /** xs:int */
    MaxVariationsPerItem?: number;
    /** xs:int */
    MaxNamesPerVariationSpecificsSet?: number;
    /** xs:int */
    MaxValuesPerVariationSpecificsSetName?: number;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
