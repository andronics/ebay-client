
/**
 * BestOfferDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BestOfferDetails {
    /** xs:int */
    BestOfferCount?: number;
    /** xs:boolean */
    BestOfferEnabled?: boolean;
    /** xs:double */
    BestOffer?: number;
    /** BestOfferStatusCodeType|xs:token|Pending,Accepted,Declined,Expired,Retracted,AdminEnded,Active,Countered,SellerAccept,All,PendingBuyerPayment,PendingBuyerConfirmation,CustomCode */
    BestOfferStatus?: string;
    /** BestOfferTypeCodeType|xs:token|BuyerBestOffer,BuyerCounterOffer,SellerCounterOffer,CustomCode */
    BestOfferType?: string;
    /** xs:boolean */
    NewBestOffer?: boolean;
}
