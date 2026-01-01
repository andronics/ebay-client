import { Errors } from './Errors.js';

/**
 * EndItemResponseContainer
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface EndItemResponseContainer {
    /** xs:dateTime */
    EndTime?: Date;
    /** xs:string */
    CorrelationID?: string;
    /** Errors[] */
    Errors?: Array<Errors>;
}
