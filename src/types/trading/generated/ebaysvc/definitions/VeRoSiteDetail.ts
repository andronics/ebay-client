import { ReasonCodeDetail } from './ReasonCodeDetail.js';

/**
 * VeROSiteDetail
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface VeRoSiteDetail {
    /** SiteCodeType|xs:token|US,Canada,UK,Australia,Austria,Belgium_French,France,Germany,Italy,Belgium_Dutch,Netherlands,Spain,Switzerland,Taiwan,eBayMotors,HongKong,Singapore,India,China,Ireland,Malaysia,Philippines,Poland,Sweden,CustomCode,CanadaFrench,Russia,Czechia,Cyprus */
    Site?: string;
    /** ReasonCodeDetail[] */
    ReasonCodeDetail?: Array<ReasonCodeDetail>;
}
