import type { EbayNotification, NotificationItem, NotificationUser, NotificationTransaction } from './base.js';

/**
 * ItemSold notification - triggered when an item sells.
 */
export interface ItemSoldNotification extends EbayNotification {
  eventType: 'ItemSold';
  item: NotificationItem;
  buyer: NotificationUser;
  transaction: NotificationTransaction;
}

/**
 * FixedPriceTransaction notification - triggered for Buy It Now purchases.
 */
export interface FixedPriceTransactionNotification extends EbayNotification {
  eventType: 'FixedPriceTransaction';
  item: NotificationItem;
  buyer: NotificationUser;
  transaction: NotificationTransaction;
}

/**
 * ItemEnded notification - triggered when a listing ends.
 */
export interface ItemEndedNotification extends EbayNotification {
  eventType: 'ItemEnded';
  item: NotificationItem;
  endReason?: string;
}

/**
 * ItemListed notification - triggered when a new listing is created.
 */
export interface ItemListedNotification extends EbayNotification {
  eventType: 'ItemListed';
  item: NotificationItem;
}

/**
 * FeedbackReceived notification - triggered when feedback is received.
 */
export interface FeedbackReceivedNotification extends EbayNotification {
  eventType: 'FeedbackReceived';
  itemId: string;
  transactionId?: string;
  commentType?: 'Positive' | 'Neutral' | 'Negative';
  commentText?: string;
  fromUser: NotificationUser;
}

/**
 * AskSellerQuestion notification - triggered when a buyer asks a question.
 */
export interface AskSellerQuestionNotification extends EbayNotification {
  eventType: 'AskSellerQuestion';
  itemId: string;
  messageId?: string;
  subject?: string;
  body?: string;
  fromUser: NotificationUser;
}
