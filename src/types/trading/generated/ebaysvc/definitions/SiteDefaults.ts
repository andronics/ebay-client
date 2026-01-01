import { GalleryFeaturedDurations } from './GalleryFeaturedDurations.js';
import { StoreOwnerExtendedListingDurations } from './StoreOwnerExtendedListingDurations.js';
import { ConditionValues } from './ConditionValues.js';
import { DomesticReturnsAcceptedValues } from './DomesticReturnsAcceptedValues.js';
import { InternationalReturnsAcceptedValues } from './InternationalReturnsAcceptedValues.js';
import { DomesticReturnsDurationValues } from './DomesticReturnsDurationValues.js';
import { InternationalReturnsDurationValues } from './InternationalReturnsDurationValues.js';
import { DomesticReturnsShipmentPayeeValues } from './DomesticReturnsShipmentPayeeValues.js';
import { InternationalReturnsShipmentPayeeValues } from './InternationalReturnsShipmentPayeeValues.js';
import { DomesticRefundMethodValues } from './DomesticRefundMethodValues.js';
import { InternationalRefundMethodValues } from './InternationalRefundMethodValues.js';

/**
 * SiteDefaults
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface SiteDefaults {
    /** xs:int */
    ListingDuration?: Array<number>;
    /** xs:boolean */
    ShippingTermsRequired?: boolean;
    /** xs:boolean */
    BestOfferEnabled?: boolean;
    /** xs:boolean */
    DutchBINEnabled?: boolean;
    /** xs:boolean */
    UserConsentRequired?: boolean;
    /** xs:boolean */
    HomePageFeaturedEnabled?: boolean;
    /** xs:boolean */
    ProPackEnabled?: boolean;
    /** xs:boolean */
    BasicUpgradePackEnabled?: boolean;
    /** xs:boolean */
    ValuePackEnabled?: boolean;
    /** xs:boolean */
    ProPackPlusEnabled?: boolean;
    /** AdFormatEnabledCodeType|xs:token|Disabled,Enabled,Only,ClassifiedAdEnabled,ClassifiedAdOnly,LocalMarketBestOfferOnly,CustomCode */
    AdFormatEnabled?: string;
    /** xs:boolean */
    BestOfferCounterEnabled?: boolean;
    /** xs:boolean */
    BestOfferAutoDeclineEnabled?: boolean;
    /** xs:boolean */
    LocalMarketSpecialitySubscription?: boolean;
    /** xs:boolean */
    LocalMarketRegularSubscription?: boolean;
    /** xs:boolean */
    LocalMarketPremiumSubscription?: boolean;
    /** xs:boolean */
    LocalMarketNonSubscription?: boolean;
    /** xs:boolean */
    ExpressEnabled?: boolean;
    /** xs:boolean */
    ExpressPicturesRequired?: boolean;
    /** xs:boolean */
    ExpressConditionRequired?: boolean;
    /** xs:double */
    MinimumReservePrice?: number;
    /** xs:boolean */
    SellerContactDetailsEnabled?: boolean;
    /** xs:boolean */
    TransactionConfirmationRequestEnabled?: boolean;
    /** xs:boolean */
    StoreInventoryEnabled?: boolean;
    /** xs:boolean */
    SkypeMeTransactionalEnabled?: boolean;
    /** xs:boolean */
    SkypeMeNonTransactionalEnabled?: boolean;
    /** xs:string */
    LocalListingDistancesRegular?: string;
    /** xs:string */
    LocalListingDistancesSpecialty?: string;
    /** xs:string */
    LocalListingDistancesNonSubscription?: string;
    /** ClassifiedAdPaymentMethodEnabledCodeType|xs:token|EnabledWithCheckout,EnabledWithoutCheckout,NotSupported,CustomCode */
    ClassifiedAdPaymentMethodEnabled?: string;
    /** xs:boolean */
    ClassifiedAdShippingMethodEnabled?: boolean;
    /** ClassifiedAdBestOfferEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    ClassifiedAdBestOfferEnabled?: string;
    /** xs:boolean */
    ClassifiedAdCounterOfferEnabled?: boolean;
    /** xs:boolean */
    ClassifiedAdAutoDeclineEnabled?: boolean;
    /** xs:boolean */
    ClassifiedAdContactByPhoneEnabled?: boolean;
    /** xs:boolean */
    ClassifiedAdContactByEmailEnabled?: boolean;
    /** xs:boolean */
    SafePaymentRequired?: boolean;
    /** xs:boolean */
    ClassifiedAdPayPerLeadEnabled?: boolean;
    /** ItemSpecificsEnabledCodeType|xs:token|Disabled,Enabled,CustomCode */
    ItemSpecificsEnabled?: string;
    /** xs:boolean */
    BrandMPNIdentifierEnabled?: boolean;
    /** xs:boolean */
    ClassifiedAdAutoAcceptEnabled?: boolean;
    /** xs:boolean */
    BestOfferAutoAcceptEnabled?: boolean;
    /** xs:boolean */
    CrossBorderTradeNorthAmericaEnabled?: boolean;
    /** xs:boolean */
    CrossBorderTradeGBEnabled?: boolean;
    /** xs:boolean */
    CrossBorderTradeAustraliaEnabled?: boolean;
    /** xs:boolean */
    BuyerGuaranteeEnabled?: boolean;
    /** xs:boolean */
    CombinedFixedPriceTreatmentEnabled?: boolean;
    /** GalleryFeaturedDurations */
    GalleryFeaturedDurations?: GalleryFeaturedDurations;
    /** xs:boolean */
    PayPalRequired?: boolean;
    /** AdFormatEnabledCodeType|xs:token|Disabled,Enabled,Only,ClassifiedAdEnabled,ClassifiedAdOnly,LocalMarketBestOfferOnly,CustomCode */
    eBayMotorsProAdFormatEnabled?: string;
    /** xs:boolean */
    eBayMotorsProContactByPhoneEnabled?: boolean;
    /** xs:int */
    eBayMotorsProPhoneCount?: number;
    /** xs:boolean */
    eBayMotorsProContactByAddressEnabled?: boolean;
    /** xs:int */
    eBayMotorsProStreetCount?: number;
    /** xs:boolean */
    eBayMotorsProCompanyNameEnabled?: boolean;
    /** xs:boolean */
    eBayMotorsProContactByEmailEnabled?: boolean;
    /** ClassifiedAdBestOfferEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    eBayMotorsProBestOfferEnabled?: string;
    /** xs:boolean */
    eBayMotorsProAutoAcceptEnabled?: boolean;
    /** xs:boolean */
    eBayMotorsProAutoDeclineEnabled?: boolean;
    /** ClassifiedAdPaymentMethodEnabledCodeType|xs:token|EnabledWithCheckout,EnabledWithoutCheckout,NotSupported,CustomCode */
    eBayMotorsProPaymentMethodCheckOutEnabled?: string;
    /** xs:boolean */
    eBayMotorsProShippingMethodEnabled?: boolean;
    /** xs:boolean */
    eBayMotorsProCounterOfferEnabled?: boolean;
    /** xs:boolean */
    eBayMotorsProSellerContactDetailsEnabled?: boolean;
    /** AdFormatEnabledCodeType|xs:token|Disabled,Enabled,Only,ClassifiedAdEnabled,ClassifiedAdOnly,LocalMarketBestOfferOnly,CustomCode */
    LocalMarketAdFormatEnabled?: string;
    /** xs:boolean */
    LocalMarketContactByPhoneEnabled?: boolean;
    /** xs:int */
    LocalMarketPhoneCount?: number;
    /** xs:boolean */
    LocalMarketContactByAddressEnabled?: boolean;
    /** xs:int */
    LocalMarketStreetCount?: number;
    /** xs:boolean */
    LocalMarketCompanyNameEnabled?: boolean;
    /** xs:boolean */
    LocalMarketContactByEmailEnabled?: boolean;
    /** ClassifiedAdBestOfferEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    LocalMarketBestOfferEnabled?: string;
    /** xs:boolean */
    LocalMarketAutoAcceptEnabled?: boolean;
    /** xs:boolean */
    LocalMarketAutoDeclineEnabled?: boolean;
    /** ClassifiedAdPaymentMethodEnabledCodeType|xs:token|EnabledWithCheckout,EnabledWithoutCheckout,NotSupported,CustomCode */
    LocalMarketPaymentMethodCheckOutEnabled?: string;
    /** xs:boolean */
    LocalMarketShippingMethodEnabled?: boolean;
    /** xs:boolean */
    LocalMarketCounterOfferEnabled?: boolean;
    /** xs:boolean */
    LocalMarketSellerContactDetailsEnabled?: boolean;
    /** xs:int */
    ClassifiedAdPhoneCount?: number;
    /** xs:boolean */
    ClassifiedAdContactByAddressEnabled?: boolean;
    /** xs:int */
    ClassifiedAdStreetCount?: number;
    /** xs:boolean */
    ClassifiedAdCompanyNameEnabled?: boolean;
    /** GeographicExposureCodeType|xs:token|National,LocalOnly,LocalOptional,CustomCode */
    SpecialitySubscription?: string;
    /** GeographicExposureCodeType|xs:token|National,LocalOnly,LocalOptional,CustomCode */
    RegularSubscription?: string;
    /** GeographicExposureCodeType|xs:token|National,LocalOnly,LocalOptional,CustomCode */
    PremiumSubscription?: string;
    /** GeographicExposureCodeType|xs:token|National,LocalOnly,LocalOptional,CustomCode */
    NonSubscription?: string;
    /** xs:boolean */
    PayPalRequiredForStoreOwner?: boolean;
    /** xs:boolean */
    ReviseQuantityAllowed?: boolean;
    /** xs:boolean */
    RevisePriceAllowed?: boolean;
    /** xs:boolean */
    StoreOwnerExtendedListingDurationsEnabled?: boolean;
    /** StoreOwnerExtendedListingDurations */
    StoreOwnerExtendedListingDurations?: StoreOwnerExtendedListingDurations;
    /** xs:boolean */
    ReturnPolicyEnabled?: boolean;
    /** xs:boolean */
    HandlingTimeEnabled?: boolean;
    /** xs:double */
    MaxFlatShippingCost?: number;
    /** xs:boolean */
    MaxFlatShippingCostCBTExempt?: boolean;
    /** xs:double */
    Group1MaxFlatShippingCost?: number;
    /** xs:double */
    Group2MaxFlatShippingCost?: number;
    /** xs:double */
    Group3MaxFlatShippingCost?: number;
    /** BuyerPaymentMethodCodeType|xs:token|None,MOCC,AmEx,PaymentSeeDescription,CCAccepted,PersonalCheck,COD,VisaMC,PaisaPayAccepted,Other,PayPal,Discover,CashOnPickup,MoneyXferAccepted,MoneyXferAcceptedInCheckout,OtherOnlinePayments,Escrow,PrePayDelivery,CODPrePayDelivery,PostalTransfer,CustomCode,LoanCheck,CashInPerson,ELV,PaisaPayEscrow,PaisaPayEscrowEMI,IntegratedMerchantCreditCard,Moneybookers,Paymate,ProPay,PayOnPickup,Diners,StandardPayment,DirectDebit,CreditCard,PayUponInvoice,QIWI,PayPalCredit */
    PaymentMethod?: Array<string>;
    /** xs:boolean */
    VariationsEnabled?: boolean;
    /** AttributeConversionEnabledCodeType|xs:token|NotApplicable,Enabled,Disabled,CustomCode */
    AttributeConversionEnabled?: string;
    /** xs:boolean */
    FreeGalleryPlusEnabled?: boolean;
    /** xs:boolean */
    FreePicturePackEnabled?: boolean;
    /** ItemCompatibilityEnabledCodeType|xs:token|Disabled,ByApplication,BySpecification,CustomCode */
    ItemCompatibilityEnabled?: string;
    /** xs:int */
    MinItemCompatibility?: number;
    /** xs:int */
    MaxItemCompatibility?: number;
    /** ConditionEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    ConditionEnabled?: string;
    /** ConditionValues */
    ConditionValues?: ConditionValues;
    /** SpecialFeatures */
    SpecialFeatures?: ConditionValues;
    /** xs:boolean */
    ValueCategory?: boolean;
    /** ProductCreationEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    ProductCreationEnabled?: string;
    /** ProductIdentiferEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    EANEnabled?: string;
    /** ProductIdentiferEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    ISBNEnabled?: string;
    /** ProductIdentiferEnabledCodeType|xs:token|Disabled,Enabled,Required,CustomCode */
    UPCEnabled?: string;
    /** xs:int */
    MaxGranularFitmentCount?: number;
    /** xs:string */
    CompatibleVehicleType?: string;
    /** ProfileCategoryGroupCodeType|xs:token|Inherit,None,ALL,MOTORS_VEHICLE */
    ShippingProfileCategoryGroup?: string;
    /** ProfileCategoryGroupCodeType|xs:token|Inherit,None,ALL,MOTORS_VEHICLE */
    PaymentProfileCategoryGroup?: string;
    /** ProfileCategoryGroupCodeType|xs:token|Inherit,None,ALL,MOTORS_VEHICLE */
    ReturnPolicyProfileCategoryGroup?: string;
    /** xs:boolean */
    VINSupported?: boolean;
    /** xs:boolean */
    VRMSupported?: boolean;
    /** xs:boolean */
    SellerProvidedTitleSupported?: boolean;
    /** xs:boolean */
    DepositSupported?: boolean;
    /** xs:boolean */
    GlobalShippingEnabled?: boolean;
    /** xs:boolean */
    AdditionalCompatibilityEnabled?: boolean;
    /** xs:boolean */
    PickupDropOffEnabled?: boolean;
    /** xs:boolean */
    DigitalGoodDeliveryEnabled?: boolean;
    /** xs:boolean */
    EpidSupported?: boolean;
    /** xs:boolean */
    KTypeSupported?: boolean;
    /** ProductRequiredEnabledCodeType|xs:token|Disabled,Enabled,CustomCode */
    ProductRequiredEnabled?: string;
    /** DomesticReturnsAcceptedValues */
    DomesticReturnsAcceptedValues?: DomesticReturnsAcceptedValues;
    /** InternationalReturnsAcceptedValues */
    InternationalReturnsAcceptedValues?: InternationalReturnsAcceptedValues;
    /** DomesticReturnsDurationValues */
    DomesticReturnsDurationValues?: DomesticReturnsDurationValues;
    /** InternationalReturnsDurationValues */
    InternationalReturnsDurationValues?: InternationalReturnsDurationValues;
    /** DomesticReturnsShipmentPayeeValues */
    DomesticReturnsShipmentPayeeValues?: DomesticReturnsShipmentPayeeValues;
    /** InternationalReturnsShipmentPayeeValues */
    InternationalReturnsShipmentPayeeValues?: InternationalReturnsShipmentPayeeValues;
    /** DomesticRefundMethodValues */
    DomesticRefundMethodValues?: DomesticRefundMethodValues;
    /** InternationalRefundMethodValues */
    InternationalRefundMethodValues?: InternationalRefundMethodValues;
    /** xs:boolean */
    ReturnPolicyDescriptionEnabled?: boolean;
}
