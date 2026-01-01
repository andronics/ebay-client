
/**
 * PaymentDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface PaymentDetails {
    /** xs:int */
    HoursToDeposit?: number;
    /** xs:int */
    DaysToFullPayment?: number;
    /** xs:double */
    DepositAmount?: number;
    /** DepositTypeCodeType|xs:token|None,OtherMethod,FastDeposit,CustomCode */
    DepositType?: string;
}
