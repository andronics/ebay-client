import { BotBlock } from './BotBlock.js';
import { Pagination } from './Pagination.js';

/** ns:GetVeROReportStatusRequestType */
export interface GetVeRoReportStatusRequest {
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
    /** xs:long */
    VeROReportPacketID?: number;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:boolean */
    IncludeReportedItemDetails?: boolean;
    /** xs:dateTime */
    TimeFrom?: Date;
    /** xs:dateTime */
    TimeTo?: Date;
    /** Pagination */
    Pagination?: Pagination;
}
