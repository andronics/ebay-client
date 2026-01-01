import { MemberMessage } from './MemberMessage.js';

/**
 * AddMemberMessagesAAQToBidderRequestContainer
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface AddMemberMessagesAaqToBidderRequestContainer {
    /** xs:string */
    CorrelationID?: string;
    /** xs:string */
    ItemID?: string;
    /** MemberMessage */
    MemberMessage?: MemberMessage;
}
