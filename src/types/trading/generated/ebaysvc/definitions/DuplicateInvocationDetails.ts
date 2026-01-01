
/**
 * DuplicateInvocationDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface DuplicateInvocationDetails {
    /** UUIDType|xs:string */
    DuplicateInvocationID?: string;
    /** InvocationStatusType|xs:token|InProgress,Success,Failure,CustomCode */
    Status?: string;
    /** xs:string */
    InvocationTrackingID?: string;
}
