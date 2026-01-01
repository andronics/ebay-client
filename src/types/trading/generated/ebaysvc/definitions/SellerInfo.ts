import { RegistrationAddress } from './RegistrationAddress.js';
import { SchedulingInfo } from './SchedulingInfo.js';
import { CharityAffiliationDetails } from './CharityAffiliationDetails.js';
import { FeatureEligibility } from './FeatureEligibility.js';
import { TopRatedSellerDetails } from './TopRatedSellerDetails.js';
import { RecoupmentPolicyConsent } from './RecoupmentPolicyConsent.js';

/**
 * SellerInfo
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SellerInfo {
    /** xs:boolean */
    AllowPaymentEdit?: boolean;
    /** CurrencyCodeType|xs:token|AFA,ALL,DZD,ADP,AOA,ARS,AMD,AWG,AZM,BSD,BHD,BDT,BBD,BYR,BZD,BMD,BTN,INR,BOV,BOB,BAM,BWP,BRL,BND,BGL,BGN,BIF,KHR,CAD,CVE,KYD,XAF,CLF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DJF,DOP,TPE,ECV,ECS,EGP,SVC,ERN,EEK,ETB,FKP,FJD,GMD,GEL,GHC,GIP,GTQ,GNF,GWP,GYD,HTG,HNL,HKD,HUF,ISK,IDR,IRR,IQD,ILS,JMD,JPY,JOD,KZT,KES,AUD,KPW,KRW,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,CHF,LTL,MOP,MKD,MGF,MWK,MYR,MVR,MTL,EUR,MRO,MUR,MXN,MXV,MDL,MNT,XCD,MZM,MMK,ZAR,NAD,NPR,ANG,XPF,NZD,NIO,NGN,NOK,OMR,PKR,PAB,PGK,PYG,PEN,PHP,PLN,USD,QAR,ROL,RUB,RUR,RWF,SHP,WST,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,LKR,SDD,SRG,SZL,SEK,SYP,TWD,TJS,TZS,THB,XOF,TOP,TTD,TND,TRL,TMM,UGX,UAH,AED,GBP,USS,USN,UYU,UZS,VUV,VEB,VND,MAD,YER,YUM,ZMK,ZWD,ATS,RON,CustomCode */
    BillingCurrency?: string;
    /** xs:boolean */
    CheckoutEnabled?: boolean;
    /** xs:boolean */
    CIPBankAccountStored?: boolean;
    /** xs:boolean */
    GoodStanding?: boolean;
    /** MerchandizingPrefCodeType|xs:token|OptIn,OptOut,CustomCode */
    MerchandizingPref?: string;
    /** xs:boolean */
    QualifiesForB2BVAT?: boolean;
    /** SellerGuaranteeLevelCodeType|xs:token|NotEligible,Regular,Premium,Ultra,CustomCode */
    SellerGuaranteeLevel?: string;
    /** SellerLevelCodeType|xs:token|Bronze,Silver,Gold,Platinum,Titanium,None,CustomCode */
    SellerLevel?: string;
    /** SellerPaymentAddress */
    SellerPaymentAddress?: RegistrationAddress;
    /** SchedulingInfo */
    SchedulingInfo?: SchedulingInfo;
    /** xs:boolean */
    StoreOwner?: boolean;
    /** xs:anyURI */
    StoreURL?: string;
    /** SellerBusinessCodeType|xs:token|Undefined,Private,Commercial,CustomCode */
    SellerBusinessType?: string;
    /** xs:boolean */
    RegisteredBusinessSeller?: boolean;
    /** SiteCodeType|xs:token|US,Canada,UK,Australia,Austria,Belgium_French,France,Germany,Italy,Belgium_Dutch,Netherlands,Spain,Switzerland,Taiwan,eBayMotors,HongKong,Singapore,India,China,Ireland,Malaysia,Philippines,Poland,Sweden,CustomCode,CanadaFrench,Russia,Czechia,Cyprus */
    StoreSite?: string;
    /** SellerPaymentMethodCodeType|xs:token|NothingOnFile,CreditCard,PayPal,DirectDebit,DirectDebitPendingSignatureMandate,eBayDirectPay,CustomCode,DirectDebitPendingVerification */
    PaymentMethod?: string;
    /** xs:boolean */
    CharityRegistered?: boolean;
    /** xs:boolean */
    SafePaymentExempt?: boolean;
    /** CharityAffiliationDetails */
    CharityAffiliationDetails?: CharityAffiliationDetails;
    /** xs:float */
    TransactionPercent?: number;
    /** FeatureEligibility */
    FeatureEligibility?: FeatureEligibility;
    /** xs:boolean */
    TopRatedSeller?: boolean;
    /** TopRatedSellerDetails */
    TopRatedSellerDetails?: TopRatedSellerDetails;
    /** RecoupmentPolicyConsent */
    RecoupmentPolicyConsent?: RecoupmentPolicyConsent;
    /** xs:boolean */
    DomesticRateTable?: boolean;
    /** xs:boolean */
    InternationalRateTable?: boolean;
}
