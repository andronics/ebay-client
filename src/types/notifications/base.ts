import type { NotificationEventType } from './events.js';

/**
 * Base structure for all eBay notifications.
 */
export interface EbayNotification {
  /** The type of notification event */
  eventType: NotificationEventType;

  /** When the event occurred */
  timestamp: string;

  /** The user ID of the notification recipient */
  recipientUserId: string;

  /** Unique identifier for this notification */
  notificationId?: string;

  /** eBay signature for verification */
  signature?: string;

  /** Raw notification data */
  raw?: unknown;
}

/**
 * Item-related notification data.
 */
export interface NotificationItem {
  itemId: string;
  title?: string;
  currentPrice?: {
    value: string;
    currencyId: string;
  };
  quantity?: number;
  listingType?: string;
}

/**
 * User data in notifications.
 */
export interface NotificationUser {
  userId: string;
  email?: string;
}

/**
 * Transaction data in notifications.
 */
export interface NotificationTransaction {
  transactionId: string;
  transactionPrice?: {
    value: string;
    currencyId: string;
  };
  quantityPurchased?: number;
  createdDate?: string;
}
