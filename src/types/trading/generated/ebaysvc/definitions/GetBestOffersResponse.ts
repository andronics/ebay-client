import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { BestOfferArray } from './BestOfferArray.js';
import { Item } from './Item.js';
import { ItemBestOffersArray } from './ItemBestOffersArray.js';
import { PaginationResult } from './PaginationResult.js';

/** ns:GetBestOffersResponseType */
export interface GetBestOffersResponse {
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
    /** BestOfferArray */
    BestOfferArray?: BestOfferArray;
    /** Item */
    Item?: Item;
    /** ItemBestOffersArray */
    ItemBestOffersArray?: ItemBestOffersArray;
    /** xs:int */
    PageNumber?: number;
    /** PaginationResult */
    PaginationResult?: PaginationResult;
}
