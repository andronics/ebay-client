import { Errors } from './Errors.js';
import { DuplicateInvocationDetails } from './DuplicateInvocationDetails.js';
import { BotBlock1 } from './BotBlock1.js';
import { CountryDetails } from './CountryDetails.js';
import { CurrencyDetails } from './CurrencyDetails.js';
import { DispatchTimeMaxDetails } from './DispatchTimeMaxDetails.js';
import { PaymentOptionDetails } from './PaymentOptionDetails.js';
import { RegionDetails } from './RegionDetails.js';
import { ShippingLocationDetails } from './ShippingLocationDetails.js';
import { ShippingServiceDetails1 } from './ShippingServiceDetails1.js';
import { SiteDetails } from './SiteDetails.js';
import { TaxJurisdiction } from './TaxJurisdiction.js';
import { UrlDetails } from './UrlDetails.js';
import { TimeZoneDetails } from './TimeZoneDetails.js';
import { ItemSpecificDetails } from './ItemSpecificDetails.js';
import { RegionOfOriginDetails } from './RegionOfOriginDetails.js';
import { ShippingPackageDetails1 } from './ShippingPackageDetails1.js';
import { ShippingCarrierDetails } from './ShippingCarrierDetails.js';
import { ReturnPolicyDetails } from './ReturnPolicyDetails.js';
import { ListingStartPriceDetails } from './ListingStartPriceDetails.js';
import { BuyerRequirementDetails1 } from './BuyerRequirementDetails1.js';
import { ListingFeatureDetails } from './ListingFeatureDetails.js';
import { VariationDetails } from './VariationDetails.js';
import { ExcludeShippingLocationDetails } from './ExcludeShippingLocationDetails.js';
import { RecoupmentPolicyDetails } from './RecoupmentPolicyDetails.js';
import { ShippingCategoryDetails } from './ShippingCategoryDetails.js';
import { ProductDetails } from './ProductDetails.js';

/** ns:GeteBayDetailsResponseType */
export interface GeteBayDetailsResponse {
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
    /** CountryDetails[] */
    CountryDetails?: Array<CountryDetails>;
    /** CurrencyDetails[] */
    CurrencyDetails?: Array<CurrencyDetails>;
    /** DispatchTimeMaxDetails[] */
    DispatchTimeMaxDetails?: Array<DispatchTimeMaxDetails>;
    /** PaymentOptionDetails[] */
    PaymentOptionDetails?: Array<PaymentOptionDetails>;
    /** RegionDetails[] */
    RegionDetails?: Array<RegionDetails>;
    /** ShippingLocationDetails[] */
    ShippingLocationDetails?: Array<ShippingLocationDetails>;
    /** ShippingServiceDetails[] */
    ShippingServiceDetails?: Array<ShippingServiceDetails1>;
    /** SiteDetails[] */
    SiteDetails?: Array<SiteDetails>;
    /** TaxJurisdiction[] */
    TaxJurisdiction?: Array<TaxJurisdiction>;
    /** URLDetails[] */
    URLDetails?: Array<UrlDetails>;
    /** TimeZoneDetails[] */
    TimeZoneDetails?: Array<TimeZoneDetails>;
    /** ItemSpecificDetails[] */
    ItemSpecificDetails?: Array<ItemSpecificDetails>;
    /** RegionOfOriginDetails[] */
    RegionOfOriginDetails?: Array<RegionOfOriginDetails>;
    /** ShippingPackageDetails[] */
    ShippingPackageDetails?: Array<ShippingPackageDetails1>;
    /** ShippingCarrierDetails[] */
    ShippingCarrierDetails?: Array<ShippingCarrierDetails>;
    /** ReturnPolicyDetails */
    ReturnPolicyDetails?: ReturnPolicyDetails;
    /** ListingStartPriceDetails[] */
    ListingStartPriceDetails?: Array<ListingStartPriceDetails>;
    /** BuyerRequirementDetails[] */
    BuyerRequirementDetails?: Array<BuyerRequirementDetails1>;
    /** ListingFeatureDetails[] */
    ListingFeatureDetails?: Array<ListingFeatureDetails>;
    /** VariationDetails */
    VariationDetails?: VariationDetails;
    /** ExcludeShippingLocationDetails[] */
    ExcludeShippingLocationDetails?: Array<ExcludeShippingLocationDetails>;
    /** xs:dateTime */
    UpdateTime?: Date;
    /** RecoupmentPolicyDetails[] */
    RecoupmentPolicyDetails?: Array<RecoupmentPolicyDetails>;
    /** ShippingCategoryDetails[] */
    ShippingCategoryDetails?: Array<ShippingCategoryDetails>;
    /** ProductDetails */
    ProductDetails?: ProductDetails;
}
