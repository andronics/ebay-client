import { BotBlock } from './BotBlock.js';

/** ns:UploadSiteHostedPicturesRequestType */
export interface UploadSiteHostedPicturesRequest {
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
    /** xs:string */
    PictureName?: string;
    /** xs:int */
    PictureSystemVersion?: number;
    /** PictureSetCodeType|xs:token|Standard,Supersize,Large,CustomCode */
    PictureSet?: string;
    /** xs:base64Binary */
    PictureData?: string;
    /** PictureUploadPolicyCodeType|xs:token|Add,ClearAndAdd,CustomCode */
    PictureUploadPolicy?: string;
    /** xs:anyURI */
    ExternalPictureURL?: Array<string>;
}
