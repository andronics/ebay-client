
/**
 * ShippingServicePackageDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingServicePackageDetails {
    /** ShippingPackageCodeType|xs:token|None,Letter,LargeEnvelope,USPSLargePack,VeryLargePack,ExtraLargePack,UPSLetter,USPSFlatRateEnvelope,PackageThickEnvelope,Roll,Europallet,OneWayPallet,BulkyGoods,Furniture,Cars,Motorbikes,Caravan,IndustryVehicles,ParcelOrPaddedEnvelope,SmallCanadaPostBox,MediumCanadaPostBox,LargeCanadaPostBox,SmallCanadaPostBubbleMailer,MediumCanadaPostBubbleMailer,LargeCanadaPostBubbleMailer,PaddedBags,ToughBags,ExpandableToughBags,MailingBoxes,Winepak,CustomCode */
    Name?: string;
    /** xs:boolean */
    DimensionsRequired?: boolean;
}
