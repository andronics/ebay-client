
/**
 * Program
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Program {
    /** xs:string */
    ProgramName?: string;
    /** SiteCodeType|xs:token|US,Canada,UK,Australia,Austria,Belgium_French,France,Germany,Italy,Belgium_Dutch,Netherlands,Spain,Switzerland,Taiwan,eBayMotors,HongKong,Singapore,India,China,Ireland,Malaysia,Philippines,Poland,Sweden,CustomCode,CanadaFrench,Russia,Czechia,Cyprus */
    Site?: string;
    /** xs:dateTime */
    ExpiryDate?: Date;
}
