import { BotBlock } from './BotBlock.js';

/** ns:VerifyAddSecondChanceItemRequestType */
export interface VerifyAddSecondChanceItemRequest {
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
    /** UserIDType|xs:string */
    RecipientBidderUserID?: string;
    /** xs:double */
    BuyItNowPrice?: number;
    /** SecondChanceOfferDurationCodeType|xs:token|Days_1,Days_3,Days_5,Days_7,CustomCode */
    Duration?: string;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:string */
    SellerMessage?: string;
}
