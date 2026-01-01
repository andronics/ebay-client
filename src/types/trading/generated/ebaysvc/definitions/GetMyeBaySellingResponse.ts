import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { SellingSummary } from './SellingSummary.js';
import { WatchList1 } from './WatchList1.js';
import { WonList } from './WonList.js';
import { Summary1 } from './Summary1.js';

/** ns:GetMyeBaySellingResponseType */
export interface GetMyeBaySellingResponse {
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
    /** SellingSummary */
    SellingSummary?: SellingSummary;
    /** ScheduledList */
    ScheduledList?: WatchList1;
    /** ActiveList */
    ActiveList?: WatchList1;
    /** SoldList */
    SoldList?: WonList;
    /** UnsoldList */
    UnsoldList?: WatchList1;
    /** Summary */
    Summary?: Summary1;
}
