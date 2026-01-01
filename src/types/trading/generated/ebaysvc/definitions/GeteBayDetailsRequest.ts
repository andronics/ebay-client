import { BotBlock } from './BotBlock.js';

/** ns:GeteBayDetailsRequestType */
export interface GeteBayDetailsRequest {
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
    /** DetailNameCodeType|xs:token|CountryDetails,CurrencyDetails,PaymentOptionDetails,RegionDetails,ShippingLocationDetails,ShippingServiceDetails,SiteDetails,TaxJurisdiction,URLDetails,TimeZoneDetails,RegionOfOriginDetails,DispatchTimeMaxDetails,ItemSpecificDetails,UnitOfMeasurementDetails,ShippingPackageDetails,CustomCode,ShippingCarrierDetails,ListingStartPriceDetails,ReturnPolicyDetails,BuyerRequirementDetails,ListingFeatureDetails,VariationDetails,ExcludeShippingLocationDetails,RecoupmentPolicyDetails,ShippingCategoryDetails,ProductDetails */
    DetailName?: Array<string>;
}
