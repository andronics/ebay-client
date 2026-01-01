import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { AccountSummary } from './AccountSummary.js';
import { AccountEntries } from './AccountEntries.js';
import { PaginationResult } from './PaginationResult.js';

/** ns:GetAccountResponseType */
export interface GetAccountResponse {
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
    AccountID?: string;
    /** FeenettingStatusCodeType|xs:token|Enabled,Disabled,Exempted */
    FeeNettingStatus?: string;
    /** AccountSummary */
    AccountSummary?: AccountSummary;
    /** CurrencyCodeType|xs:token|AFA,ALL,DZD,ADP,AOA,ARS,AMD,AWG,AZM,BSD,BHD,BDT,BBD,BYR,BZD,BMD,BTN,INR,BOV,BOB,BAM,BWP,BRL,BND,BGL,BGN,BIF,KHR,CAD,CVE,KYD,XAF,CLF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DJF,DOP,TPE,ECV,ECS,EGP,SVC,ERN,EEK,ETB,FKP,FJD,GMD,GEL,GHC,GIP,GTQ,GNF,GWP,GYD,HTG,HNL,HKD,HUF,ISK,IDR,IRR,IQD,ILS,JMD,JPY,JOD,KZT,KES,AUD,KPW,KRW,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,CHF,LTL,MOP,MKD,MGF,MWK,MYR,MVR,MTL,EUR,MRO,MUR,MXN,MXV,MDL,MNT,XCD,MZM,MMK,ZAR,NAD,NPR,ANG,XPF,NZD,NIO,NGN,NOK,OMR,PKR,PAB,PGK,PYG,PEN,PHP,PLN,USD,QAR,ROL,RUB,RUR,RWF,SHP,WST,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,LKR,SDD,SRG,SZL,SEK,SYP,TWD,TJS,TZS,THB,XOF,TOP,TTD,TND,TRL,TMM,UGX,UAH,AED,GBP,USS,USN,UYU,UZS,VUV,VEB,VND,MAD,YER,YUM,ZMK,ZWD,ATS,RON,CustomCode */
    Currency?: string;
    /** AccountEntries */
    AccountEntries?: AccountEntries;
    /** PaginationResult */
    PaginationResult?: PaginationResult;
    /** xs:boolean */
    HasMoreEntries?: boolean;
    /** xs:int */
    EntriesPerPage?: number;
    /** xs:int */
    PageNumber?: number;
}
