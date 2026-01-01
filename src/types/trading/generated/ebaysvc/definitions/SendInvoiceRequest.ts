import { BotBlock } from './BotBlock.js';
import { InternationalShippingServiceOption } from './InternationalShippingServiceOption.js';
import { ShippingServiceOptions } from './ShippingServiceOptions.js';
import { SalesTax } from './SalesTax.js';

/** ns:SendInvoiceRequestType */
export interface SendInvoiceRequest {
    /** DetailLevelCodeType|xs:token|ReturnAll,ItemReturnDescription,ItemReturnAttributes,ItemReturnCategories,ReturnSummary,ReturnHeaders,ReturnMessages */
    DetailLevel?: Array<string>;
    /** xs:string */
    ErrorLanguage?: string;
    /** xs:string */
    MessageID?: string;
    /** xs:string */
    Version?: string;
    /** xs:string */
    EndUserIP?: string;
    /** ErrorHandlingCodeType|xs:token|Legacy,BestEffort,AllOrNothing,FailOnError */
    ErrorHandling?: string;
    /** UUIDType|xs:string */
    InvocationID?: string;
    /** xs:string */
    OutputSelector?: Array<string>;
    /** WarningLevelCodeType|xs:token|Low,High */
    WarningLevel?: string;
    /** BotBlock */
    BotBlock?: BotBlock;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:string */
    TransactionID?: string;
    /** OrderIDType|xs:string */
    OrderID?: string;
    /** InternationalShippingServiceOptions[] */
    InternationalShippingServiceOptions?: Array<InternationalShippingServiceOption>;
    /** ShippingServiceOptions[] */
    ShippingServiceOptions?: Array<ShippingServiceOptions>;
    /** SalesTax */
    SalesTax?: SalesTax;
    /** BuyerPaymentMethodCodeType|xs:token|None,MOCC,AmEx,PaymentSeeDescription,CCAccepted,PersonalCheck,COD,VisaMC,PaisaPayAccepted,Other,PayPal,Discover,CashOnPickup,MoneyXferAccepted,MoneyXferAcceptedInCheckout,OtherOnlinePayments,Escrow,PrePayDelivery,CODPrePayDelivery,PostalTransfer,CustomCode,LoanCheck,CashInPerson,ELV,PaisaPayEscrow,PaisaPayEscrowEMI,IntegratedMerchantCreditCard,Moneybookers,Paymate,ProPay,PayOnPickup,Diners,StandardPayment,DirectDebit,CreditCard,PayUponInvoice,QIWI,PayPalCredit */
    PaymentMethods?: Array<string>;
    /** xs:string */
    CheckoutInstructions?: string;
    /** xs:boolean */
    EmailCopyToSeller?: boolean;
    /** SKUType|xs:string */
    SKU?: string;
    /** xs:string */
    OrderLineItemID?: string;
    /** xs:double */
    AdjustmentAmount?: number;
}
