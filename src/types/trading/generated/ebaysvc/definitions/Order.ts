import { CheckoutStatus } from './CheckoutStatus.js';
import { ShippingDetails } from './ShippingDetails.js';
import { RegistrationAddress } from './RegistrationAddress.js';
import { ShippingServiceOptions } from './ShippingServiceOptions.js';
import { TransactionArray } from './TransactionArray.js';
import { MultiLegShippingDetails } from './MultiLegShippingDetails.js';
import { MonetaryDetails } from './MonetaryDetails.js';
import { PickupDetails } from './PickupDetails.js';
import { PickupMethodSelected } from './PickupMethodSelected.js';
import { BuyerTaxIdentifier } from './BuyerTaxIdentifier.js';
import { BuyerPackageEnclosures } from './BuyerPackageEnclosures.js';

/**
 * Order
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Order {
    /** OrderIDType|xs:string */
    OrderID?: string;
    /** OrderStatusCodeType|xs:token|Active,Inactive,Completed,Cancelled,Shipped,Default,Authenticated,InProcess,Invalid,CustomCode,All,CancelPending */
    OrderStatus?: string;
    /** xs:double */
    AdjustmentAmount?: number;
    /** xs:double */
    AmountPaid?: number;
    /** xs:double */
    AmountSaved?: number;
    /** CheckoutStatus */
    CheckoutStatus?: CheckoutStatus;
    /** ShippingDetails */
    ShippingDetails?: ShippingDetails;
    /** TradingRoleCodeType|xs:token|Buyer,Seller,CustomCode */
    CreatingUserRole?: string;
    /** xs:dateTime */
    CreatedTime?: Date;
    /** BuyerPaymentMethodCodeType|xs:token|None,MOCC,AmEx,PaymentSeeDescription,CCAccepted,PersonalCheck,COD,VisaMC,PaisaPayAccepted,Other,PayPal,Discover,CashOnPickup,MoneyXferAccepted,MoneyXferAcceptedInCheckout,OtherOnlinePayments,Escrow,PrePayDelivery,CODPrePayDelivery,PostalTransfer,CustomCode,LoanCheck,CashInPerson,ELV,PaisaPayEscrow,PaisaPayEscrowEMI,IntegratedMerchantCreditCard,Moneybookers,Paymate,ProPay,PayOnPickup,Diners,StandardPayment,DirectDebit,CreditCard,PayUponInvoice,QIWI,PayPalCredit */
    PaymentMethods?: Array<string>;
    /** xs:string */
    SellerEmail?: string;
    /** ShippingAddress */
    ShippingAddress?: RegistrationAddress;
    /** ShippingServiceSelected */
    ShippingServiceSelected?: ShippingServiceOptions;
    /** xs:double */
    Subtotal?: number;
    /** xs:double */
    Total?: number;
    /** TransactionArray */
    TransactionArray?: TransactionArray;
    /** UserIDType|xs:string */
    BuyerUserID?: string;
    /** xs:dateTime */
    PaidTime?: Date;
    /** xs:dateTime */
    ShippedTime?: Date;
    /** xs:boolean */
    BundlePurchase?: boolean;
    /** xs:string */
    BuyerCheckoutMessage?: string;
    /** xs:string */
    EIASToken?: string;
    /** PaymentHoldStatusCodeType|xs:token|PaymentReview,MerchantHold,Released,None,NewSellerHold,PaymentHold,ReleasePending,ReleaseConfirmed,ReleaseFailed,CustomCode */
    PaymentHoldStatus?: string;
    /** xs:double */
    RefundAmount?: number;
    /** xs:string */
    RefundStatus?: string;
    /** xs:boolean */
    IsMultiLegShipping?: boolean;
    /** MultiLegShippingDetails */
    MultiLegShippingDetails?: MultiLegShippingDetails;
    /** MonetaryDetails */
    MonetaryDetails?: MonetaryDetails;
    /** PickupDetails */
    PickupDetails?: PickupDetails;
    /** PickupMethodSelected */
    PickupMethodSelected?: PickupMethodSelected;
    /** UserIDType|xs:string */
    SellerUserID?: string;
    /** xs:string */
    SellerEIASToken?: string;
    /** xs:token */
    CancelReason?: string;
    /** CancelStatusCodeType|xs:token|Invalid,NotApplicable,CancelRequested,CancelPending,CancelRejected,CancelClosedNoRefund,CancelClosedWithRefund,CancelClosedUnknownRefund,CancelClosedForCommitment,CancelComplete,CancelFailed,CustomCode */
    CancelStatus?: string;
    /** xs:token */
    LogisticsPlanType?: string;
    /** BuyerTaxIdentifier[] */
    BuyerTaxIdentifier?: Array<BuyerTaxIdentifier>;
    /** BuyerPackageEnclosures */
    BuyerPackageEnclosures?: BuyerPackageEnclosures;
    /** xs:string */
    ExtendedOrderID?: string;
    /** xs:boolean */
    ContainseBayPlusTransaction?: boolean;
    /** xs:boolean */
    eBayCollectAndRemitTax?: boolean;
    /** xs:long */
    OrderLineItemCount?: number;
}
