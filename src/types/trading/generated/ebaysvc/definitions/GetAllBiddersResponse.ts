import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { BidArray } from './BidArray.js';

/** ns:GetAllBiddersResponseType */
export interface GetAllBiddersResponse {
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
    /** BidArray */
    BidArray?: BidArray;
    /** UserIDType|xs:string */
    HighBidder?: string;
    /** xs:double */
    HighestBid?: number;
    /** ListingStatusCodeType|xs:token|Active,Ended,Completed,CustomCode,Custom */
    ListingStatus?: string;
}
