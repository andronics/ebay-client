import { ShipmentLineItem } from './ShipmentLineItem.js';

/**
 * ShipmentTrackingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShipmentTrackingDetails {
    /** xs:string */
    ShippingCarrierUsed?: string;
    /** xs:string */
    ShipmentTrackingNumber?: string;
    /** ShipmentLineItem */
    ShipmentLineItem?: ShipmentLineItem;
}
