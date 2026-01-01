
/**
 * DeprecationDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DeprecationDetails {
    /** xs:dateTime */
    AnnouncementStartTime?: Date;
    /** xs:dateTime */
    EventTime?: Date;
    /** AnnouncementMessageCodeType|xs:token|None,Deprecation,Mapping,DeprecationAndMapping,CustomCode */
    MessageType?: string;
}
