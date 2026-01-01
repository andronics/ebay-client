import { BotBlock } from './BotBlock.js';

/** ns:RespondToBestOfferRequestType */
export interface RespondToBestOfferRequest {
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
    /** BestOfferIDType|xs:string */
    BestOfferID?: Array<string>;
    /** BestOfferActionCodeType|xs:token|Accept,Decline,Counter,CustomCode */
    Action?: string;
    /** xs:string */
    SellerResponse?: string;
    /** xs:double */
    CounterOfferPrice?: number;
    /** xs:int */
    CounterOfferQuantity?: number;
}
