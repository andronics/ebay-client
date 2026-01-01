
/**
 * FeedbackDetail
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FeedbackDetail {
    /** UserIDType|xs:string */
    CommentingUser?: string;
    /** FeedbackRatingStarCodeType|xs:token|None,Yellow,Blue,Turquoise,Purple,Red,Green,YellowShooting,TurquoiseShooting,PurpleShooting,RedShooting,GreenShooting,SilverShooting,CustomCode */
    FeedbackRatingStar?: string;
    /** xs:int */
    CommentingUserScore?: number;
    /** xs:string */
    CommentText?: string;
    /** xs:dateTime */
    CommentTime?: Date;
    /** CommentTypeCodeType|xs:token|Positive,Neutral,Negative,Withdrawn,IndependentlyWithdrawn,CustomCode */
    CommentType?: string;
    /** xs:string */
    FeedbackResponse?: string;
    /** xs:string */
    Followup?: string;
    /** ItemIDType|xs:string */
    ItemID?: string;
    /** TradingRoleCodeType|xs:token|Buyer,Seller,CustomCode */
    Role?: string;
    /** xs:string */
    ItemTitle?: string;
    /** xs:double */
    ItemPrice?: number;
    /** xs:string */
    FeedbackID?: string;
    /** xs:string */
    TransactionID?: string;
    /** xs:boolean */
    CommentReplaced?: boolean;
    /** xs:boolean */
    ResponseReplaced?: boolean;
    /** xs:boolean */
    FollowUpReplaced?: boolean;
    /** xs:boolean */
    Countable?: boolean;
    /** xs:boolean */
    FeedbackRevised?: boolean;
    /** xs:string */
    OrderLineItemID?: string;
}
