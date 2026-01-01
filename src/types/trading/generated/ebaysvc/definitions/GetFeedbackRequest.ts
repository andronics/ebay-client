import { BotBlock } from './BotBlock.js';
import { Pagination } from './Pagination.js';

/** ns:GetFeedbackRequestType */
export interface GetFeedbackRequest {
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
    /** UserIDType|xs:string */
    UserID?: string;
    /** xs:string */
    FeedbackID?: string;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:string */
    TransactionID?: string;
    /** CommentTypeCodeType|xs:token|Positive,Neutral,Negative,Withdrawn,IndependentlyWithdrawn,CustomCode */
    CommentType?: Array<string>;
    /** FeedbackTypeCodeType|xs:token|FeedbackReceivedAsSeller,FeedbackReceivedAsBuyer,FeedbackReceived,FeedbackLeft,CustomCode */
    FeedbackType?: string;
    /** Pagination */
    Pagination?: Pagination;
    /** xs:string */
    OrderLineItemID?: string;
}
