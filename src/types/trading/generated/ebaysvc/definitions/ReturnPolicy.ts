
/**
 * ReturnPolicy
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ReturnPolicy {
    /** xs:token */
    RefundOption?: string;
    /** xs:string */
    Refund?: string;
    /** xs:token */
    ReturnsWithinOption?: string;
    /** xs:string */
    ReturnsWithin?: string;
    /** xs:token */
    ReturnsAcceptedOption?: string;
    /** xs:string */
    ReturnsAccepted?: string;
    /** xs:string */
    Description?: string;
    /** xs:token */
    ShippingCostPaidByOption?: string;
    /** xs:string */
    ShippingCostPaidBy?: string;
    /** xs:token */
    InternationalRefundOption?: string;
    /** xs:token */
    InternationalReturnsAcceptedOption?: string;
    /** xs:token */
    InternationalReturnsWithinOption?: string;
    /** xs:token */
    InternationalShippingCostPaidByOption?: string;
}
