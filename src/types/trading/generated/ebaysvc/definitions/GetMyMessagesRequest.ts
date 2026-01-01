import { BotBlock } from './BotBlock.js';
import { MessageIDs } from './MessageIDs.js';
import { ExternalMessageIDs } from './ExternalMessageIDs.js';
import { Pagination } from './Pagination.js';

/** ns:GetMyMessagesRequestType */
export interface GetMyMessagesRequest {
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
    /** MessageIDs */
    MessageIDs?: MessageIDs;
    /** xs:long */
    FolderID?: number;
    /** xs:dateTime */
    StartTime?: Date;
    /** xs:dateTime */
    EndTime?: Date;
    /** ExternalMessageIDs */
    ExternalMessageIDs?: ExternalMessageIDs;
    /** Pagination */
    Pagination?: Pagination;
    /** xs:boolean */
    IncludeHighPriorityMessageOnly?: boolean;
}
