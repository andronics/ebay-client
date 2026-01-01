import { BotBlock } from './BotBlock.js';

/** ns:ReviseMyMessagesFoldersRequestType */
export interface ReviseMyMessagesFoldersRequest {
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
    /** MyMessagesFolderOperationCodeType|xs:token|Display,Rename,Remove,CustomCode */
    Operation?: string;
    /** xs:long */
    FolderID?: Array<number>;
    /** xs:string */
    FolderName?: Array<string>;
}
