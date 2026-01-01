import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { FeedbackDetailArray } from './FeedbackDetailArray.js';
import { FeedbackSummary } from './FeedbackSummary.js';
import { PaginationResult } from './PaginationResult.js';

/** ns:GetFeedbackResponseType */
export interface GetFeedbackResponse {
    /** xs:dateTime */
    Timestamp?: Date;
    /** AckCodeType|xs:token|Success,Failure,Warning,PartialFailure,CustomCode */
    Ack?: string;
    /** xs:string */
    CorrelationID?: string;
    /** Errors[] */
    Errors?: Array<Errors>;
    /** xs:string */
    Message?: string;
    /** xs:string */
    Version?: string;
    /** xs:string */
    Build?: string;
    /** xs:string */
    NotificationEventName?: string;
    /** DuplicateInvocationDetails */
    DuplicateInvocationDetails?: DuplicateInvocationDetails;
    /** xs:string */
    RecipientUserID?: string;
    /** xs:string */
    EIASToken?: string;
    /** xs:string */
    NotificationSignature?: string;
    /** xs:string */
    HardExpirationWarning?: string;
    /** BotBlock */
    BotBlock?: BotBlock1;
    /** xs:string */
    ExternalUserData?: string;
    /** FeedbackDetailArray */
    FeedbackDetailArray?: FeedbackDetailArray;
    /** xs:int */
    FeedbackDetailItemTotal?: number;
    /** FeedbackSummary */
    FeedbackSummary?: FeedbackSummary;
    /** xs:int */
    FeedbackScore?: number;
    /** PaginationResult */
    PaginationResult?: PaginationResult;
    /** xs:int */
    EntriesPerPage?: number;
    /** xs:int */
    PageNumber?: number;
}
