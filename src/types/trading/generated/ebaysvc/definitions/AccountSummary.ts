import { AdditionalAccount } from './AdditionalAccount.js';
import { NettedTransactionSummary } from './NettedTransactionSummary.js';

/**
 * AccountSummary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AccountSummary {
    /** AccountStateCodeType|xs:token|Active,Pending,Inactive,CustomCode */
    AccountState?: string;
    /** xs:double */
    InvoicePayment?: number;
    /** xs:double */
    InvoiceCredit?: number;
    /** xs:double */
    InvoiceNewFee?: number;
    /** AdditionalAccount[] */
    AdditionalAccount?: Array<AdditionalAccount>;
    /** xs:double */
    AmountPastDue?: number;
    /** xs:string */
    BankAccountInfo?: string;
    /** xs:dateTime */
    BankModifyDate?: Date;
    /** xs:int */
    BillingCycleDate?: number;
    /** xs:dateTime */
    CreditCardExpiration?: Date;
    /** xs:string */
    CreditCardInfo?: string;
    /** xs:dateTime */
    CreditCardModifyDate?: Date;
    /** xs:double */
    CurrentBalance?: number;
    /** xs:double */
    InvoiceBalance?: number;
    /** xs:dateTime */
    InvoiceDate?: Date;
    /** xs:double */
    LastAmountPaid?: number;
    /** xs:dateTime */
    LastPaymentDate?: Date;
    /** xs:boolean */
    PastDue?: boolean;
    /** SellerPaymentMethodCodeType|xs:token|NothingOnFile,CreditCard,PayPal,DirectDebit,DirectDebitPendingSignatureMandate,eBayDirectPay,CustomCode,DirectDebitPendingVerification */
    PaymentMethod?: string;
    /** NettedTransactionSummary */
    NettedTransactionSummary?: NettedTransactionSummary;
}
