import { BidRetractionFeedbackPeriodArray } from './BidRetractionFeedbackPeriodArray.js';
import { SellerRatingSummaryArray } from './SellerRatingSummaryArray.js';
import { SellerRoleMetrics } from './SellerRoleMetrics.js';
import { BuyerRoleMetrics } from './BuyerRoleMetrics.js';

/**
 * FeedbackSummary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FeedbackSummary {
    /** BidRetractionFeedbackPeriodArray */
    BidRetractionFeedbackPeriodArray?: BidRetractionFeedbackPeriodArray;
    /** NegativeFeedbackPeriodArray */
    NegativeFeedbackPeriodArray?: BidRetractionFeedbackPeriodArray;
    /** NeutralFeedbackPeriodArray */
    NeutralFeedbackPeriodArray?: BidRetractionFeedbackPeriodArray;
    /** PositiveFeedbackPeriodArray */
    PositiveFeedbackPeriodArray?: BidRetractionFeedbackPeriodArray;
    /** TotalFeedbackPeriodArray */
    TotalFeedbackPeriodArray?: BidRetractionFeedbackPeriodArray;
    /** xs:int */
    NeutralCommentCountFromSuspendedUsers?: number;
    /** xs:int */
    UniqueNegativeFeedbackCount?: number;
    /** xs:int */
    UniquePositiveFeedbackCount?: number;
    /** xs:int */
    UniqueNeutralFeedbackCount?: number;
    /** SellerRatingSummaryArray */
    SellerRatingSummaryArray?: SellerRatingSummaryArray;
    /** SellerRoleMetrics */
    SellerRoleMetrics?: SellerRoleMetrics;
    /** BuyerRoleMetrics */
    BuyerRoleMetrics?: BuyerRoleMetrics;
}
