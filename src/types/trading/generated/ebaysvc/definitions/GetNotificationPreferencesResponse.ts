import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { ApplicationDeliveryPreferences } from './ApplicationDeliveryPreferences.js';
import { UserDeliveryPreferenceArray } from './UserDeliveryPreferenceArray.js';
import { UserData } from './UserData.js';
import { EventProperty } from './EventProperty.js';

/** ns:GetNotificationPreferencesResponseType */
export interface GetNotificationPreferencesResponse {
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
    /** ApplicationDeliveryPreferences */
    ApplicationDeliveryPreferences?: ApplicationDeliveryPreferences;
    /** xs:string */
    DeliveryURLName?: string;
    /** UserDeliveryPreferenceArray */
    UserDeliveryPreferenceArray?: UserDeliveryPreferenceArray;
    /** UserData */
    UserData?: UserData;
    /** EventProperty[] */
    EventProperty?: Array<EventProperty>;
}
