import { BotBlock } from './BotBlock.js';
import { Pagination } from './Pagination.js';

/** ns:GetItemTransactionsRequestType */
export interface GetItemTransactionsRequest {
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
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:dateTime */
    ModTimeFrom?: Date;
    /** xs:dateTime */
    ModTimeTo?: Date;
    /** xs:string */
    TransactionID?: string;
    /** Pagination */
    Pagination?: Pagination;
    /** xs:boolean */
    IncludeFinalValueFee?: boolean;
    /** xs:boolean */
    IncludeContainingOrder?: boolean;
    /** TransactionPlatformCodeType|xs:token|eBay,Express,Half,Shopping,WorldOfGood,CustomCode */
    Platform?: string;
    /** xs:int */
    NumberOfDays?: number;
    /** xs:boolean */
    IncludeVariations?: boolean;
    /** xs:string */
    OrderLineItemID?: string;
}
