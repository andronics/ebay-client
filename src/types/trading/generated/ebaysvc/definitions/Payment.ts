
/**
 * Payment
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Payment {
    /** xs:string */
    Payer?: string;
    /** xs:string */
    Payee?: string;
    /** xs:dateTime */
    PaymentTime?: Date;
    /** xs:double */
    PaymentAmount?: number;
    /** xs:string */
    ReferenceID?: string;
    /** xs:double */
    FeeOrCreditAmount?: number;
    /** xs:string */
    PaymentReferenceID?: Array<string>;
}
