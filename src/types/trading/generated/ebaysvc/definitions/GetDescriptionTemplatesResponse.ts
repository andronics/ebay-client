import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { DescriptionTemplate } from './DescriptionTemplate.js';
import { ThemeGroup } from './ThemeGroup.js';

/** ns:GetDescriptionTemplatesResponseType */
export interface GetDescriptionTemplatesResponse {
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
    /** DescriptionTemplate[] */
    DescriptionTemplate?: Array<DescriptionTemplate>;
    /** xs:int */
    LayoutTotal?: number;
    /** xs:int */
    ObsoleteLayoutID?: Array<number>;
    /** xs:int */
    ObsoleteThemeID?: Array<number>;
    /** ThemeGroup[] */
    ThemeGroup?: Array<ThemeGroup>;
    /** xs:int */
    ThemeTotal?: number;
}
