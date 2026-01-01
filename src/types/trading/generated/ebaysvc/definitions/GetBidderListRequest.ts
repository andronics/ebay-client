import { BotBlock } from './BotBlock.js';

/** ns:GetBidderListRequestType */
export interface GetBidderListRequest {
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
    /** xs:boolean */
    ActiveItemsOnly?: boolean;
    /** xs:dateTime */
    EndTimeFrom?: Date;
    /** xs:dateTime */
    EndTimeTo?: Date;
    /** UserIDType|xs:string */
    UserID?: string;
    /** GranularityLevelCodeType|xs:token|Coarse,Fine,Medium,CustomCode */
    GranularityLevel?: string;
}
