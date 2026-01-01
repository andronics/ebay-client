import { ServiceCost } from './ServiceCost.js';

/**
 * MotorPurchase
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MotorPurchase {
    /** xs:string */
    Facilitator?: string;
    /** xs:string */
    FacilitatorRefId?: string;
    /** ServiceCost */
    ServiceCost?: ServiceCost;
    /** xs:string */
    BuyerStep?: string;
    /** xs:string */
    SellerStep?: string;
    /** xs:string */
    Status?: string;
}
