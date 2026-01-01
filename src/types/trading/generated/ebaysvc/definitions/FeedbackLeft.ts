
/**
 * FeedbackLeft
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface FeedbackLeft {
    /** xs:string */
    CommentText?: string;
    /** CommentTypeCodeType|xs:token|Positive,Neutral,Negative,Withdrawn,IndependentlyWithdrawn,CustomCode */
    CommentType?: string;
    /** UserIDType|xs:string */
    TargetUser?: string;
}
