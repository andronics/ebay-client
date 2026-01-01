import { BotBlock } from './BotBlock.js';
import { BidderNoticePreferences } from './BidderNoticePreferences.js';
import { CombinedPaymentPreferences } from './CombinedPaymentPreferences.js';
import { SellerPaymentPreferences } from './SellerPaymentPreferences.js';
import { SellerFavoriteItemPreferences } from './SellerFavoriteItemPreferences.js';
import { EndOfAuctionEmailPreferences } from './EndOfAuctionEmailPreferences.js';
import { UnpaidItemAssistancePreferences } from './UnpaidItemAssistancePreferences.js';
import { PurchaseReminderEmailPreferences } from './PurchaseReminderEmailPreferences.js';
import { DispatchCutoffTimePreference } from './DispatchCutoffTimePreference.js';

/** ns:SetUserPreferencesRequestType */
export interface SetUserPreferencesRequest {
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
    /** BidderNoticePreferences */
    BidderNoticePreferences?: BidderNoticePreferences;
    /** CombinedPaymentPreferences */
    CombinedPaymentPreferences?: CombinedPaymentPreferences;
    /** SellerPaymentPreferences */
    SellerPaymentPreferences?: SellerPaymentPreferences;
    /** SellerFavoriteItemPreferences */
    SellerFavoriteItemPreferences?: SellerFavoriteItemPreferences;
    /** EndOfAuctionEmailPreferences */
    EndOfAuctionEmailPreferences?: EndOfAuctionEmailPreferences;
    /** xs:boolean */
    EmailShipmentTrackingNumberPreference?: boolean;
    /** xs:boolean */
    RequiredShipPhoneNumberPreference?: boolean;
    /** UnpaidItemAssistancePreferences */
    UnpaidItemAssistancePreferences?: UnpaidItemAssistancePreferences;
    /** PurchaseReminderEmailPreferences */
    PurchaseReminderEmailPreferences?: PurchaseReminderEmailPreferences;
    /** DispatchCutoffTimePreference */
    DispatchCutoffTimePreference?: DispatchCutoffTimePreference;
    /** xs:boolean */
    GlobalShippingProgramListingPreference?: boolean;
    /** xs:boolean */
    OverrideGSPserviceWithIntlService?: boolean;
    /** xs:boolean */
    OutOfStockControlPreference?: boolean;
}
