import { DeliveryUrlDetails } from './DeliveryUrlDetails.js';

/**
 * ApplicationDeliveryPreferences
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ApplicationDeliveryPreferences {
    /** xs:anyURI */
    ApplicationURL?: string;
    /** EnableCodeType|xs:token|Enable,Disable,CustomCode */
    ApplicationEnable?: string;
    /** xs:anyURI */
    AlertEmail?: string;
    /** EnableCodeType|xs:token|Enable,Disable,CustomCode */
    AlertEnable?: string;
    /** NotificationPayloadTypeCodeType|xs:token|eBLSchemaSOAP,CustomCode */
    NotificationPayloadType?: string;
    /** DeviceTypeCodeType|xs:token|Platform,SMS,ClientAlerts,CustomCode */
    DeviceType?: string;
    /** xs:string */
    PayloadVersion?: string;
    /** DeliveryURLDetails[] */
    DeliveryURLDetails?: Array<DeliveryUrlDetails>;
}
