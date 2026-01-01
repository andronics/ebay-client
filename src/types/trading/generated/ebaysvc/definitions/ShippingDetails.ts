import { CalculatedShippingRate } from './CalculatedShippingRate.js';
import { SalesTax } from './SalesTax.js';
import { ShippingServiceOptions } from './ShippingServiceOptions.js';
import { InternationalShippingServiceOption } from './InternationalShippingServiceOption.js';
import { TaxTable } from './TaxTable.js';
import { FlatShippingDiscount } from './FlatShippingDiscount.js';
import { CalculatedShippingDiscount } from './CalculatedShippingDiscount.js';
import { PromotionalShippingDiscountDetails } from './PromotionalShippingDiscountDetails.js';
import { ShipmentTrackingDetails } from './ShipmentTrackingDetails.js';
import { RateTableDetails } from './RateTableDetails.js';

/**
 * ShippingDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingDetails {
    /** xs:boolean */
    AllowPaymentEdit?: boolean;
    /** xs:boolean */
    ApplyShippingDiscount?: boolean;
    /** xs:boolean */
    GlobalShipping?: boolean;
    /** CalculatedShippingRate */
    CalculatedShippingRate?: CalculatedShippingRate;
    /** xs:boolean */
    ChangePaymentInstructions?: boolean;
    /** xs:boolean */
    PaymentEdited?: boolean;
    /** SalesTax */
    SalesTax?: SalesTax;
    /** xs:string */
    ShippingRateErrorMessage?: string;
    /** ShippingRateTypeCodeType|xs:token|OnDemand,DailyPickup,StandardList,Counter,Discounted,CommercialPlus,GoldSilver,PlatTitanium,CustomCode */
    ShippingRateType?: string;
    /** ShippingServiceOptions[] */
    ShippingServiceOptions?: Array<ShippingServiceOptions>;
    /** InternationalShippingServiceOption[] */
    InternationalShippingServiceOption?: Array<InternationalShippingServiceOption>;
    /** ShippingTypeCodeType|xs:token|Flat,Calculated,Freight,Free,NotSpecified,FlatDomesticCalculatedInternational,CalculatedDomesticFlatInternational,FreightFlat,CustomCode */
    ShippingType?: string;
    /** xs:int */
    SellingManagerSalesRecordNumber?: number;
    /** xs:boolean */
    ThirdPartyCheckout?: boolean;
    /** TaxTable */
    TaxTable?: TaxTable;
    /** xs:boolean */
    GetItFast?: boolean;
    /** xs:token */
    ShippingServiceUsed?: string;
    /** xs:double */
    DefaultShippingCost?: number;
    /** xs:string */
    ShippingDiscountProfileID?: string;
    /** FlatShippingDiscount */
    FlatShippingDiscount?: FlatShippingDiscount;
    /** CalculatedShippingDiscount */
    CalculatedShippingDiscount?: CalculatedShippingDiscount;
    /** xs:boolean */
    PromotionalShippingDiscount?: boolean;
    /** xs:string */
    InternationalShippingDiscountProfileID?: string;
    /** InternationalFlatShippingDiscount */
    InternationalFlatShippingDiscount?: FlatShippingDiscount;
    /** InternationalCalculatedShippingDiscount */
    InternationalCalculatedShippingDiscount?: CalculatedShippingDiscount;
    /** xs:boolean */
    InternationalPromotionalShippingDiscount?: boolean;
    /** PromotionalShippingDiscountDetails */
    PromotionalShippingDiscountDetails?: PromotionalShippingDiscountDetails;
    /** xs:string */
    ExcludeShipToLocation?: Array<string>;
    /** xs:double */
    eBayEstimatedLabelCost?: number;
    /** xs:boolean */
    SellerExcludeShipToLocationsPreference?: boolean;
    /** ShipmentTrackingDetails[] */
    ShipmentTrackingDetails?: Array<ShipmentTrackingDetails>;
    /** RateTableDetails */
    RateTableDetails?: RateTableDetails;
}
