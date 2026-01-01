import { BotBlock } from './BotBlock.js';
import { WatchList } from './WatchList.js';
import { FavoriteSearches } from './FavoriteSearches.js';

/** ns:GetMyeBayBuyingRequestType */
export interface GetMyeBayBuyingRequest {
    /** DetailLevelCodeType|xs:token|ReturnAll,ItemReturnDescription,ItemReturnAttributes,ItemReturnCategories,ReturnSummary,ReturnHeaders,ReturnMessages */
    DetailLevel?: Array<string>;
    /** xs:string */
    ErrorLanguage?: string;
    /** xs:string */
    MessageID?: string;
    /** xs:string */
    Version?: string;
    /** xs:string */
    EndUserIP?: string;
    /** ErrorHandlingCodeType|xs:token|Legacy,BestEffort,AllOrNothing,FailOnError */
    ErrorHandling?: string;
    /** UUIDType|xs:string */
    InvocationID?: string;
    /** xs:string */
    OutputSelector?: Array<string>;
    /** WarningLevelCodeType|xs:token|Low,High */
    WarningLevel?: string;
    /** BotBlock */
    BotBlock?: BotBlock;
    /** WatchList */
    WatchList?: WatchList;
    /** BidList */
    BidList?: WatchList;
    /** BestOfferList */
    BestOfferList?: WatchList;
    /** WonList */
    WonList?: WatchList;
    /** LostList */
    LostList?: WatchList;
    /** FavoriteSearches */
    FavoriteSearches?: FavoriteSearches;
    /** FavoriteSellers */
    FavoriteSellers?: FavoriteSearches;
    /** SecondChanceOffer */
    SecondChanceOffer?: FavoriteSearches;
    /** DeletedFromWonList */
    DeletedFromWonList?: WatchList;
    /** DeletedFromLostList */
    DeletedFromLostList?: WatchList;
    /** BuyingSummary */
    BuyingSummary?: WatchList;
    /** UserDefinedLists */
    UserDefinedLists?: FavoriteSearches;
    /** xs:boolean */
    HideVariations?: boolean;
}
