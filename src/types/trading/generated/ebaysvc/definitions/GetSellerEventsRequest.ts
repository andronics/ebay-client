import { BotBlock } from './BotBlock.js';

/** ns:GetSellerEventsRequestType */
export interface GetSellerEventsRequest {
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
    StartTimeFrom?: Date;
    /** xs:dateTime */
    StartTimeTo?: Date;
    /** xs:dateTime */
    EndTimeFrom?: Date;
    /** xs:dateTime */
    EndTimeTo?: Date;
    /** xs:dateTime */
    ModTimeFrom?: Date;
    /** xs:dateTime */
    ModTimeTo?: Date;
    /** xs:boolean */
    NewItemFilter?: boolean;
    /** xs:boolean */
    IncludeWatchCount?: boolean;
    /** xs:boolean */
    IncludeVariationSpecifics?: boolean;
    /** xs:boolean */
    HideVariations?: boolean;
}
