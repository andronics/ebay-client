import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { BuyingSummary } from './BuyingSummary.js';
import { WatchList1 } from './WatchList1.js';
import { WonList } from './WonList.js';
import { FavoriteSearches1 } from './FavoriteSearches1.js';
import { FavoriteSellers } from './FavoriteSellers.js';
import { Item } from './Item.js';
import { UserDefinedList } from './UserDefinedList.js';

/** ns:GetMyeBayBuyingResponseType */
export interface GetMyeBayBuyingResponse {
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
    /** BuyingSummary */
    BuyingSummary?: BuyingSummary;
    /** WatchList */
    WatchList?: WatchList1;
    /** BidList */
    BidList?: WatchList1;
    /** BestOfferList */
    BestOfferList?: WatchList1;
    /** WonList */
    WonList?: WonList;
    /** LostList */
    LostList?: WatchList1;
    /** FavoriteSearches */
    FavoriteSearches?: FavoriteSearches1;
    /** FavoriteSellers */
    FavoriteSellers?: FavoriteSellers;
    /** SecondChanceOffer[] */
    SecondChanceOffer?: Array<Item>;
    /** DeletedFromWonList */
    DeletedFromWonList?: WonList;
    /** DeletedFromLostList */
    DeletedFromLostList?: WatchList1;
    /** UserDefinedList[] */
    UserDefinedList?: Array<UserDefinedList>;
}
