import { BotBlock } from './BotBlock.js';
import { Pagination } from './Pagination.js';

/** ns:GetItemsAwaitingFeedbackRequestType */
export interface GetItemsAwaitingFeedbackRequest {
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
    /** ItemSortTypeCodeType|xs:token|ItemID,Price,StartPrice,Title,BidCount,Quantity,StartTime,EndTime,SellerUserID,TimeLeft,ListingDuration,ListingType,CurrentPrice,ReservePrice,MaxBid,BidderCount,HighBidderUserID,BuyerUserID,BuyerPostalCode,BuyerEmail,SellerEmail,TotalPrice,WatchCount,BestOfferCount,QuestionCount,ShippingServiceCost,FeedbackReceived,FeedbackLeft,UserID,QuantitySold,BestOffer,QuantityAvailable,QuantityPurchased,WonPlatform,SoldPlatform,ListingDurationDescending,ListingTypeDescending,CurrentPriceDescending,ReservePriceDescending,MaxBidDescending,BidderCountDescending,HighBidderUserIDDescending,BuyerUserIDDescending,BuyerPostalCodeDescending,BuyerEmailDescending,SellerEmailDescending,TotalPriceDescending,WatchCountDescending,QuestionCountDescending,ShippingServiceCostDescending,FeedbackReceivedDescending,FeedbackLeftDescending,UserIDDescending,QuantitySoldDescending,BestOfferCountDescending,QuantityAvailableDescending,QuantityPurchasedDescending,BestOfferDescending,ItemIDDescending,PriceDescending,StartPriceDescending,TitleDescending,BidCountDescending,QuantityDescending,StartTimeDescending,EndTimeDescending,SellerUserIDDescending,TimeLeftDescending,WonPlatformDescending,SoldPlatformDescending,LeadCount,NewLeadCount,LeadCountDescending,NewLeadCountDescending,ClassifiedAdPayPerLeadFee,ClassifiedAdPayPerLeadFeeDescending,CustomCode */
    Sort?: string;
    /** Pagination */
    Pagination?: Pagination;
}
