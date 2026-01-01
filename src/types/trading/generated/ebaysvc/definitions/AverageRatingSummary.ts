import { AverageRatingDetails } from './AverageRatingDetails.js';

/**
 * AverageRatingSummary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AverageRatingSummary {
    /** FeedbackSummaryPeriodCodeType|xs:token|ThirtyDays,FiftyTwoWeeks,CustomCode */
    FeedbackSummaryPeriod?: string;
    /** AverageRatingDetails[] */
    AverageRatingDetails?: Array<AverageRatingDetails>;
}
