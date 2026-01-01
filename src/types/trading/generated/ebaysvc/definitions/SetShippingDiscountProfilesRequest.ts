import { BotBlock } from './BotBlock.js';
import { FlatShippingDiscount } from './FlatShippingDiscount.js';
import { CalculatedShippingDiscount } from './CalculatedShippingDiscount.js';
import { CalculatedHandlingDiscount } from './CalculatedHandlingDiscount.js';
import { PromotionalShippingDiscountDetails } from './PromotionalShippingDiscountDetails.js';

/** ns:SetShippingDiscountProfilesRequestType */
export interface SetShippingDiscountProfilesRequest {
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
    /** CurrencyCodeType|xs:token|AFA,ALL,DZD,ADP,AOA,ARS,AMD,AWG,AZM,BSD,BHD,BDT,BBD,BYR,BZD,BMD,BTN,INR,BOV,BOB,BAM,BWP,BRL,BND,BGL,BGN,BIF,KHR,CAD,CVE,KYD,XAF,CLF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DJF,DOP,TPE,ECV,ECS,EGP,SVC,ERN,EEK,ETB,FKP,FJD,GMD,GEL,GHC,GIP,GTQ,GNF,GWP,GYD,HTG,HNL,HKD,HUF,ISK,IDR,IRR,IQD,ILS,JMD,JPY,JOD,KZT,KES,AUD,KPW,KRW,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,CHF,LTL,MOP,MKD,MGF,MWK,MYR,MVR,MTL,EUR,MRO,MUR,MXN,MXV,MDL,MNT,XCD,MZM,MMK,ZAR,NAD,NPR,ANG,XPF,NZD,NIO,NGN,NOK,OMR,PKR,PAB,PGK,PYG,PEN,PHP,PLN,USD,QAR,ROL,RUB,RUR,RWF,SHP,WST,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,LKR,SDD,SRG,SZL,SEK,SYP,TWD,TJS,TZS,THB,XOF,TOP,TTD,TND,TRL,TMM,UGX,UAH,AED,GBP,USS,USN,UYU,UZS,VUV,VEB,VND,MAD,YER,YUM,ZMK,ZWD,ATS,RON,CustomCode */
    CurrencyID?: string;
    /** CombinedPaymentPeriodCodeType|xs:token|Days_3,Days_5,Days_7,Days_14,Days_30,Ineligible,CustomCode */
    CombinedDuration?: string;
    /** ModifyActionCodeType|xs:token|Add,Delete,Update,CustomCode */
    ModifyActionCode?: string;
    /** FlatShippingDiscount */
    FlatShippingDiscount?: FlatShippingDiscount;
    /** CalculatedShippingDiscount */
    CalculatedShippingDiscount?: CalculatedShippingDiscount;
    /** CalculatedHandlingDiscount */
    CalculatedHandlingDiscount?: CalculatedHandlingDiscount;
    /** PromotionalShippingDiscountDetails */
    PromotionalShippingDiscountDetails?: PromotionalShippingDiscountDetails;
}
