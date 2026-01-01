import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { PaginationResult } from './PaginationResult.js';
import { ReportedItemDetails } from './ReportedItemDetails.js';

/** ns:GetVeROReportStatusResponseType */
export interface GetVeRoReportStatusResponse {
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
    /** PaginationResult */
    PaginationResult?: PaginationResult;
    /** xs:boolean */
    HasMoreItems?: boolean;
    /** xs:int */
    ItemsPerPage?: number;
    /** xs:int */
    PageNumber?: number;
    /** xs:long */
    VeROReportPacketID?: number;
    /** VeROReportPacketStatusCodeType|xs:token|Received,InProcess,Processed,CustomCode */
    VeROReportPacketStatus?: string;
    /** ReportedItemDetails */
    ReportedItemDetails?: ReportedItemDetails;
}
