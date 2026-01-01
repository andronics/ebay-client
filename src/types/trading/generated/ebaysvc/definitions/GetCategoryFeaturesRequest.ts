import { BotBlock } from './BotBlock.js';

/** ns:GetCategoryFeaturesRequestType */
export interface GetCategoryFeaturesRequest {
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
    /** xs:string */
    CategoryID?: string;
    /** xs:int */
    LevelLimit?: number;
    /** xs:boolean */
    ViewAllNodes?: boolean;
    /** FeatureIDCodeType|xs:token|ListingDurations,BestOfferEnabled,DutchBINEnabled,ShippingTermsRequired,UserConsentRequired,HomePageFeaturedEnabled,AdFormatEnabled,DigitalDeliveryEnabled,BestOfferCounterEnabled,BestOfferAutoDeclineEnabled,ProPack,BasicUpgradePack,ValuePack,ProPackPlus,LocalMarketSpecialitySubscription,LocalMarketRegularSubscription,LocalMarketPremiumSubscription,LocalMarketNonSubscription,ExpressEnabled,ExpressPicturesRequired,ExpressConditionRequired,SellerContactDetailsEnabled,CustomCode,MinimumReservePrice,TransactionConfirmationRequestEnabled,StoreInventoryEnabled,LocalListingDistances,SkypeMeTransactionalEnabled,SkypeMeNonTransactionalEnabled,ClassifiedAdPaymentMethodEnabled,ClassifiedAdShippingMethodEnabled,ClassifiedAdBestOfferEnabled,ClassifiedAdCounterOfferEnabled,ClassifiedAdAutoDeclineEnabled,ClassifiedAdContactByEmailEnabled,ClassifiedAdContactByPhoneEnabled,SafePaymentRequired,MaximumBestOffersAllowed,ClassifiedAdMaximumBestOffersAllowed,ClassifiedAdContactByEmailAvailable,ClassifiedAdPayPerLeadEnabled,ItemSpecificsEnabled,PaisaPayFullEscrowEnabled,ISBNIdentifierEnabled,UPCIdentifierEnabled,EANIdentifierEnabled,BrandMPNIdentifierEnabled,ClassifiedAdAutoAcceptEnabled,BestOfferAutoAcceptEnabled,CrossBorderTradeEnabled,PayPalBuyerProtectionEnabled,BuyerGuaranteeEnabled,INEscrowWorkflowTimeline,CombinedFixedPriceTreatment,GalleryFeaturedDurations,PayPalRequired,eBayMotorsProAdFormatEnabled,eBayMotorsProContactByPhoneEnabled,eBayMotorsProContactByAddressEnabled,eBayMotorsProCompanyNameEnabled,eBayMotorsProContactByEmailEnabled,eBayMotorsProBestOfferEnabled,eBayMotorsProAutoAcceptEnabled,eBayMotorsProAutoDeclineEnabled,eBayMotorsProPaymentMethodCheckOutEnabled,eBayMotorsProShippingMethodEnabled,eBayMotorsProCounterOfferEnabled,eBayMotorsProSellerContactDetailsEnabled,LocalMarketAdFormatEnabled,LocalMarketContactByPhoneEnabled,LocalMarketContactByAddressEnabled,LocalMarketCompanyNameEnabled,LocalMarketContactByEmailEnabled,LocalMarketBestOfferEnabled,LocalMarketAutoAcceptEnabled,LocalMarketAutoDeclineEnabled,LocalMarketPaymentMethodCheckOutEnabled,LocalMarketShippingMethodEnabled,LocalMarketCounterOfferEnabled,LocalMarketSellerContactDetailsEnabled,ClassifiedAdContactByAddressEnabled,ClassifiedAdCompanyNameEnabled,SpecialitySubscription,RegularSubscription,PremiumSubscription,NonSubscription,IntangibleEnabled,PayPalRequiredForStoreOwner,ReviseQuantityAllowed,RevisePriceAllowed,StoreOwnerExtendedListingDurationsEnabled,StoreOwnerExtendedListingDurations,ReturnPolicyEnabled,HandlingTimeEnabled,PaymentMethods,MaxFlatShippingCost,MaxFlatShippingCostCBTExempt,Group1MaxFlatShippingCost,Group2MaxFlatShippingCost,Group3MaxFlatShippingCost,VariationsEnabled,AttributeConversionEnabled,FreeGalleryPlusEnabled,FreePicturePackEnabled,CompatibilityEnabled,MinCompatibleApplications,MaxCompatibleApplications,ConditionEnabled,ConditionValues,ValueCategory,ProductCreationEnabled,EANEnabled,ISBNEnabled,UPCEnabled,MaxGranularFitmentCount,CompatibleVehicleType,PaymentOptionsGroup,ShippingProfileCategoryGroup,PaymentProfileCategoryGroup,ReturnPolicyProfileCategoryGroup,VINSupported,VRMSupported,SellerProvidedTitleSupported,DepositSupported,GlobalShippingEnabled,AdditionalCompatibilityEnabled,PickupDropOffEnabled,DigitalGoodDeliveryEnabled,EpidSupported,KTypeSupported,ProductRequiredEnabled,DomesticReturnsAcceptedValues,InternationalReturnsAcceptedValues,DomesticReturnsDurationValues,InternationalReturnsDurationValues,DomesticReturnsShipmentPayeeValues,InternationalReturnsShipmentPayeeValues,DomesticRefundMethodValues,InternationalRefundMethodValues,ReturnPolicyDescriptionEnabled */
    FeatureID?: Array<string>;
    /** xs:boolean */
    AllFeaturesForCategory?: boolean;
}
