import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { Category } from './Category.js';
import { SiteDefaults } from './SiteDefaults.js';
import { FeatureDefinitions } from './FeatureDefinitions.js';

/** ns:GetCategoryFeaturesResponseType */
export interface GetCategoryFeaturesResponse {
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
    /** xs:string */
    CategoryVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
    /** Category[] */
    Category?: Array<Category>;
    /** SiteDefaults */
    SiteDefaults?: SiteDefaults;
    /** FeatureDefinitions */
    FeatureDefinitions?: FeatureDefinitions;
}
