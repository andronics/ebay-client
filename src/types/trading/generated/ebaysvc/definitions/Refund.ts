
/**
 * Refund
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Refund {
    /** RefundSourceTypeCodeType|xs:token|StoreCredit,PaymentRefund,CustomCode */
    RefundType?: string;
    /** xs:string */
    RefundTo?: string;
    /** xs:dateTime */
    RefundTime?: Date;
    /** xs:double */
    RefundAmount?: number;
    /** xs:string */
    ReferenceID?: string;
    /** xs:double */
    FeeOrCreditAmount?: number;
}
