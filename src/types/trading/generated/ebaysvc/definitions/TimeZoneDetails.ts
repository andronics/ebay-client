
/**
 * TimeZoneDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface TimeZoneDetails {
    /** xs:string */
    TimeZoneID?: string;
    /** xs:string */
    StandardLabel?: string;
    /** xs:string */
    StandardOffset?: string;
    /** xs:string */
    DaylightSavingsLabel?: string;
    /** xs:string */
    DaylightSavingsOffset?: string;
    /** xs:boolean */
    DaylightSavingsInEffect?: boolean;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
