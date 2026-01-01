import { BotBlock } from './BotBlock.js';
import { Pagination } from './Pagination.js';

/** ns:GetMemberMessagesRequestType */
export interface GetMemberMessagesRequest {
    /** DetailLevelCodeType|xs:token|ReturnAll,ItemReturnDescription,ItemReturnAttributes,ItemReturnCategories,ReturnSummary,ReturnHeaders,ReturnMessages */
    DetailLevel?: Array<string>;
    /** xs:string */
    ErrorLanguage?: string;
    /** xs:string */
    MessageID?: string;
    /** xs:string */
    Version?: string;
    /** xs:string */
    EndUserIP?: string;
    /** ErrorHandlingCodeType|xs:token|Legacy,BestEffort,AllOrNothing,FailOnError */
    ErrorHandling?: string;
    /** UUIDType|xs:string */
    InvocationID?: string;
    /** xs:string */
    OutputSelector?: Array<string>;
    /** WarningLevelCodeType|xs:token|Low,High */
    WarningLevel?: string;
    /** BotBlock */
    BotBlock?: BotBlock;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** MessageTypeCodeType|xs:token|AskSellerQuestion,ResponseToASQQuestion,ContactEbayMember,ContactTransactionPartner,ResponseToContacteBayMember,ContacteBayMemberViaCommunityLink,CustomCode,All,ContactMyBidder,ContacteBayMemberViaAnonymousEmail,ClassifiedsContactSeller,ClassifiedsBestOffer */
    MailMessageType?: string;
    /** MessageStatusTypeCodeType|xs:token|Answered,Unanswered,CustomCode */
    MessageStatus?: string;
    /** xs:boolean */
    DisplayToPublic?: boolean;
    /** xs:dateTime */
    StartCreationTime?: Date;
    /** xs:dateTime */
    EndCreationTime?: Date;
    /** Pagination */
    Pagination?: Pagination;
    /** xs:string */
    MemberMessageID?: string;
    /** UserIDType|xs:string */
    SenderID?: string;
}
