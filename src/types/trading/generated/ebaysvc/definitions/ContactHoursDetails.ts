
/**
 * ContactHoursDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ContactHoursDetails {
    /** xs:string */
    TimeZoneID?: string;
    /** DaysCodeType|xs:token|None,EveryDay,Weekdays,Weekends,CustomCode */
    Hours1Days?: string;
    /** xs:boolean */
    Hours1AnyTime?: boolean;
    /** xs:time */
    Hours1From?: string;
    /** xs:time */
    Hours1To?: string;
    /** DaysCodeType|xs:token|None,EveryDay,Weekdays,Weekends,CustomCode */
    Hours2Days?: string;
    /** xs:boolean */
    Hours2AnyTime?: boolean;
    /** xs:time */
    Hours2From?: string;
    /** xs:time */
    Hours2To?: string;
}
