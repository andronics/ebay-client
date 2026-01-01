import { Seller } from './Seller.js';
import { ShippingDetails } from './ShippingDetails.js';
import { Item } from './Item.js';
import { Status } from './Status.js';
import { ShippingServiceOptions } from './ShippingServiceOptions.js';
import { FeedbackLeft } from './FeedbackLeft.js';
import { Order } from './Order.js';
import { Variation } from './Variation.js';
import { Taxes } from './Taxes.js';
import { SellerDiscounts } from './SellerDiscounts.js';
import { MultiLegShippingDetails } from './MultiLegShippingDetails.js';
import { MonetaryDetails } from './MonetaryDetails.js';
import { PickupDetails } from './PickupDetails.js';
import { PickupMethodSelected } from './PickupMethodSelected.js';
import { BuyerPackageEnclosures } from './BuyerPackageEnclosures.js';
import { GiftSummary } from './GiftSummary.js';
import { DigitalDeliverySelected } from './DigitalDeliverySelected.js';
import { Program1 } from './Program1.js';
import { LinkedLineItemArray } from './LinkedLineItemArray.js';

/**
 * Transaction
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Transaction {
    /** xs:double */
    AmountPaid?: number;
    /** xs:double */
    AdjustmentAmount?: number;
    /** xs:double */
    ConvertedAdjustmentAmount?: number;
    /** Buyer */
    Buyer?: Seller;
    /** ShippingDetails */
    ShippingDetails?: ShippingDetails;
    /** xs:double */
    ConvertedAmountPaid?: number;
    /** xs:double */
    ConvertedTransactionPrice?: number;
    /** xs:dateTime */
    CreatedDate?: Date;
    /** DepositTypeCodeType|xs:token|None,OtherMethod,FastDeposit,CustomCode */
    DepositType?: string;
    /** Item */
    Item?: Item;
    /** xs:int */
    QuantityPurchased?: number;
    /** Status */
    Status?: Status;
    /** xs:string */
    TransactionID?: string;
    /** xs:double */
    TransactionPrice?: number;
    /** xs:boolean */
    BestOfferSale?: boolean;
    /** xs:decimal */
    VATPercent?: number;
    /** ShippingServiceSelected */
    ShippingServiceSelected?: ShippingServiceOptions;
    /** xs:string */
    BuyerMessage?: string;
    /** PaidStatusCodeType|xs:token|NotPaid,BuyerHasNotCompletedCheckout,PaymentPendingWithPayPal,PaidWithPayPal,MarkedAsPaid,PaymentPendingWithEscrow,PaidWithEscrow,EscrowPaymentCancelled,PaymentPendingWithPaisaPay,PaidWithPaisaPay,PaymentPending,PaymentPendingWithPaisaPayEscrow,PaidWithPaisaPayEscrow,PaisaPayNotPaid,Refunded,WaitingForCODPayment,PaidCOD,CustomCode,Paid,PayUponInvoice */
    BuyerPaidStatus?: string;
    /** PaidStatusCodeType|xs:token|NotPaid,BuyerHasNotCompletedCheckout,PaymentPendingWithPayPal,PaidWithPayPal,MarkedAsPaid,PaymentPendingWithEscrow,PaidWithEscrow,EscrowPaymentCancelled,PaymentPendingWithPaisaPay,PaidWithPaisaPay,PaymentPending,PaymentPendingWithPaisaPayEscrow,PaidWithPaisaPayEscrow,PaisaPayNotPaid,Refunded,WaitingForCODPayment,PaidCOD,CustomCode,Paid,PayUponInvoice */
    SellerPaidStatus?: string;
    /** xs:dateTime */
    PaidTime?: Date;
    /** xs:dateTime */
    ShippedTime?: Date;
    /** xs:double */
    TotalPrice?: number;
    /** FeedbackLeft */
    FeedbackLeft?: FeedbackLeft;
    /** FeedbackReceived */
    FeedbackReceived?: FeedbackLeft;
    /** ContainingOrder */
    ContainingOrder?: Order;
    /** xs:double */
    FinalValueFee?: number;
    /** SiteCodeType|xs:token|US,Canada,UK,Australia,Austria,Belgium_French,France,Germany,Italy,Belgium_Dutch,Netherlands,Spain,Switzerland,Taiwan,eBayMotors,HongKong,Singapore,India,China,Ireland,Malaysia,Philippines,Poland,Sweden,CustomCode,CanadaFrench,Russia,Czechia,Cyprus */
    TransactionSiteID?: string;
    /** TransactionPlatformCodeType|xs:token|eBay,Express,Half,Shopping,WorldOfGood,CustomCode */
    Platform?: string;
    /** Variation */
    Variation?: Variation;
    /** xs:string */
    BuyerCheckoutMessage?: string;
    /** xs:double */
    TotalTransactionPrice?: number;
    /** Taxes */
    Taxes?: Taxes;
    /** xs:boolean */
    BundlePurchase?: boolean;
    /** xs:double */
    ActualShippingCost?: number;
    /** xs:double */
    ActualHandlingCost?: number;
    /** xs:string */
    OrderLineItemID?: string;
    /** xs:string */
    eBayPaymentID?: string;
    /** SellerDiscounts */
    SellerDiscounts?: SellerDiscounts;
    /** xs:string */
    CodiceFiscale?: string;
    /** xs:boolean */
    IsMultiLegShipping?: boolean;
    /** MultiLegShippingDetails */
    MultiLegShippingDetails?: MultiLegShippingDetails;
    /** xs:dateTime */
    InvoiceSentTime?: Date;
    /** xs:boolean */
    IntangibleItem?: boolean;
    /** MonetaryDetails */
    MonetaryDetails?: MonetaryDetails;
    /** PickupDetails */
    PickupDetails?: PickupDetails;
    /** PickupMethodSelected */
    PickupMethodSelected?: PickupMethodSelected;
    /** xs:token */
    LogisticsPlanType?: string;
    /** BuyerPackageEnclosures */
    BuyerPackageEnclosures?: BuyerPackageEnclosures;
    /** xs:string */
    InventoryReservationID?: string;
    /** xs:string */
    ExtendedOrderID?: string;
    /** xs:boolean */
    eBayPlusTransaction?: boolean;
    /** GiftSummary */
    GiftSummary?: GiftSummary;
    /** DigitalDeliverySelected */
    DigitalDeliverySelected?: DigitalDeliverySelected;
    /** xs:boolean */
    Gift?: boolean;
    /** xs:boolean */
    GuaranteedShipping?: boolean;
    /** xs:boolean */
    GuaranteedDelivery?: boolean;
    /** xs:boolean */
    eBayCollectAndRemitTax?: boolean;
    /** eBayCollectAndRemitTaxes */
    eBayCollectAndRemitTaxes?: Taxes;
    /** Program */
    Program?: Program1;
    /** LinkedLineItemArray */
    LinkedLineItemArray?: LinkedLineItemArray;
}
