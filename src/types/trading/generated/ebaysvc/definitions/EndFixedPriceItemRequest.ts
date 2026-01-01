import { BotBlock } from './BotBlock.js';

/** ns:EndFixedPriceItemRequestType */
export interface EndFixedPriceItemRequest {
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
    /** EndReasonCodeType|xs:token|LostOrBroken,NotAvailable,Incorrect,OtherListingError,CustomCode,SellToHighBidder,Sold,ProductDeleted */
    EndingReason?: string;
    /** SKUType|xs:string */
    SKU?: string;
}
