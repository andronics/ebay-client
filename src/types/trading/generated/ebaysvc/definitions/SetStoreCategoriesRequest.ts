import { BotBlock } from './BotBlock.js';
import { CustomCategories } from './CustomCategories.js';

/** ns:SetStoreCategoriesRequestType */
export interface SetStoreCategoriesRequest {
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
    /** StoreCategoryUpdateActionCodeType|xs:token|Add,Delete,Move,Rename,CustomCode */
    Action?: string;
    /** xs:long */
    ItemDestinationCategoryID?: number;
    /** xs:long */
    DestinationParentCategoryID?: number;
    /** StoreCategories */
    StoreCategories?: CustomCategories;
}
