
/**
 * RecoupmentPolicyDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface RecoupmentPolicyDetails {
    /** xs:boolean */
    EnforcedOnListingSite?: boolean;
    /** xs:boolean */
    EnforcedOnRegistrationSite?: boolean;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
