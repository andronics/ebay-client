
/**
 * Status
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Status {
    /** PaymentStatusCodeType|xs:token|NoPaymentFailure,BuyerECheckBounced,BuyerCreditCardFailed,BuyerFailedPaymentReportedBySeller,PayPalPaymentInProcess,PaymentInProcess,CustomCode */
    eBayPaymentStatus?: string;
    /** CheckoutStatusCodeType|xs:token|CheckoutComplete,CheckoutIncomplete,BuyerRequestsTotal,SellerResponded,CustomCode */
    CheckoutStatus?: string;
    /** xs:dateTime */
    LastTimeModified?: Date;
    /** BuyerPaymentMethodCodeType|xs:token|None,MOCC,AmEx,PaymentSeeDescription,CCAccepted,PersonalCheck,COD,VisaMC,PaisaPayAccepted,Other,PayPal,Discover,CashOnPickup,MoneyXferAccepted,MoneyXferAcceptedInCheckout,OtherOnlinePayments,Escrow,PrePayDelivery,CODPrePayDelivery,PostalTransfer,CustomCode,LoanCheck,CashInPerson,ELV,PaisaPayEscrow,PaisaPayEscrowEMI,IntegratedMerchantCreditCard,Moneybookers,Paymate,ProPay,PayOnPickup,Diners,StandardPayment,DirectDebit,CreditCard,PayUponInvoice,QIWI,PayPalCredit */
    PaymentMethodUsed?: string;
    /** CompleteStatusCodeType|xs:token|Incomplete,Complete,Pending,CustomCode */
    CompleteStatus?: string;
    /** xs:boolean */
    BuyerSelectedShipping?: boolean;
    /** PaymentHoldStatusCodeType|xs:token|PaymentReview,MerchantHold,Released,None,NewSellerHold,PaymentHold,ReleasePending,ReleaseConfirmed,ReleaseFailed,CustomCode */
    PaymentHoldStatus?: string;
    /** InquiryStatusCodeType|xs:token|Invalid,NotApplicable,TrackInquiryPendingBuyerResponse,TrackInquiryPendingSellerResponse,TrackInquiryClosedWithRefund,TrackInquiryClosedNoRefund,TrackInquiryEscalatedPendingBuyer,TrackInquiryEscalatedPendingSeller,TrackInquiryEscalatedPendingCS,TrackInquiryEscalatedClosedWithRefund,TrackInquiryEscalatedClosedNoRefund,CustomCode */
    InquiryStatus?: string;
    /** ReturnStatusCodeType|xs:token|Invalid,NotApplicable,ReturnRequestPendingApproval,ReturnRequestRejected,ReturnOpen,ReturnShipped,ReturnDelivered,ReturnClosedWithRefund,ReturnClosedEscalated,ReturnClosedNoRefund,ReturnEscalatedPendingBuyer,ReturnEscalatedPendingSeller,ReturnEscalatedPendingCS,ReturnEscalatedClosedWithRefund,ReturnEscalatedClosedNoRefund,ReturnEscalated,ReturnRequestPending,ReturnRequestClosedWithRefund,ReturnRequestClosedNoRefund,CustomCode */
    ReturnStatus?: string;
    /** BuyerPaymentInstrumentCodeType|xs:token|None,CreditCard,BankDirectDebit,PayPal,ELV,LocalPaymentCreditCardOther,LocalPaymentELV,LocalPaymentMasterCard,LocalPaymentAMEX,LocalPaymentVISA,LocalPaymentDiscover,LocalPaymentDinersclub,LocalPaymentJCB,LocalPaymentSWITCH,LocalPaymentSOLO,GIROPAY,BML,PayUponInvoice,CustomCode */
    PaymentInstrument?: string;
    /** DigitalStatusCodeType|xs:token|Inactive,Activated,Downloaded,Deactivated,CustomCode */
    DigitalStatus?: string;
    /** CancelStatusCodeType|xs:token|Invalid,NotApplicable,CancelRequested,CancelPending,CancelRejected,CancelClosedNoRefund,CancelClosedWithRefund,CancelClosedUnknownRefund,CancelClosedForCommitment,CancelComplete,CancelFailed,CustomCode */
    CancelStatus?: string;
}
