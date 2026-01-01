
/**
 * DiscountProfile
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DiscountProfile {
    /** xs:string */
    DiscountProfileID?: string;
    /** xs:string */
    DiscountProfileName?: string;
    /** xs:double */
    EachAdditionalAmount?: number;
    /** xs:double */
    EachAdditionalAmountOff?: number;
    /** xs:float */
    EachAdditionalPercentOff?: number;
    /** xs:decimal */
    WeightOff?: number;
    /** xs:string */
    MappedDiscountProfileID?: string;
}
