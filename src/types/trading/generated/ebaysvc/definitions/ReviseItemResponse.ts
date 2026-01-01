import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { Fees } from './Fees.js';
import { ProductSuggestions } from './ProductSuggestions.js';

/** ns:ReviseItemResponseType */
export interface ReviseItemResponse {
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
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:dateTime */
    StartTime?: Date;
    /** xs:dateTime */
    EndTime?: Date;
    /** Fees */
    Fees?: Fees;
    /** xs:string */
    CategoryID?: string;
    /** xs:string */
    Category2ID?: string;
    /** xs:boolean */
    VerifyOnly?: boolean;
    /** DiscountReasonCodeType|xs:token|SpecialOffer,Promotion,CustomCode */
    DiscountReason?: Array<string>;
    /** ProductSuggestions */
    ProductSuggestions?: ProductSuggestions;
}
