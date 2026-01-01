import { BotBlock } from './BotBlock.js';
import { MessageIDs } from './MessageIDs.js';

/** ns:ReviseMyMessagesRequestType */
export interface ReviseMyMessagesRequest {
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
    /** xs:boolean */
    Read?: boolean;
    /** xs:boolean */
    Flagged?: boolean;
    /** xs:long */
    FolderID?: number;
}
