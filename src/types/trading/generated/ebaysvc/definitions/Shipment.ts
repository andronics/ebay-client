import { ShipmentTrackingDetails } from './ShipmentTrackingDetails.js';

/**
 * Shipment
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Shipment {
    /** xs:dateTime */
    ShippedTime?: Date;
    /** ShipmentTrackingDetails[] */
    ShipmentTrackingDetails?: Array<ShipmentTrackingDetails>;
}
