
/**
 * NotificationDetails
 * @targetNSAlias `ns`
 * @targetNamespace `urn:ebay:apis:eBLBaseComponents`
 */
export interface NotificationDetails {
    /** xs:anyURI */
    DeliveryURL?: string;
    /** xs:string */
    ReferenceID?: string;
    /** xs:dateTime */
    ExpirationTime?: Date;
    /** NotificationEventTypeCodeType|xs:token|OutBid,EndOfAuction,AuctionCheckoutComplete,CheckoutBuyerRequestsTotal,Feedback,FeedbackForSeller,FixedPriceTransaction,SecondChanceOffer,AskSellerQuestion,ItemListed,ItemRevised,BestOffer,MyMessagesAlertHeader,MyMessagesAlert,MyMessageseBayMessageHeader,MyMessageseBayMessage,MyMessagesM2MMessageHeader,MyMessagesM2MMessage,INRBuyerOpenedDispute,INRBuyerRespondedToDispute,INRBuyerClosedDispute,INRSellerRespondedToDispute,Checkout,WatchedItemEndingSoon,ItemClosed,ItemSuspended,ItemSold,ItemExtended,UserIDChanged,ThirdPartyCartCheckout,ItemRevisedAddCharity,ItemAddedToWatchList,ItemRemovedFromWatchList,ItemAddedToBidGroup,ItemRemovedFromBidGroup,FeedbackLeft,FeedbackReceived,FeedbackStarChanged,BidPlaced,BidReceived,ItemWon,ItemLost,ItemUnsold,CounterOfferReceived,BestOfferDeclined,BestOfferPlaced,AddToWatchList,PlaceOffer,RemoveFromWatchList,AddToBidGroup,RemoveFromBidGroup,ItemsCanceled,TokenRevocation,CustomCode,ItemMarkedShipped,ItemMarkedPaid,EBPMyResponseDue,EBPOtherPartyResponseDue,EBPEscalatedCase,EBPAppealedCase,EBPMyPaymentDue,EBPPaymentDone,EBPClosedAppeal,EBPClosedCase,MyMessagesHighPriorityMessage,MyMessagesHighPriorityMessageHeader,EBPOnHoldCase,ReadyToShip,ReadyForPayout,BidItemEndingSoon,ShoppingCartItemEndingSoon,ReturnCreated,ReturnWaitingForSellerInfo,ReturnSellerInfoOverdue,ReturnShipped,ReturnDelivered,ReturnRefundOverdue,ReturnClosed,ReturnEscalated,BuyerCancelRequested,UnmatchedPaymentReceived,RefundSuccess,RefundFailure,OrderInquiryOpened,OrderInquiryReminderForEscalation,OrderInquiryProvideShipmentInformation,OrderInquiryClosed,OrderInquiryEscalatedToCase,ItemReadyForPickup,ItemOutOfStock,PaymentReminder,M2MMessageStatusChange */
    Type?: string;
    /** xs:int */
    Retries?: number;
    /** NotificationEventStateCodeType|xs:token|New,Failed,MarkedDown,Pending,FailedPending,MarkedDownPending,Delivered,Undeliverable,Rejected,Canceled,CustomCode */
    DeliveryStatus?: string;
    /** xs:dateTime */
    NextRetryTime?: Date;
    /** xs:dateTime */
    DeliveryTime?: Date;
    /** xs:string */
    ErrorMessage?: string;
    /** xs:string */
    DeliveryURLName?: string;
}
