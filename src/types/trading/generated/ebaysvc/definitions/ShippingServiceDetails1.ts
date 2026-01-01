import { DeprecationDetails } from './DeprecationDetails.js';
import { ShippingServicePackageDetails } from './ShippingServicePackageDetails.js';

/**
 * ShippingServiceDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ShippingServiceDetails1 {
    /** xs:string */
    Description?: string;
    /** xs:boolean */
    ExpeditedService?: boolean;
    /** xs:boolean */
    InternationalService?: boolean;
    /** xs:token */
    ShippingService?: string;
    /** xs:int */
    ShippingServiceID?: number;
    /** xs:int */
    ShippingTimeMax?: number;
    /** xs:int */
    ShippingTimeMin?: number;
    /** ShippingTypeCodeType|xs:token|Flat,Calculated,Freight,Free,NotSpecified,FlatDomesticCalculatedInternational,CalculatedDomesticFlatInternational,FreightFlat,CustomCode */
    ServiceType?: Array<string>;
    /** ShippingPackageCodeType|xs:token|None,Letter,LargeEnvelope,USPSLargePack,VeryLargePack,ExtraLargePack,UPSLetter,USPSFlatRateEnvelope,PackageThickEnvelope,Roll,Europallet,OneWayPallet,BulkyGoods,Furniture,Cars,Motorbikes,Caravan,IndustryVehicles,ParcelOrPaddedEnvelope,SmallCanadaPostBox,MediumCanadaPostBox,LargeCanadaPostBox,SmallCanadaPostBubbleMailer,MediumCanadaPostBubbleMailer,LargeCanadaPostBubbleMailer,PaddedBags,ToughBags,ExpandableToughBags,MailingBoxes,Winepak,CustomCode */
    ShippingPackage?: Array<string>;
    /** xs:boolean */
    DimensionsRequired?: boolean;
    /** xs:boolean */
    ValidForSellingFlow?: boolean;
    /** xs:boolean */
    SurchargeApplicable?: boolean;
    /** ShippingCarrierCodeType|xs:token|UPS,USPS,FedEx,DeutschePost,DHL,Hermes,iLoxx,Other,ColiposteDomestic,ColiposteInternational,Chronopost,Correos,Seur,Nacex,FourPX,FourPXCHINA,FourPXExpress,FourPXLTD,SevenLSP,A1CourierServices,ABF,AeroPost,ALLIEDEXPRESS,AMWST,AnPost,APC,ARAMEX,ARVATO,ASM,AustraliaPost,AustralianAirExpress,AVRT,BPost,Bartolini,BELGIANPOST,BKNS,BluePackage,BusinessPost,CanPar,CENF,CEVA,ChinaPost,Chronoexpres,CHUKOU1,ChunghwaPost,CitiPost,CityLink,ClickandQuick,CNWY,Colissimo,CollectPlus,CPC,DAIPost,DayandRoss,DBSchenker,DHLEXPRESS,DHLGlobalMail,DHLEKB,DHLG,DieSchweizerischePost,DPD,DPXThailand,Ducros,EGO,EMF,Exapaq,Fastway,FASTWAYCOURIERS,FedExSmartPost,FLYT,FLYTExpress,FlytExpressUSDirectline,FTFT,FulfilExpressAccStation,FulfilExpresseForCity,FulfilExpressEverydaySource,FulfilExpressiTrimming,GLS,HDUSA,HomeDeliveryNetwork,HongKongPost,HUNTEREXPRESS,IndiaPost,IndonesiaPost,Interlink,InterPost,IoInvio,Iparcel,IsraelPost,JapanPost,KIALA,KoreaPost,LAPOSTE,Landmark,LDSO,LTL,MALAYSIAPOST,MannaFreight,Metapack,MNGTurkey,MondialRelay,MRW,MSI,NEMF,ODFL,OFFD,ONTRACK,OsterreichischePostAG,OVNT,ParcelPool,Parcelforce,Philpost,Pilot,PITD,PocztaPolska,Pocztex,POSTITALIANO,PostNL,PostNordNorway,PosteItaliane,Prestige,Quantium,RETL,RoyalMail,RRUN,SAIA,SDA,SFC,SFCExpress,SINGAPOREPOST,Siodemka,SioliandFontana,SkynetMalaysia,SMARTSEND,Sogetras,Spediamo,SpeeDee,StarTrack,SuntekExpressLTD,SwissPost,TELE,TEMANDO,THAILANDPOST,TNT,TNTEXPRESS,TNTPost,Toll,TPG,TWW,UBI,UKMail,UPSMailInnovations,UPSC,USFG,USPSCeP,USPSPMI,VietnamPost,VITR,WATKINS,Winit,Wise,WNdirect,WPX,YANWEN,Yodel,YRC,CustomCode */
    ShippingCarrier?: Array<string>;
    /** xs:boolean */
    CODService?: boolean;
    /** DeprecationDetails[] */
    DeprecationDetails?: Array<DeprecationDetails>;
    /** xs:int */
    MappedToShippingServiceID?: number;
    /** xs:token */
    CostGroupFlat?: string;
    /** ShippingServicePackageDetails[] */
    ShippingServicePackageDetails?: Array<ShippingServicePackageDetails>;
    /** xs:boolean */
    WeightRequired?: boolean;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
    /** xs:token */
    ShippingCategory?: string;
}
