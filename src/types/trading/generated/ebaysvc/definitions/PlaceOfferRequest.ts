import { BotBlock } from './BotBlock.js';
import { Offer } from './Offer.js';
import { AffiliateTrackingDetails } from './AffiliateTrackingDetails.js';
import { ItemSpecifics } from './ItemSpecifics.js';

/** ns:PlaceOfferRequestType */
export interface PlaceOfferRequest {
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
    /** Offer */
    Offer?: Offer;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:boolean */
    BlockOnWarning?: boolean;
    /** AffiliateTrackingDetails */
    AffiliateTrackingDetails?: AffiliateTrackingDetails;
    /** VariationSpecifics */
    VariationSpecifics?: ItemSpecifics;
}
