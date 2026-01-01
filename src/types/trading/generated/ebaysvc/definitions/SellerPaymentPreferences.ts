import { RegistrationAddress } from './RegistrationAddress.js';

/**
 * SellerPaymentPreferences
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerPaymentPreferences {
    /** xs:boolean */
    AlwaysUseThisPaymentAddress?: boolean;
    /** DisplayPayNowButtonCodeType|xs:token|ShowPayNowButtonForAllPaymentMethods,ShowPayNowButtonForPayPalOnly,CustomCode */
    DisplayPayNowButton?: string;
    /** xs:boolean */
    PayPalPreferred?: boolean;
    /** xs:string */
    DefaultPayPalEmailAddress?: string;
    /** xs:boolean */
    PayPalAlwaysOn?: boolean;
    /** SellerPaymentAddress */
    SellerPaymentAddress?: RegistrationAddress;
    /** UPSRateOptionCodeType|xs:token|UPSDailyRates,UPSOnDemandRates,CustomCode */
    UPSRateOption?: string;
    /** FedExRateOptionCodeType|xs:token|FedExStandardList,FedExCounter,FedExDiscounted,CustomCode */
    FedExRateOption?: string;
    /** USPSRateOptionCodeType|xs:token|USPSDiscounted,USPSRetail,CustomCode */
    USPSRateOption?: string;
}
