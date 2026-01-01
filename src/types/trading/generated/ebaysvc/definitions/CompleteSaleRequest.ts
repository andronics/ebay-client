import { BotBlock } from './BotBlock.js';
import { FeedbackLeft } from './FeedbackLeft.js';
import { Shipment } from './Shipment.js';

/** ns:CompleteSaleRequestType */
export interface CompleteSaleRequest {
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
    /** xs:string */
    TransactionID?: string;
    /** FeedbackInfo */
    FeedbackInfo?: FeedbackLeft;
    /** xs:boolean */
    Shipped?: boolean;
    /** xs:boolean */
    Paid?: boolean;
    /** ListingTypeCodeType|xs:token|Unknown,Chinese,Dutch,Live,Auction,AdType,StoresFixedPrice,PersonalOffer,FixedPriceItem,Half,LeadGeneration,Express,Shopping,CustomCode */
    ListingType?: string;
    /** Shipment */
    Shipment?: Shipment;
    /** xs:string */
    OrderID?: string;
    /** xs:string */
    OrderLineItemID?: string;
}
