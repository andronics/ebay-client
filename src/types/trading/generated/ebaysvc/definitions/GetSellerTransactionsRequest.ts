import { BotBlock } from './BotBlock.js';
import { Pagination } from './Pagination.js';
import { SkuArray } from './SkuArray.js';

/** ns:GetSellerTransactionsRequestType */
export interface GetSellerTransactionsRequest {
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
    /** xs:dateTime */
    ModTimeFrom?: Date;
    /** xs:dateTime */
    ModTimeTo?: Date;
    /** Pagination */
    Pagination?: Pagination;
    /** xs:boolean */
    IncludeFinalValueFee?: boolean;
    /** xs:boolean */
    IncludeContainingOrder?: boolean;
    /** SKUArray */
    SKUArray?: SkuArray;
    /** TransactionPlatformCodeType|xs:token|eBay,Express,Half,Shopping,WorldOfGood,CustomCode */
    Platform?: string;
    /** xs:int */
    NumberOfDays?: number;
    /** InventoryTrackingMethodCodeType|xs:token|ItemID,SKU,CustomCode */
    InventoryTrackingMethod?: string;
    /** xs:boolean */
    IncludeCodiceFiscale?: boolean;
}
