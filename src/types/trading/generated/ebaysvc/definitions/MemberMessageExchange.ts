import { Item } from './Item.js';
import { MemberMessage } from './MemberMessage.js';
import { MessageMedia } from './MessageMedia.js';

/**
 * MemberMessageExchange
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MemberMessageExchange {
    /** Item */
    Item?: Item;
    /** Question */
    Question?: MemberMessage;
    /** xs:string */
    Response?: Array<string>;
    /** MessageStatusTypeCodeType|xs:token|Answered,Unanswered,CustomCode */
    MessageStatus?: string;
    /** xs:dateTime */
    CreationDate?: Date;
    /** xs:dateTime */
    LastModifiedDate?: Date;
    /** MessageMedia[] */
    MessageMedia?: Array<MessageMedia>;
}
