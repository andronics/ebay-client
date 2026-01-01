import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { PaginationResult } from './PaginationResult.js';
import { BidItemArray } from './BidItemArray.js';
import { Seller } from './Seller.js';

/** ns:GetSellerListResponseType */
export interface GetSellerListResponse {
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
    /** ItemArray */
    ItemArray?: BidItemArray;
    /** xs:int */
    ItemsPerPage?: number;
    /** xs:int */
    PageNumber?: number;
    /** xs:int */
    ReturnedItemCountActual?: number;
    /** Seller */
    Seller?: Seller;
}
