import { BotBlock } from './BotBlock.js';
import { ApplicationDeliveryPreferences } from './ApplicationDeliveryPreferences.js';
import { UserDeliveryPreferenceArray } from './UserDeliveryPreferenceArray.js';
import { UserData } from './UserData.js';
import { EventProperty } from './EventProperty.js';

/** ns:SetNotificationPreferencesRequestType */
export interface SetNotificationPreferencesRequest {
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
    /** ApplicationDeliveryPreferences */
    ApplicationDeliveryPreferences?: ApplicationDeliveryPreferences;
    /** UserDeliveryPreferenceArray */
    UserDeliveryPreferenceArray?: UserDeliveryPreferenceArray;
    /** UserData */
    UserData?: UserData;
    /** EventProperty[] */
    EventProperty?: Array<EventProperty>;
    /** xs:string */
    DeliveryURLName?: string;
}
