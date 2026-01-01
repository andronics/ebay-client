import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { PaginationResult } from './PaginationResult.js';
import { Seller } from './Seller.js';
import { TransactionArray } from './TransactionArray.js';

/** ns:GetSellerTransactionsResponseType */
export interface GetSellerTransactionsResponse {
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
    HasMoreTransactions?: boolean;
    /** xs:int */
    TransactionsPerPage?: number;
    /** xs:int */
    PageNumber?: number;
    /** xs:int */
    ReturnedTransactionCountActual?: number;
    /** Seller */
    Seller?: Seller;
    /** TransactionArray */
    TransactionArray?: TransactionArray;
}
