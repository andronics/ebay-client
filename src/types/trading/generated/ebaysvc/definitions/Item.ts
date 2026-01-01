import { BiddingDetails } from './BiddingDetails.js';
import { Charity } from './Charity.js';
import { ListingDetails } from './ListingDetails.js';
import { PaymentDetails } from './PaymentDetails.js';
import { PrimaryCategory } from './PrimaryCategory.js';
import { ProductListingDetails } from './ProductListingDetails.js';
import { ReviseStatus } from './ReviseStatus.js';
import { Seller } from './Seller.js';
import { SellingStatus } from './SellingStatus.js';
import { ShippingDetails } from './ShippingDetails.js';
import { Storefront } from './Storefront.js';
import { VatDetails } from './VatDetails.js';
import { BestOfferDetails } from './BestOfferDetails.js';
import { PictureDetails } from './PictureDetails.js';
import { VideoDetails } from './VideoDetails.js';
import { ExtendedProducerResponsibility } from './ExtendedProducerResponsibility.js';
import { CustomPolicies } from './CustomPolicies.js';
import { RegistrationAddress } from './RegistrationAddress.js';
import { ExtendedSellerContactDetails } from './ExtendedSellerContactDetails.js';
import { ItemSpecifics } from './ItemSpecifics.js';
import { ApplyBuyerProtection } from './ApplyBuyerProtection.js';
import { ItemPolicyViolation } from './ItemPolicyViolation.js';
import { BusinessSellerDetails } from './BusinessSellerDetails.js';
import { BuyerRequirementDetails } from './BuyerRequirementDetails.js';
import { ReturnPolicy } from './ReturnPolicy.js';
import { Variations } from './Variations.js';
import { ItemCompatibilityList } from './ItemCompatibilityList.js';
import { ConditionDescriptors } from './ConditionDescriptors.js';
import { Regulatory } from './Regulatory.js';
import { DiscountPriceInfo } from './DiscountPriceInfo.js';
import { SellerProfiles } from './SellerProfiles.js';
import { ShippingServiceCostOverrideList } from './ShippingServiceCostOverrideList.js';
import { ShippingPackageDetails } from './ShippingPackageDetails.js';
import { QuantityRestrictionPerBuyer } from './QuantityRestrictionPerBuyer.js';
import { UnitInfo } from './UnitInfo.js';
import { PickupInStoreDetails } from './PickupInStoreDetails.js';
import { DigitalGoodInfo } from './DigitalGoodInfo.js';

/**
 * Item
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Item {
    /** xs:string */
    ApplicationData?: string;
    /** xs:boolean */
    AutoPay?: boolean;
    /** BiddingDetails */
    BiddingDetails?: BiddingDetails;
    /** BuyerProtectionCodeType|xs:token|ItemIneligible,ItemEligible,ItemMarkedIneligible,ItemMarkedEligible,NoCoverage,CustomCode */
    BuyerProtection?: string;
    /** xs:double */
    BuyItNowPrice?: number;
    /** xs:boolean */
    CategoryMappingAllowed?: boolean;
    /** Charity */
    Charity?: Charity;
    /** CountryCodeType|xs:token|AF,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CY,CZ,DK,DJ,DM,DO,TP,EC,EG,SV,GQ,ER,EE,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IL,IT,JM,JP,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MK,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,MS,MA,MZ,MM,NA,NR,NP,NL,AN,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,SH,KN,LC,PM,VC,WS,SM,ST,SA,SN,SC,SL,SG,SK,SI,SB,SO,ZA,GS,ES,LK,SD,SR,SJ,SZ,SE,CH,SY,TW,TJ,TZ,TH,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,YU,ZM,ZW,AA,QM,QN,QO,QP,JE,GG,ZZ,RS,ME,CustomCode */
    Country?: string;
    /** CurrencyCodeType|xs:token|AFA,ALL,DZD,ADP,AOA,ARS,AMD,AWG,AZM,BSD,BHD,BDT,BBD,BYR,BZD,BMD,BTN,INR,BOV,BOB,BAM,BWP,BRL,BND,BGL,BGN,BIF,KHR,CAD,CVE,KYD,XAF,CLF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DJF,DOP,TPE,ECV,ECS,EGP,SVC,ERN,EEK,ETB,FKP,FJD,GMD,GEL,GHC,GIP,GTQ,GNF,GWP,GYD,HTG,HNL,HKD,HUF,ISK,IDR,IRR,IQD,ILS,JMD,JPY,JOD,KZT,KES,AUD,KPW,KRW,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,CHF,LTL,MOP,MKD,MGF,MWK,MYR,MVR,MTL,EUR,MRO,MUR,MXN,MXV,MDL,MNT,XCD,MZM,MMK,ZAR,NAD,NPR,ANG,XPF,NZD,NIO,NGN,NOK,OMR,PKR,PAB,PGK,PYG,PEN,PHP,PLN,USD,QAR,ROL,RUB,RUR,RWF,SHP,WST,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,LKR,SDD,SRG,SZL,SEK,SYP,TWD,TJS,TZS,THB,XOF,TOP,TTD,TND,TRL,TMM,UGX,UAH,AED,GBP,USS,USN,UYU,UZS,VUV,VEB,VND,MAD,YER,YUM,ZMK,ZWD,ATS,RON,CustomCode */
    Currency?: string;
    /** xs:string */
    Description?: string;
    /** DescriptionReviseModeCodeType|xs:token|Replace,Prepend,Append,CustomCode */
    DescriptionReviseMode?: string;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** ListingDetails */
    ListingDetails?: ListingDetails;
    /** xs:token */
    ListingDuration?: string;
    /** ListingEnhancementsCodeType|xs:token|Border,BoldTitle,Featured,Highlight,HomePageFeatured,ProPackBundle,BasicUpgradePackBundle,ValuePackBundle,ProPackPlusBundle,CustomCode */
    ListingEnhancement?: Array<string>;
    /** ListingTypeCodeType|xs:token|Unknown,Chinese,Dutch,Live,Auction,AdType,StoresFixedPrice,PersonalOffer,FixedPriceItem,Half,LeadGeneration,Express,Shopping,CustomCode */
    ListingType?: string;
    /** xs:string */
    Location?: string;
    /** xs:int */
    LotSize?: number;
    /** PaymentDetails */
    PaymentDetails?: PaymentDetails;
    /** BuyerPaymentMethodCodeType|xs:token|None,MOCC,AmEx,PaymentSeeDescription,CCAccepted,PersonalCheck,COD,VisaMC,PaisaPayAccepted,Other,PayPal,Discover,CashOnPickup,MoneyXferAccepted,MoneyXferAcceptedInCheckout,OtherOnlinePayments,Escrow,PrePayDelivery,CODPrePayDelivery,PostalTransfer,CustomCode,LoanCheck,CashInPerson,ELV,PaisaPayEscrow,PaisaPayEscrowEMI,IntegratedMerchantCreditCard,Moneybookers,Paymate,ProPay,PayOnPickup,Diners,StandardPayment,DirectDebit,CreditCard,PayUponInvoice,QIWI,PayPalCredit */
    PaymentMethods?: Array<string>;
    /** xs:string */
    PayPalEmailAddress?: string;
    /** PrimaryCategory */
    PrimaryCategory?: PrimaryCategory;
    /** xs:boolean */
    PrivateListing?: boolean;
    /** ProductListingDetails */
    ProductListingDetails?: ProductListingDetails;
    /** xs:int */
    Quantity?: number;
    /** xs:string */
    PrivateNotes?: string;
    /** xs:boolean */
    RelistLink?: boolean;
    /** xs:boolean */
    IsItemEMSEligible?: boolean;
    /** xs:double */
    ReservePrice?: number;
    /** ReviseStatus */
    ReviseStatus?: ReviseStatus;
    /** xs:dateTime */
    ScheduleTime?: Date;
    /** SecondaryCategory */
    SecondaryCategory?: PrimaryCategory;
    /** FreeAddedCategory */
    FreeAddedCategory?: PrimaryCategory;
    /** Seller */
    Seller?: Seller;
    /** SellingStatus */
    SellingStatus?: SellingStatus;
    /** ShippingDetails */
    ShippingDetails?: ShippingDetails;
    /** xs:string */
    ShipToLocations?: Array<string>;
    /** SiteCodeType|xs:token|US,Canada,UK,Australia,Austria,Belgium_French,France,Germany,Italy,Belgium_Dutch,Netherlands,Spain,Switzerland,Taiwan,eBayMotors,HongKong,Singapore,India,China,Ireland,Malaysia,Philippines,Poland,Sweden,CustomCode,CanadaFrench,Russia,Czechia,Cyprus */
    Site?: string;
    /** xs:double */
    StartPrice?: number;
    /** Storefront */
    Storefront?: Storefront;
    /** xs:string */
    SubTitle?: string;
    /** xs:duration */
    TimeLeft?: string;
    /** xs:string */
    Title?: string;
    /** UUIDType|xs:string */
    UUID?: string;
    /** VATDetails */
    VATDetails?: VatDetails;
    /** xs:string */
    SellerVacationNote?: string;
    /** xs:long */
    WatchCount?: number;
    /** xs:long */
    HitCount?: number;
    /** xs:boolean */
    DisableBuyerRequirements?: boolean;
    /** BestOfferDetails */
    BestOfferDetails?: BestOfferDetails;
    /** xs:boolean */
    LocationDefaulted?: boolean;
    /** xs:boolean */
    UseTaxTable?: boolean;
    /** xs:boolean */
    GetItFast?: boolean;
    /** xs:boolean */
    BuyerResponsibleForShipping?: boolean;
    /** xs:string */
    eBayNotes?: string;
    /** xs:long */
    QuestionCount?: number;
    /** xs:boolean */
    Relisted?: boolean;
    /** xs:int */
    QuantityAvailable?: number;
    /** SKUType|xs:string */
    SKU?: string;
    /** xs:string */
    PostalCode?: string;
    /** PictureDetails */
    PictureDetails?: PictureDetails;
    /** VideoDetails */
    VideoDetails?: VideoDetails;
    /** ExtendedProducerResponsibility */
    ExtendedProducerResponsibility?: ExtendedProducerResponsibility;
    /** CustomPolicies */
    CustomPolicies?: CustomPolicies;
    /** xs:int */
    DispatchTimeMax?: number;
    /** SellerContactDetails */
    SellerContactDetails?: RegistrationAddress;
    /** xs:long */
    TotalQuestionCount?: number;
    /** xs:boolean */
    ProxyItem?: boolean;
    /** ExtendedSellerContactDetails */
    ExtendedSellerContactDetails?: ExtendedSellerContactDetails;
    /** xs:int */
    LeadCount?: number;
    /** xs:int */
    NewLeadCount?: number;
    /** ItemSpecifics */
    ItemSpecifics?: ItemSpecifics;
    /** xs:double */
    ClassifiedAdPayPerLeadFee?: number;
    /** ApplyBuyerProtection */
    ApplyBuyerProtection?: ApplyBuyerProtection;
    /** ListingSubtypeCodeType|xs:token|ClassifiedAd,LocalMarketBestOfferOnly,CustomCode */
    ListingSubtype2?: string;
    /** xs:boolean */
    MechanicalCheckAccepted?: boolean;
    /** ItemPolicyViolation */
    ItemPolicyViolation?: ItemPolicyViolation;
    /** xs:string */
    CrossBorderTrade?: Array<string>;
    /** BusinessSellerDetails */
    BusinessSellerDetails?: BusinessSellerDetails;
    /** xs:double */
    BuyerGuaranteePrice?: number;
    /** BuyerRequirementDetails */
    BuyerRequirementDetails?: BuyerRequirementDetails;
    /** ReturnPolicy */
    ReturnPolicy?: ReturnPolicy;
    /** SiteCodeType|xs:token|US,Canada,UK,Australia,Austria,Belgium_French,France,Germany,Italy,Belgium_Dutch,Netherlands,Spain,Switzerland,Taiwan,eBayMotors,HongKong,Singapore,India,China,Ireland,Malaysia,Philippines,Poland,Sweden,CustomCode,CanadaFrench,Russia,Czechia,Cyprus */
    PaymentAllowedSite?: Array<string>;
    /** InventoryTrackingMethodCodeType|xs:token|ItemID,SKU,CustomCode */
    InventoryTrackingMethod?: string;
    /** xs:boolean */
    IntegratedMerchantCreditCardEnabled?: boolean;
    /** Variations */
    Variations?: Variations;
    /** ItemCompatibilityList */
    ItemCompatibilityList?: ItemCompatibilityList;
    /** xs:int */
    ItemCompatibilityCount?: number;
    /** xs:int */
    ConditionID?: number;
    /** ConditionDescriptors */
    ConditionDescriptors?: ConditionDescriptors;
    /** xs:string */
    ConditionDescription?: string;
    /** xs:string */
    ConditionDisplayName?: string;
    /** Regulatory */
    Regulatory?: Regulatory;
    /** xs:string */
    TaxCategory?: string;
    /** QuantityAvailableHintCodeType|xs:token|Limited,MoreThan,CustomCode */
    QuantityAvailableHint?: string;
    /** xs:int */
    QuantityThreshold?: number;
    /** DiscountPriceInfo */
    DiscountPriceInfo?: DiscountPriceInfo;
    /** xs:string */
    SellerProvidedTitle?: string;
    /** xs:string */
    VIN?: string;
    /** xs:string */
    VINLink?: string;
    /** xs:string */
    VRM?: string;
    /** xs:string */
    VRMLink?: string;
    /** SellerProfiles */
    SellerProfiles?: SellerProfiles;
    /** ShippingServiceCostOverrideList */
    ShippingServiceCostOverrideList?: ShippingServiceCostOverrideList;
    /** ShippingPackageDetails */
    ShippingPackageDetails?: ShippingPackageDetails;
    /** xs:boolean */
    TopRatedListing?: boolean;
    /** QuantityRestrictionPerBuyer */
    QuantityRestrictionPerBuyer?: QuantityRestrictionPerBuyer;
    /** xs:double */
    FloorPrice?: number;
    /** xs:double */
    CeilingPrice?: number;
    /** xs:boolean */
    IsIntermediatedShippingEligible?: boolean;
    /** UnitInfo */
    UnitInfo?: UnitInfo;
    /** xs:long */
    RelistParentID?: number;
    /** xs:string */
    ConditionDefinition?: string;
    /** xs:boolean */
    HideFromSearch?: boolean;
    /** ReasonHideFromSearchCodeType|xs:token|DuplicateListing,OutOfStock */
    ReasonHideFromSearch?: string;
    /** PickupInStoreDetails */
    PickupInStoreDetails?: PickupInStoreDetails;
    /** xs:boolean */
    IgnoreQuantity?: boolean;
    /** xs:boolean */
    AvailableForPickupDropOff?: boolean;
    /** xs:boolean */
    EligibleForPickupDropOff?: boolean;
    /** DigitalGoodInfo */
    DigitalGoodInfo?: DigitalGoodInfo;
    /** xs:boolean */
    eBayPlus?: boolean;
    /** xs:boolean */
    eBayPlusEligible?: boolean;
    /** xs:boolean */
    eMailDeliveryAvailable?: boolean;
    /** xs:boolean */
    IsSecureDescription?: boolean;
    /** xs:string */
    MappingReferenceId?: string;
}
