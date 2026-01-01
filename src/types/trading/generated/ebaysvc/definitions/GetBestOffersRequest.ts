import { BotBlock } from './BotBlock.js';
import { Pagination } from './Pagination.js';

/** ns:GetBestOffersRequestType */
export interface GetBestOffersRequest {
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
    /** BestOfferIDType|xs:string */
    BestOfferID?: string;
    /** BestOfferStatusCodeType|xs:token|Pending,Accepted,Declined,Expired,Retracted,AdminEnded,Active,Countered,SellerAccept,All,PendingBuyerPayment,PendingBuyerConfirmation,CustomCode */
    BestOfferStatus?: string;
    /** Pagination */
    Pagination?: Pagination;
}
