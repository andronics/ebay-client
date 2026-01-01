import { BotBlock } from './BotBlock.js';
import { OrderIdArray } from './OrderIdArray.js';
import { Pagination } from './Pagination.js';

/** ns:GetOrdersRequestType */
export interface GetOrdersRequest {
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
    /** OrderIDArray */
    OrderIDArray?: OrderIdArray;
    /** xs:dateTime */
    CreateTimeFrom?: Date;
    /** xs:dateTime */
    CreateTimeTo?: Date;
    /** TradingRoleCodeType|xs:token|Buyer,Seller,CustomCode */
    OrderRole?: string;
    /** OrderStatusCodeType|xs:token|Active,Inactive,Completed,Cancelled,Shipped,Default,Authenticated,InProcess,Invalid,CustomCode,All,CancelPending */
    OrderStatus?: string;
    /** ListingTypeCodeType|xs:token|Unknown,Chinese,Dutch,Live,Auction,AdType,StoresFixedPrice,PersonalOffer,FixedPriceItem,Half,LeadGeneration,Express,Shopping,CustomCode */
    ListingType?: string;
    /** Pagination */
    Pagination?: Pagination;
    /** xs:dateTime */
    ModTimeFrom?: Date;
    /** xs:dateTime */
    ModTimeTo?: Date;
    /** xs:int */
    NumberOfDays?: number;
    /** xs:boolean */
    IncludeFinalValueFee?: boolean;
    /** SortOrderCodeType|xs:token|Ascending,Descending,CustomCode */
    SortingOrder?: string;
}
