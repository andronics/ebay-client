import { ItemBidDetails } from './ItemBidDetails.js';

/**
 * BiddingSummary
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface BiddingSummary {
    /** xs:int */
    SummaryDays?: number;
    /** xs:int */
    TotalBids?: number;
    /** xs:int */
    BidActivityWithSeller?: number;
    /** xs:int */
    BidsToUniqueSellers?: number;
    /** xs:int */
    BidsToUniqueCategories?: number;
    /** xs:int */
    BidRetractions?: number;
    /** ItemBidDetails[] */
    ItemBidDetails?: Array<ItemBidDetails>;
}
