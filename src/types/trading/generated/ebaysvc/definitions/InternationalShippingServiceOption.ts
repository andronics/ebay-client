
/**
 * InternationalShippingServiceOption
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface InternationalShippingServiceOption {
    /** xs:token */
    ShippingService?: string;
    /** xs:double */
    ShippingServiceCost?: number;
    /** xs:double */
    ShippingServiceAdditionalCost?: number;
    /** xs:int */
    ShippingServicePriority?: number;
    /** xs:string */
    ShipToLocation?: Array<string>;
    /** xs:double */
    ImportCharge?: number;
    /** xs:dateTime */
    ShippingServiceCutOffTime?: Date;
}
