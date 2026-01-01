import { RegistrationAddress } from './RegistrationAddress.js';
import { BuyerInfo } from './BuyerInfo.js';
import { SellerInfo } from './SellerInfo.js';
import { BiddingSummary } from './BiddingSummary.js';
import { Membership } from './Membership.js';

/**
 * Seller
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Seller {
    /** xs:boolean */
    AboutMePage?: boolean;
    /** xs:string */
    EIASToken?: string;
    /** xs:string */
    Email?: string;
    /** xs:int */
    FeedbackScore?: number;
    /** xs:int */
    UniqueNegativeFeedbackCount?: number;
    /** xs:int */
    UniquePositiveFeedbackCount?: number;
    /** xs:float */
    PositiveFeedbackPercent?: number;
    /** xs:boolean */
    FeedbackPrivate?: boolean;
    /** FeedbackRatingStarCodeType|xs:token|None,Yellow,Blue,Turquoise,Purple,Red,Green,YellowShooting,TurquoiseShooting,PurpleShooting,RedShooting,GreenShooting,SilverShooting,CustomCode */
    FeedbackRatingStar?: string;
    /** xs:boolean */
    IDVerified?: boolean;
    /** xs:boolean */
    eBayGoodStanding?: boolean;
    /** xs:boolean */
    NewUser?: boolean;
    /** RegistrationAddress */
    RegistrationAddress?: RegistrationAddress;
    /** xs:dateTime */
    RegistrationDate?: Date;
    /** SiteCodeType|xs:token|US,Canada,UK,Australia,Austria,Belgium_French,France,Germany,Italy,Belgium_Dutch,Netherlands,Spain,Switzerland,Taiwan,eBayMotors,HongKong,Singapore,India,China,Ireland,Malaysia,Philippines,Poland,Sweden,CustomCode,CanadaFrench,Russia,Czechia,Cyprus */
    Site?: string;
    /** UserStatusCodeType|xs:token|Unknown,Suspended,Confirmed,Unconfirmed,Ghost,InMaintenance,Deleted,CreditCardVerify,AccountOnHold,Merged,RegistrationCodeMailOut,TermPending,UnconfirmedHalfOptIn,CreditCardVerifyHalfOptIn,UnconfirmedPassport,CreditCardVerifyPassport,UnconfirmedExpress,Guest,CustomCode */
    Status?: string;
    /** UserIDType|xs:string */
    UserID?: string;
    /** xs:boolean */
    UserIDChanged?: boolean;
    /** xs:dateTime */
    UserIDLastChanged?: Date;
    /** VATStatusCodeType|xs:token|NoVATTax,VATTax,VATExempt,CustomCode */
    VATStatus?: string;
    /** BuyerInfo */
    BuyerInfo?: BuyerInfo;
    /** SellerInfo */
    SellerInfo?: SellerInfo;
    /** BusinessRoleType|xs:token|Shopper,FullMarketPlaceParticipant */
    BusinessRole?: string;
    /** EBaySubscriptionTypeCodeType|xs:token|SellerAssistant,SellerAssistantPro,EBayStoreBasic,EBayStoreFeatured,EBayStoreAnchor,SellingManager,SellingManagerPro,PictureManagerLevel1,PictureManagerLevel2,PictureManagerLevel3,PictureManagerLevel4,PictureManagerLevel5,PictureManagerLevel6,PictureManagerLevel7,SellerReportsBasic,SellerReportsPlus,FileExchange,LocalMarketSpecialty,LocalMarketRegular,LocalMarketPremium,CustomCode */
    UserSubscription?: Array<string>;
    /** xs:boolean */
    eBayWikiReadOnly?: boolean;
    /** xs:int */
    TUVLevel?: number;
    /** xs:string */
    VATID?: string;
    /** BiddingSummary */
    BiddingSummary?: BiddingSummary;
    /** xs:boolean */
    UserAnonymized?: boolean;
    /** xs:int */
    UniqueNeutralFeedbackCount?: number;
    /** xs:boolean */
    EnterpriseSeller?: boolean;
    /** xs:boolean */
    QualifiesForSelling?: boolean;
    /** ShippingAddress */
    ShippingAddress?: RegistrationAddress;
    /** Membership */
    Membership?: Membership;
    /** xs:string */
    UserFirstName?: string;
    /** xs:string */
    UserLastName?: string;
}
