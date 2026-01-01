import { BotBlock } from './BotBlock.js';
import { MotorsDealerUsers } from './MotorsDealerUsers.js';
import { Pagination } from './Pagination.js';
import { SkuArray } from './SkuArray.js';

/** ns:GetSellerListRequestType */
export interface GetSellerListRequest {
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
    /** MotorsDealerUsers */
    MotorsDealerUsers?: MotorsDealerUsers;
    /** xs:dateTime */
    EndTimeFrom?: Date;
    /** xs:dateTime */
    EndTimeTo?: Date;
    /** xs:int */
    Sort?: number;
    /** xs:dateTime */
    StartTimeFrom?: Date;
    /** xs:dateTime */
    StartTimeTo?: Date;
    /** Pagination */
    Pagination?: Pagination;
    /** GranularityLevelCodeType|xs:token|Coarse,Fine,Medium,CustomCode */
    GranularityLevel?: string;
    /** SKUArray */
    SKUArray?: SkuArray;
    /** xs:boolean */
    IncludeWatchCount?: boolean;
    /** xs:boolean */
    AdminEndedItemsOnly?: boolean;
    /** xs:int */
    CategoryID?: number;
    /** xs:boolean */
    IncludeVariations?: boolean;
}
