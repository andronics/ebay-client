import { ResponseDetails } from './ResponseDetails.js';
import { Folder } from './Folder.js';
import { MessageMedia } from './MessageMedia.js';

/**
 * Message
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface Message {
    /** xs:string */
    Sender?: string;
    /** xs:string */
    RecipientUserID?: string;
    /** xs:string */
    SendToName?: string;
    /** xs:string */
    Subject?: string;
    /** MyMessagesMessageIDType|xs:string */
    MessageID?: string;
    /** xs:string */
    ExternalMessageID?: string;
    /** xs:string */
    Text?: string;
    /** xs:boolean */
    Flagged?: boolean;
    /** xs:boolean */
    Read?: boolean;
    /** xs:dateTime */
    ReceiveDate?: Date;
    /** xs:dateTime */
    ExpirationDate?: Date;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** ResponseDetails */
    ResponseDetails?: ResponseDetails;
    /** Folder */
    Folder?: Folder;
    /** xs:string */
    Content?: string;
    /** MessageTypeCodeType|xs:token|AskSellerQuestion,ResponseToASQQuestion,ContactEbayMember,ContactTransactionPartner,ResponseToContacteBayMember,ContacteBayMemberViaCommunityLink,CustomCode,All,ContactMyBidder,ContacteBayMemberViaAnonymousEmail,ClassifiedsContactSeller,ClassifiedsBestOffer */
    MessageType?: string;
    /** ListingStatusCodeType|xs:token|Active,Ended,Completed,CustomCode,Custom */
    ListingStatus?: string;
    /** QuestionTypeCodeType|xs:token|General,Shipping,Payment,MultipleItemShipping,CustomizedSubject,None,CustomCode */
    QuestionType?: string;
    /** xs:boolean */
    Replied?: boolean;
    /** xs:boolean */
    HighPriority?: boolean;
    /** xs:dateTime */
    ItemEndTime?: Date;
    /** xs:string */
    ItemTitle?: string;
    /** MessageMedia[] */
    MessageMedia?: Array<MessageMedia>;
}
