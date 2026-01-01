import { Seller } from './Seller.js';

/**
 * BestOffer
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BestOffer {
    /** BestOfferIDType|xs:string */
    BestOfferID?: string;
    /** xs:dateTime */
    ExpirationTime?: Date;
    /** Buyer */
    Buyer?: Seller;
    /** xs:double */
    Price?: number;
    /** BestOfferStatusCodeType|xs:token|Pending,Accepted,Declined,Expired,Retracted,AdminEnded,Active,Countered,SellerAccept,All,PendingBuyerPayment,PendingBuyerConfirmation,CustomCode */
    Status?: string;
    /** xs:int */
    Quantity?: number;
    /** xs:string */
    BuyerMessage?: string;
    /** xs:string */
    SellerMessage?: string;
    /** BestOfferTypeCodeType|xs:token|BuyerBestOffer,BuyerCounterOffer,SellerCounterOffer,CustomCode */
    BestOfferCodeType?: string;
    /** xs:string */
    CallStatus?: string;
    /** xs:boolean */
    NewBestOffer?: boolean;
    /** xs:boolean */
    ImmediatePayEligible?: boolean;
}
