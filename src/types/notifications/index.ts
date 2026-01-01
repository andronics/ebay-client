export type { NotificationEventType } from './events.js';
export { NOTIFICATION_EVENT_TYPES } from './events.js';

export type {
  EbayNotification,
  NotificationItem,
  NotificationUser,
  NotificationTransaction,
} from './base.js';

export type {
  ItemSoldNotification,
  FixedPriceTransactionNotification,
  ItemEndedNotification,
  ItemListedNotification,
  FeedbackReceivedNotification,
  AskSellerQuestionNotification,
} from './item-sold.js';

/**
 * Union of all notification types.
 */
export type AnyNotification =
  | import('./item-sold.js').ItemSoldNotification
  | import('./item-sold.js').FixedPriceTransactionNotification
  | import('./item-sold.js').ItemEndedNotification
  | import('./item-sold.js').ItemListedNotification
  | import('./item-sold.js').FeedbackReceivedNotification
  | import('./item-sold.js').AskSellerQuestionNotification;
