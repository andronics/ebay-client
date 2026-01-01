
/**
 * ShippingPackageDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingPackageDetails {
    /** MeasurementSystemCodeType|xs:token|English,Metric */
    MeasurementUnit?: string;
    /** xs:decimal */
    PackageDepth?: number;
    /** xs:decimal */
    PackageLength?: number;
    /** xs:decimal */
    PackageWidth?: number;
    /** xs:boolean */
    ShippingIrregular?: boolean;
    /** ShippingPackageCodeType|xs:token|None,Letter,LargeEnvelope,USPSLargePack,VeryLargePack,ExtraLargePack,UPSLetter,USPSFlatRateEnvelope,PackageThickEnvelope,Roll,Europallet,OneWayPallet,BulkyGoods,Furniture,Cars,Motorbikes,Caravan,IndustryVehicles,ParcelOrPaddedEnvelope,SmallCanadaPostBox,MediumCanadaPostBox,LargeCanadaPostBox,SmallCanadaPostBubbleMailer,MediumCanadaPostBubbleMailer,LargeCanadaPostBubbleMailer,PaddedBags,ToughBags,ExpandableToughBags,MailingBoxes,Winepak,CustomCode */
    ShippingPackage?: string;
    /** xs:decimal */
    WeightMajor?: number;
    /** xs:decimal */
    WeightMinor?: number;
}
