import { BotBlock } from './BotBlock.js';
import { SellerItemRatingDetailArray } from './SellerItemRatingDetailArray.js';

/** ns:LeaveFeedbackRequestType */
export interface LeaveFeedbackRequest {
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
    CommentText?: string;
    /** CommentTypeCodeType|xs:token|Positive,Neutral,Negative,Withdrawn,IndependentlyWithdrawn,CustomCode */
    CommentType?: string;
    /** xs:string */
    TransactionID?: string;
    /** UserIDType|xs:string */
    TargetUser?: string;
    /** SellerItemRatingDetailArray */
    SellerItemRatingDetailArray?: SellerItemRatingDetailArray;
    /** xs:string */
    OrderLineItemID?: string;
    /** ItemArrivedWithinEDDCodeType|xs:token|EddQuestionWasNotAsked,BuyerDidntProvideAnswer,BuyerIndicatedItemArrivedWithinEDDRange,BuyerIndicatedItemNotArrivedWithinEDDRange,CustomCode */
    ItemArrivedWithinEDDType?: string;
    /** xs:boolean */
    ItemDeliveredWithinEDD?: boolean;
}
