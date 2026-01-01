import { SellerShipmentToLogisticsProvider } from './SellerShipmentToLogisticsProvider.js';

/**
 * MultiLegShippingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MultiLegShippingDetails {
    /** SellerShipmentToLogisticsProvider */
    SellerShipmentToLogisticsProvider?: SellerShipmentToLogisticsProvider;
    /** LogisticsProviderShipmentToBuyer */
    LogisticsProviderShipmentToBuyer?: SellerShipmentToLogisticsProvider;
}
