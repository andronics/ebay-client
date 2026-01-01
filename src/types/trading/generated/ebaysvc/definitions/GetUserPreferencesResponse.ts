import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { BidderNoticePreferences } from './BidderNoticePreferences.js';
import { CombinedPaymentPreferences } from './CombinedPaymentPreferences.js';
import { SellerPaymentPreferences } from './SellerPaymentPreferences.js';
import { SellerFavoriteItemPreferences } from './SellerFavoriteItemPreferences.js';
import { EndOfAuctionEmailPreferences } from './EndOfAuctionEmailPreferences.js';
import { UnpaidItemAssistancePreferences } from './UnpaidItemAssistancePreferences.js';
import { SellerExcludeShipToLocationPreferences } from './SellerExcludeShipToLocationPreferences.js';
import { PurchaseReminderEmailPreferences } from './PurchaseReminderEmailPreferences.js';
import { SellerProfilePreferences } from './SellerProfilePreferences.js';
import { SellerReturnPreferences } from './SellerReturnPreferences.js';
import { DispatchCutoffTimePreference } from './DispatchCutoffTimePreference.js';
import { EBayPlusPreference } from './EBayPlusPreference.js';

/** ns:GetUserPreferencesResponseType */
export interface GetUserPreferencesResponse {
    /** xs:dateTime */
    Timestamp?: Date;
    /** AckCodeType|xs:token|Success,Failure,Warning,PartialFailure,CustomCode */
    Ack?: string;
    /** xs:string */
    CorrelationID?: string;
    /** Errors[] */
    Errors?: Array<Errors>;
    /** xs:string */
    Message?: string;
    /** xs:string */
    Version?: string;
    /** xs:string */
    Build?: string;
    /** xs:string */
    NotificationEventName?: string;
    /** DuplicateInvocationDetails */
    DuplicateInvocationDetails?: DuplicateInvocationDetails;
    /** xs:string */
    RecipientUserID?: string;
    /** xs:string */
    EIASToken?: string;
    /** xs:string */
    NotificationSignature?: string;
    /** xs:string */
    HardExpirationWarning?: string;
    /** BotBlock */
    BotBlock?: BotBlock1;
    /** xs:string */
    ExternalUserData?: string;
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
    /** SellerExcludeShipToLocationPreferences */
    SellerExcludeShipToLocationPreferences?: SellerExcludeShipToLocationPreferences;
    /** PurchaseReminderEmailPreferences */
    PurchaseReminderEmailPreferences?: PurchaseReminderEmailPreferences;
    /** SellerProfilePreferences */
    SellerProfilePreferences?: SellerProfilePreferences;
    /** SellerReturnPreferences */
    SellerReturnPreferences?: SellerReturnPreferences;
    /** xs:boolean */
    OfferGlobalShippingProgramPreference?: boolean;
    /** DispatchCutoffTimePreference */
    DispatchCutoffTimePreference?: DispatchCutoffTimePreference;
    /** xs:boolean */
    GlobalShippingProgramListingPreference?: boolean;
    /** xs:boolean */
    OverrideGSPServiceWithIntlServicePreference?: boolean;
    /** xs:boolean */
    PickupDropoffSellerPreference?: boolean;
    /** xs:boolean */
    OutOfStockControlPreference?: boolean;
    /** eBayPLUSPreference[] */
    eBayPLUSPreference?: Array<EBayPlusPreference>;
}
