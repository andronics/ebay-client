import { ShippingPackageInfo } from './ShippingPackageInfo.js';

/**
 * ShippingServiceOptions
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingServiceOptions {
    /** xs:token */
    ShippingService?: string;
    /** xs:double */
    ShippingServiceCost?: number;
    /** xs:double */
    ShippingServiceAdditionalCost?: number;
    /** xs:int */
    ShippingServicePriority?: number;
    /** xs:boolean */
    ExpeditedService?: boolean;
    /** xs:int */
    ShippingTimeMin?: number;
    /** xs:int */
    ShippingTimeMax?: number;
    /** xs:boolean */
    FreeShipping?: boolean;
    /** xs:boolean */
    LocalPickup?: boolean;
    /** xs:double */
    ImportCharge?: number;
    /** ShippingPackageInfo[] */
    ShippingPackageInfo?: Array<ShippingPackageInfo>;
    /** xs:dateTime */
    ShippingServiceCutOffTime?: Date;
    /** xs:string */
    LogisticPlanType?: string;
}
