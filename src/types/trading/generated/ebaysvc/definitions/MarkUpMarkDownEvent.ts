
/**
 * MarkUpMarkDownEvent
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MarkUpMarkDownEvent {
    /** MarkUpMarkDownEventTypeCodeType|xs:token|MarkUp,MarkDown,CustomCode */
    Type?: string;
    /** xs:dateTime */
    Time?: Date;
    /** xs:string */
    Reason?: string;
}
