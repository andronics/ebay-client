
/**
 * ShippingServiceCostOverride
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingServiceCostOverride {
    /** xs:int */
    ShippingServicePriority?: number;
    /** ShippingServiceType|xs:token|Domestic,International */
    ShippingServiceType?: string;
    /** xs:double */
    ShippingServiceCost?: number;
    /** xs:double */
    ShippingServiceAdditionalCost?: number;
}
