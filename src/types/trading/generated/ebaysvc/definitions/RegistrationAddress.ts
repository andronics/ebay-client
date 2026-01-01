
/**
 * RegistrationAddress
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface RegistrationAddress {
    /** xs:string */
    Name?: string;
    /** xs:string */
    Street?: string;
    /** xs:string */
    Street1?: string;
    /** xs:string */
    Street2?: string;
    /** xs:string */
    CityName?: string;
    /** xs:string */
    County?: string;
    /** xs:string */
    StateOrProvince?: string;
    /** CountryCodeType|xs:token|AF,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CY,CZ,DK,DJ,DM,DO,TP,EC,EG,SV,GQ,ER,EE,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IL,IT,JM,JP,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MK,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,MS,MA,MZ,MM,NA,NR,NP,NL,AN,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,SH,KN,LC,PM,VC,WS,SM,ST,SA,SN,SC,SL,SG,SK,SI,SB,SO,ZA,GS,ES,LK,SD,SR,SJ,SZ,SE,CH,SY,TW,TJ,TZ,TH,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,YU,ZM,ZW,AA,QM,QN,QO,QP,JE,GG,ZZ,RS,ME,CustomCode */
    Country?: string;
    /** xs:string */
    CountryName?: string;
    /** xs:string */
    Phone?: string;
    /** CountryCodeType|xs:token|AF,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CY,CZ,DK,DJ,DM,DO,TP,EC,EG,SV,GQ,ER,EE,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GN,GW,GY,HT,HM,VA,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IL,IT,JM,JP,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MK,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,MS,MA,MZ,MM,NA,NR,NP,NL,AN,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,SH,KN,LC,PM,VC,WS,SM,ST,SA,SN,SC,SL,SG,SK,SI,SB,SO,ZA,GS,ES,LK,SD,SR,SJ,SZ,SE,CH,SY,TW,TJ,TZ,TH,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VE,VN,VG,VI,WF,EH,YE,YU,ZM,ZW,AA,QM,QN,QO,QP,JE,GG,ZZ,RS,ME,CustomCode */
    PhoneCountryCode?: string;
    /** xs:string */
    PhoneCountryPrefix?: string;
    /** xs:string */
    PhoneAreaOrCityCode?: string;
    /** xs:string */
    PhoneLocalNumber?: string;
    /** xs:string */
    PostalCode?: string;
    /** xs:string */
    AddressID?: string;
    /** AddressOwnerCodeType|xs:token|PayPal,eBay,CustomCode */
    AddressOwner?: string;
    /** AddressStatusCodeType|xs:token|None,Confirmed,Unconfirmed,CustomCode */
    AddressStatus?: string;
    /** xs:string */
    InternationalName?: string;
    /** xs:string */
    InternationalStateAndCity?: string;
    /** xs:string */
    InternationalStreet?: string;
    /** xs:string */
    CompanyName?: string;
    /** AddressRecordTypeCodeType|xs:token|Residential,Business,CustomCode */
    AddressRecordType?: string;
    /** xs:string */
    FirstName?: string;
    /** xs:string */
    LastName?: string;
    /** xs:string */
    Phone2?: string;
    /** xs:string */
    ReferenceID?: string;
    /** xs:string */
    AddressAttribute?: Array<string>;
}
