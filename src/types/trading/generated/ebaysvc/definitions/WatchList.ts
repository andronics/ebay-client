import { Pagination } from './Pagination.js';

/**
 * WatchList
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface WatchList {
    /** xs:boolean */
    Include?: boolean;
    /** ListingTypeCodeType|xs:token|Unknown,Chinese,Dutch,Live,Auction,AdType,StoresFixedPrice,PersonalOffer,FixedPriceItem,Half,LeadGeneration,Express,Shopping,CustomCode */
    ListingType?: string;
    /** ItemSortTypeCodeType|xs:token|ItemID,Price,StartPrice,Title,BidCount,Quantity,StartTime,EndTime,SellerUserID,TimeLeft,ListingDuration,ListingType,CurrentPrice,ReservePrice,MaxBid,BidderCount,HighBidderUserID,BuyerUserID,BuyerPostalCode,BuyerEmail,SellerEmail,TotalPrice,WatchCount,BestOfferCount,QuestionCount,ShippingServiceCost,FeedbackReceived,FeedbackLeft,UserID,QuantitySold,BestOffer,QuantityAvailable,QuantityPurchased,WonPlatform,SoldPlatform,ListingDurationDescending,ListingTypeDescending,CurrentPriceDescending,ReservePriceDescending,MaxBidDescending,BidderCountDescending,HighBidderUserIDDescending,BuyerUserIDDescending,BuyerPostalCodeDescending,BuyerEmailDescending,SellerEmailDescending,TotalPriceDescending,WatchCountDescending,QuestionCountDescending,ShippingServiceCostDescending,FeedbackReceivedDescending,FeedbackLeftDescending,UserIDDescending,QuantitySoldDescending,BestOfferCountDescending,QuantityAvailableDescending,QuantityPurchasedDescending,BestOfferDescending,ItemIDDescending,PriceDescending,StartPriceDescending,TitleDescending,BidCountDescending,QuantityDescending,StartTimeDescending,EndTimeDescending,SellerUserIDDescending,TimeLeftDescending,WonPlatformDescending,SoldPlatformDescending,LeadCount,NewLeadCount,LeadCountDescending,NewLeadCountDescending,ClassifiedAdPayPerLeadFee,ClassifiedAdPayPerLeadFeeDescending,CustomCode */
    Sort?: string;
    /** xs:int */
    DurationInDays?: number;
    /** xs:boolean */
    IncludeNotes?: boolean;
    /** Pagination */
    Pagination?: Pagination;
    /** OrderStatusFilterCodeType|xs:token|All,AwaitingPayment,AwaitingShipment,PaidAndShipped,CustomCode */
    OrderStatusFilter?: string;
}
