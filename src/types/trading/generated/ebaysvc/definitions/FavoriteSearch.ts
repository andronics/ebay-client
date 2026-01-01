
/**
 * FavoriteSearch
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FavoriteSearch {
    /** xs:string */
    SearchName?: string;
    /** xs:string */
    SearchQuery?: string;
    /** xs:string */
    QueryKeywords?: string;
    /** xs:string */
    CategoryID?: string;
    /** SimpleItemSortCodeType|xs:token|BestMatch,CustomCode,EndTime,BidCount,Country,CurrentBid,Distance,StartDate,BestMatchCategoryGroup,PricePlusShipping */
    ItemSort?: string;
    /** SortOrderCodeType|xs:token|Ascending,Descending,CustomCode */
    SortOrder?: string;
    /** xs:dateTime */
    EndTimeFrom?: Date;
    /** xs:dateTime */
    EndTimeTo?: Date;
    /** xs:int */
    MaxDistance?: number;
    /** xs:string */
    PostalCode?: string;
    /** ItemTypeCodeType|xs:token|AuctionItemsOnly,FixedPricedItem,AllItems,StoreInventoryOnly,FixedPriceExcludeStoreInventory,ExcludeStoreInventory,AllItemTypes,AllFixedPriceItemTypes,CustomCode,ClassifiedItemsOnly,AdFormat */
    ItemType?: string;
    /** xs:double */
    PriceMax?: number;
    /** xs:double */
    PriceMin?: number;
    /** CurrencyCodeType|xs:token|AFA,ALL,DZD,ADP,AOA,ARS,AMD,AWG,AZM,BSD,BHD,BDT,BBD,BYR,BZD,BMD,BTN,INR,BOV,BOB,BAM,BWP,BRL,BND,BGL,BGN,BIF,KHR,CAD,CVE,KYD,XAF,CLF,CLP,CNY,COP,KMF,CDF,CRC,HRK,CUP,CYP,CZK,DKK,DJF,DOP,TPE,ECV,ECS,EGP,SVC,ERN,EEK,ETB,FKP,FJD,GMD,GEL,GHC,GIP,GTQ,GNF,GWP,GYD,HTG,HNL,HKD,HUF,ISK,IDR,IRR,IQD,ILS,JMD,JPY,JOD,KZT,KES,AUD,KPW,KRW,KWD,KGS,LAK,LVL,LBP,LSL,LRD,LYD,CHF,LTL,MOP,MKD,MGF,MWK,MYR,MVR,MTL,EUR,MRO,MUR,MXN,MXV,MDL,MNT,XCD,MZM,MMK,ZAR,NAD,NPR,ANG,XPF,NZD,NIO,NGN,NOK,OMR,PKR,PAB,PGK,PYG,PEN,PHP,PLN,USD,QAR,ROL,RUB,RUR,RWF,SHP,WST,STD,SAR,SCR,SLL,SGD,SKK,SIT,SBD,SOS,LKR,SDD,SRG,SZL,SEK,SYP,TWD,TJS,TZS,THB,XOF,TOP,TTD,TND,TRL,TMM,UGX,UAH,AED,GBP,USS,USN,UYU,UZS,VUV,VEB,VND,MAD,YER,YUM,ZMK,ZWD,ATS,RON,CustomCode */
    Currency?: string;
    /** xs:int */
    BidCountMax?: number;
    /** xs:int */
    BidCountMin?: number;
    /** SearchFlagCodeType|xs:token|Charity,Gift,NowAndNew,LocalSearch,FreeShipping,Gallery,Picture,GetItFast,Lot,GermanMotorsSearchable,WorldOfGood,DigitalDelivery,CustomCode */
    SearchFlag?: Array<string>;
    /** PreferredLocationCodeType|xs:token|ListedInCurrencyImplied,LocatedInCountryImplied,AvailableInCountryImplied,SiteImplied,BelgiumListing,CustomCode */
    PreferredLocation?: string;
    /** xs:string */
    SellerID?: Array<string>;
    /** xs:string */
    SellerIDExclude?: Array<string>;
    /** CountryCodeType|xs:token|AF,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CY,CZ,DK,DJ,DM,DO,TP,EC,EG,SV,GQ,ER,EE,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IL,IT,JM,JP,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MK,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,MS,MA,MZ,MM,NA,NR,NP,NL,AN,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,SH,KN,LC,PM,VC,WS,SM,ST,SA,SN,SC,SL,SG,SK,SI,SB,SO,ZA,GS,ES,LK,SD,SR,SJ,SZ,SE,CH,SY,TW,TJ,TZ,TH,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,YU,ZM,ZW,AA,QM,QN,QO,QP,JE,GG,ZZ,RS,ME,CustomCode */
    ItemsAvailableTo?: string;
    /** CountryCodeType|xs:token|AF,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CY,CZ,DK,DJ,DM,DO,TP,EC,EG,SV,GQ,ER,EE,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IL,IT,JM,JP,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MK,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,MS,MA,MZ,MM,NA,NR,NP,NL,AN,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,SH,KN,LC,PM,VC,WS,SM,ST,SA,SN,SC,SL,SG,SK,SI,SB,SO,ZA,GS,ES,LK,SD,SR,SJ,SZ,SE,CH,SY,TW,TJ,TZ,TH,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,YU,ZM,ZW,AA,QM,QN,QO,QP,JE,GG,ZZ,RS,ME,CustomCode */
    ItemsLocatedIn?: string;
    /** SellerBusinessCodeType|xs:token|Undefined,Private,Commercial,CustomCode */
    SellerBusinessType?: string;
    /** ItemConditionCodeType|xs:token|New,Used,CustomCode */
    Condition?: string;
    /** xs:int */
    Quantity?: number;
    /** QuantityOperatorCodeType|xs:token|LessThan,LessThanOrEqual,Equal,GreaterThan,GreaterThanOrEqual,CustomCode */
    QuantityOperator?: string;
}
