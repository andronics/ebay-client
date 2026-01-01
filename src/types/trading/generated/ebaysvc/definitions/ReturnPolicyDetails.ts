import { Refund1 } from './Refund1.js';
import { ReturnsWithin } from './ReturnsWithin.js';
import { ReturnsAccepted } from './ReturnsAccepted.js';
import { ShippingCostPaidBy } from './ShippingCostPaidBy.js';
import { RestockingFeeValue } from './RestockingFeeValue.js';

/**
 * ReturnPolicyDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ReturnPolicyDetails {
    /** Refund[] */
    Refund?: Array<Refund1>;
    /** ReturnsWithin[] */
    ReturnsWithin?: Array<ReturnsWithin>;
    /** ReturnsAccepted[] */
    ReturnsAccepted?: Array<ReturnsAccepted>;
    /** xs:boolean */
    Description?: boolean;
    /** ShippingCostPaidBy[] */
    ShippingCostPaidBy?: Array<ShippingCostPaidBy>;
    /** RestockingFeeValue[] */
    RestockingFeeValue?: Array<RestockingFeeValue>;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
