import { BotBlock } from './BotBlock.js';
import { WatchList } from './WatchList.js';

/** ns:GetMyeBaySellingRequestType */
export interface GetMyeBaySellingRequest {
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
    /** ScheduledList */
    ScheduledList?: WatchList;
    /** ActiveList */
    ActiveList?: WatchList;
    /** SoldList */
    SoldList?: WatchList;
    /** UnsoldList */
    UnsoldList?: WatchList;
    /** SellingSummary */
    SellingSummary?: WatchList;
    /** xs:boolean */
    HideVariations?: boolean;
}
