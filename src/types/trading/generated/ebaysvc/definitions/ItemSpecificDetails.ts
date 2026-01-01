
/**
 * ItemSpecificDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ItemSpecificDetails {
    /** xs:int */
    MaxItemSpecificsPerItem?: number;
    /** xs:int */
    MaxValuesPerName?: number;
    /** xs:int */
    MaxCharactersPerValue?: number;
    /** xs:int */
    MaxCharactersPerName?: number;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
