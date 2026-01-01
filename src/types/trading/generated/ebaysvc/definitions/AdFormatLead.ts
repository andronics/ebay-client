import { RegistrationAddress } from './RegistrationAddress.js';
import { MemberMessage1 } from './MemberMessage1.js';

/**
 * AdFormatLead
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AdFormatLead {
    /** xs:string */
    AdditionalInformation?: string;
    /** Address */
    Address?: RegistrationAddress;
    /** xs:string */
    BestTimeToCall?: string;
    /** xs:string */
    Email?: string;
    /** xs:dateTime */
    SubmittedTime?: Date;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:string */
    ItemTitle?: string;
    /** UserIDType|xs:string */
    UserID?: string;
    /** MemberMessage */
    MemberMessage?: MemberMessage1;
    /** AdFormatLeadStatusCodeType|xs:token|New,Responded,CustomCode */
    Status?: string;
    /** xs:double */
    LeadFee?: number;
    /** xs:string */
    ExternalEmail?: string;
    /** xs:string */
    PurchaseTimeFrame?: string;
    /** xs:string */
    TradeInYear?: string;
    /** xs:string */
    TradeInMake?: string;
    /** xs:string */
    TradeInModel?: string;
    /** xs:boolean */
    FinancingAnswer?: boolean;
    /** xs:boolean */
    Answer1?: boolean;
    /** xs:boolean */
    Answer2?: boolean;
}
