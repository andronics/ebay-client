import { ErrorParameters } from './ErrorParameters.js';

/**
 * Errors
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Errors {
    /** xs:string */
    ShortMessage?: string;
    /** xs:string */
    LongMessage?: string;
    /** xs:token */
    ErrorCode?: string;
    /** xs:boolean */
    UserDisplayHint?: boolean;
    /** SeverityCodeType|xs:token|Warning,Error,CustomCode */
    SeverityCode?: string;
    /** ErrorParameters[] */
    ErrorParameters?: Array<ErrorParameters>;
    /** ErrorClassificationCodeType|xs:token|RequestError,SystemError,CustomCode */
    ErrorClassification?: string;
}
