
/**
 * ShippingPackageDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingPackageDetails1 {
    /** xs:int */
    PackageID?: number;
    /** xs:string */
    Description?: string;
    /** ShippingPackageCodeType|xs:token|None,Letter,LargeEnvelope,USPSLargePack,VeryLargePack,ExtraLargePack,UPSLetter,USPSFlatRateEnvelope,PackageThickEnvelope,Roll,Europallet,OneWayPallet,BulkyGoods,Furniture,Cars,Motorbikes,Caravan,IndustryVehicles,ParcelOrPaddedEnvelope,SmallCanadaPostBox,MediumCanadaPostBox,LargeCanadaPostBox,SmallCanadaPostBubbleMailer,MediumCanadaPostBubbleMailer,LargeCanadaPostBubbleMailer,PaddedBags,ToughBags,ExpandableToughBags,MailingBoxes,Winepak,CustomCode */
    ShippingPackage?: string;
    /** xs:boolean */
    DefaultValue?: boolean;
    /** xs:boolean */
    DimensionsSupported?: boolean;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
