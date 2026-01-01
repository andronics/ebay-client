import { Fees } from './Fees.js';
import { Errors } from './Errors.js';

/**
 * AddItemResponseContainer
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AddItemResponseContainer {
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** xs:dateTime */
    StartTime?: Date;
    /** xs:dateTime */
    EndTime?: Date;
    /** Fees */
    Fees?: Fees;
    /** xs:string */
    CategoryID?: string;
    /** xs:string */
    Category2ID?: string;
    /** xs:string */
    CorrelationID?: string;
    /** Errors[] */
    Errors?: Array<Errors>;
    /** xs:string */
    Message?: string;
    /** DiscountReasonCodeType|xs:token|SpecialOffer,Promotion,CustomCode */
    DiscountReason?: Array<string>;
}
