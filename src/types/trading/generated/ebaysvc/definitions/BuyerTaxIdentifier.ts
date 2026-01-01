
/**
 * BuyerTaxIdentifier
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BuyerTaxIdentifier {
    /** ValueTypeCodeType|xs:token|Decimal,Numeric,Text,ISBN,UPC,EAN,Date,CodiceFiscale,DNI,RussianPassport,CPFTaxID,TurkeyID,NIE,NIF,CEDULA,NIT,DriverLicense,CNPJ,VATIN,CURP,RFC,RUT,CustomCode */
    Type?: string;
    /** xs:string */
    ID?: string;
    /** xs:string */
    Attribute?: Array<string>;
}
