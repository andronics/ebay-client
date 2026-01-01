import { MaximumBuyerPolicyViolations } from './MaximumBuyerPolicyViolations.js';
import { MaximumItemRequirements1 } from './MaximumItemRequirements1.js';
import { MaximumUnpaidItemStrikesInfo1 } from './MaximumUnpaidItemStrikesInfo1.js';
import { MinimumFeedbackScore } from './MinimumFeedbackScore.js';

/**
 * BuyerRequirementDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BuyerRequirementDetails1 {
    /** xs:boolean */
    LinkedPayPalAccount?: boolean;
    /** MaximumBuyerPolicyViolations */
    MaximumBuyerPolicyViolations?: MaximumBuyerPolicyViolations;
    /** MaximumItemRequirements */
    MaximumItemRequirements?: MaximumItemRequirements1;
    /** MaximumUnpaidItemStrikesInfo */
    MaximumUnpaidItemStrikesInfo?: MaximumUnpaidItemStrikesInfo1;
    /** MinimumFeedbackScore */
    MinimumFeedbackScore?: MinimumFeedbackScore;
    /** xs:boolean */
    ShipToRegistrationCountry?: boolean;
    /** xs:string */
    DetailVersion?: string;
    /** xs:dateTime */
    UpdateTime?: Date;
}
