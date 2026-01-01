
/**
 * CheckoutStatus
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface CheckoutStatus {
    /** PaymentStatusCodeType|xs:token|NoPaymentFailure,BuyerECheckBounced,BuyerCreditCardFailed,BuyerFailedPaymentReportedBySeller,PayPalPaymentInProcess,PaymentInProcess,CustomCode */
    eBayPaymentStatus?: string;
    /** xs:dateTime */
    LastModifiedTime?: Date;
    /** BuyerPaymentMethodCodeType|xs:token|None,MOCC,AmEx,PaymentSeeDescription,CCAccepted,PersonalCheck,COD,VisaMC,PaisaPayAccepted,Other,PayPal,Discover,CashOnPickup,MoneyXferAccepted,MoneyXferAcceptedInCheckout,OtherOnlinePayments,Escrow,PrePayDelivery,CODPrePayDelivery,PostalTransfer,CustomCode,LoanCheck,CashInPerson,ELV,PaisaPayEscrow,PaisaPayEscrowEMI,IntegratedMerchantCreditCard,Moneybookers,Paymate,ProPay,PayOnPickup,Diners,StandardPayment,DirectDebit,CreditCard,PayUponInvoice,QIWI,PayPalCredit */
    PaymentMethod?: string;
    /** CompleteStatusCodeType|xs:token|Incomplete,Complete,Pending,CustomCode */
    Status?: string;
    /** xs:boolean */
    IntegratedMerchantCreditCardEnabled?: boolean;
    /** BuyerPaymentInstrumentCodeType|xs:token|None,CreditCard,BankDirectDebit,PayPal,ELV,LocalPaymentCreditCardOther,LocalPaymentELV,LocalPaymentMasterCard,LocalPaymentAMEX,LocalPaymentVISA,LocalPaymentDiscover,LocalPaymentDinersclub,LocalPaymentJCB,LocalPaymentSWITCH,LocalPaymentSOLO,GIROPAY,BML,PayUponInvoice,CustomCode */
    PaymentInstrument?: string;
}
