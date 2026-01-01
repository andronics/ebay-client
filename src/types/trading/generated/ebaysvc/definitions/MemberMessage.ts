import { MessageMedia } from './MessageMedia.js';

/**
 * MemberMessage
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface MemberMessage {
    /** MessageTypeCodeType|xs:token|AskSellerQuestion,ResponseToASQQuestion,ContactEbayMember,ContactTransactionPartner,ResponseToContacteBayMember,ContacteBayMemberViaCommunityLink,CustomCode,All,ContactMyBidder,ContacteBayMemberViaAnonymousEmail,ClassifiedsContactSeller,ClassifiedsBestOffer */
    MessageType?: string;
    /** QuestionTypeCodeType|xs:token|General,Shipping,Payment,MultipleItemShipping,CustomizedSubject,None,CustomCode */
    QuestionType?: string;
    /** xs:boolean */
    EmailCopyToSender?: boolean;
    /** xs:boolean */
    DisplayToPublic?: boolean;
    /** xs:string */
    SenderID?: string;
    /** xs:string */
    SenderEmail?: string;
    /** xs:string */
    RecipientID?: Array<string>;
    /** xs:string */
    Subject?: string;
    /** xs:string */
    Body?: string;
    /** xs:string */
    MessageID?: string;
    /** xs:string */
    ParentMessageID?: string;
    /** MessageMedia[] */
    MessageMedia?: Array<MessageMedia>;
}
