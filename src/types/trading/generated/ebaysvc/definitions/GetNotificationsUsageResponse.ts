import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { NotificationDetailsArray } from './NotificationDetailsArray.js';
import { MarkUpMarkDownHistory } from './MarkUpMarkDownHistory.js';
import { NotificationStatistics } from './NotificationStatistics.js';

/** ns:GetNotificationsUsageResponseType */
export interface GetNotificationsUsageResponse {
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
    /** xs:dateTime */
    StartTime?: Date;
    /** xs:dateTime */
    EndTime?: Date;
    /** NotificationDetailsArray */
    NotificationDetailsArray?: NotificationDetailsArray;
    /** MarkUpMarkDownHistory */
    MarkUpMarkDownHistory?: MarkUpMarkDownHistory;
    /** NotificationStatistics */
    NotificationStatistics?: NotificationStatistics;
}
