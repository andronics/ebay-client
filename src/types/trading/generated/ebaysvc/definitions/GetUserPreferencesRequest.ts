import { BotBlock } from './BotBlock.js';

/** ns:GetUserPreferencesRequestType */
export interface GetUserPreferencesRequest {
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
    /** xs:boolean */
    ShowBidderNoticePreferences?: boolean;
    /** xs:boolean */
    ShowCombinedPaymentPreferences?: boolean;
    /** xs:boolean */
    ShowSellerPaymentPreferences?: boolean;
    /** xs:boolean */
    ShowEndOfAuctionEmailPreferences?: boolean;
    /** xs:boolean */
    ShowSellerFavoriteItemPreferences?: boolean;
    /** xs:boolean */
    ShowEmailShipmentTrackingNumberPreference?: boolean;
    /** xs:boolean */
    ShowRequiredShipPhoneNumberPreference?: boolean;
    /** xs:boolean */
    ShowSellerExcludeShipToLocationPreference?: boolean;
    /** xs:boolean */
    ShowUnpaidItemAssistancePreference?: boolean;
    /** xs:boolean */
    ShowPurchaseReminderEmailPreferences?: boolean;
    /** xs:boolean */
    ShowUnpaidItemAssistanceExclusionList?: boolean;
    /** xs:boolean */
    ShowSellerProfilePreferences?: boolean;
    /** xs:boolean */
    ShowSellerReturnPreferences?: boolean;
    /** xs:boolean */
    ShowGlobalShippingProgramPreference?: boolean;
    /** xs:boolean */
    ShowDispatchCutoffTimePreferences?: boolean;
    /** xs:boolean */
    ShowGlobalShippingProgramListingPreference?: boolean;
    /** xs:boolean */
    ShowOverrideGSPServiceWithIntlServicePreference?: boolean;
    /** xs:boolean */
    ShowPickupDropoffPreferences?: boolean;
    /** xs:boolean */
    ShowOutOfStockControlPreference?: boolean;
    /** xs:boolean */
    ShoweBayPLUSPreference?: boolean;
}
