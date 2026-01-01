import { BotBlock } from './BotBlock.js';

/** ns:GetAdFormatLeadsRequestType */
export interface GetAdFormatLeadsRequest {
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
    /** MessageStatusTypeCodeType|xs:token|Answered,Unanswered,CustomCode */
    Status?: string;
    /** xs:boolean */
    IncludeMemberMessages?: boolean;
    /** xs:dateTime */
    StartCreationTime?: Date;
    /** xs:dateTime */
    EndCreationTime?: Date;
}
