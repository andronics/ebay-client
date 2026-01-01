import { BotBlock } from './BotBlock.js';

/** ns:RespondToFeedbackRequestType */
export interface RespondToFeedbackRequest {
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
    /** xs:string */
    FeedbackID?: string;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:string */
    TransactionID?: string;
    /** UserIDType|xs:string */
    TargetUserID?: string;
    /** FeedbackResponseCodeType|xs:token|Reply,FollowUp,CustomCode */
    ResponseType?: string;
    /** xs:string */
    ResponseText?: string;
    /** xs:string */
    OrderLineItemID?: string;
}
