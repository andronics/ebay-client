import { MaximumItemRequirements } from './MaximumItemRequirements.js';
import { MaximumUnpaidItemStrikesInfo } from './MaximumUnpaidItemStrikesInfo.js';

/**
 * BuyerRequirementDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BuyerRequirementDetails {
    /** xs:boolean */
    ShipToRegistrationCountry?: boolean;
    /** xs:boolean */
    ZeroFeedbackScore?: boolean;
    /** MaximumItemRequirements */
    MaximumItemRequirements?: MaximumItemRequirements;
    /** MaximumUnpaidItemStrikesInfo */
    MaximumUnpaidItemStrikesInfo?: MaximumUnpaidItemStrikesInfo;
}
