import { MaximumUnpaidItemStrikesCount } from './MaximumUnpaidItemStrikesCount.js';
import { MaximumUnpaidItemStrikesDuration } from './MaximumUnpaidItemStrikesDuration.js';

/**
 * MaximumUnpaidItemStrikesInfo
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MaximumUnpaidItemStrikesInfo1 {
    /** MaximumUnpaidItemStrikesCount */
    MaximumUnpaidItemStrikesCount?: MaximumUnpaidItemStrikesCount;
    /** MaximumUnpaidItemStrikesDuration[] */
    MaximumUnpaidItemStrikesDuration?: Array<MaximumUnpaidItemStrikesDuration>;
}
