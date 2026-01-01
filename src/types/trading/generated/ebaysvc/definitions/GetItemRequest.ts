import { BotBlock } from './BotBlock.js';
import { ItemSpecifics } from './ItemSpecifics.js';

/** ns:GetItemRequestType */
export interface GetItemRequest {
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
    /** xs:boolean */
    IncludeWatchCount?: boolean;
    /** xs:boolean */
    IncludeItemSpecifics?: boolean;
    /** xs:boolean */
    IncludeTaxTable?: boolean;
    /** SKUType|xs:string */
    SKU?: string;
    /** SKUType|xs:string */
    VariationSKU?: string;
    /** VariationSpecifics */
    VariationSpecifics?: ItemSpecifics;
    /** xs:string */
    TransactionID?: string;
    /** xs:boolean */
    IncludeItemCompatibilityList?: boolean;
}
