import { ContactHoursDetails } from './ContactHoursDetails.js';

/**
 * ExtendedSellerContactDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface ExtendedSellerContactDetails {
    /** ContactHoursDetails */
    ContactHoursDetails?: ContactHoursDetails;
    /** xs:boolean */
    ClassifiedAdContactByEmailEnabled?: boolean;
}
