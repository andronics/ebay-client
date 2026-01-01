import { parseXml } from '../utils/xml.js';
import type {
  EbayNotification,
  NotificationEventType,
  NotificationItem,
  NotificationUser,
  NotificationTransaction,
} from '../types/notifications/index.js';

/**
 * Raw parsed notification structure from eBay.
 */
interface RawNotification {
  // SOAP-wrapped notification (namespace prefix stripped by removeNSPrefix)
  Envelope?: {
    Body?: {
      GetItemTransactionsResponse?: RawNotificationBody;
      [key: string]: unknown;
    };
  };
  // Direct body for non-SOAP notifications
  GetItemTransactionsResponse?: RawNotificationBody;
  [key: string]: unknown;
}

interface RawNotificationBody {
  NotificationEventName?: string;
  Timestamp?: string;
  RecipientUserID?: string;
  CorrelationID?: string;
  NotificationSignature?: string;
  Item?: RawItem;
  TransactionArray?: {
    Transaction?: RawTransaction | RawTransaction[];
  };
  [key: string]: unknown;
}

interface RawItem {
  ItemID?: string;
  Title?: string;
  SellingStatus?: {
    CurrentPrice?: {
      '#text'?: string;
      '@_currencyID'?: string;
    };
  };
  Quantity?: string;
  ListingType?: string;
  [key: string]: unknown;
}

interface RawTransaction {
  TransactionID?: string;
  TransactionPrice?: {
    '#text'?: string;
    '@_currencyID'?: string;
  };
  QuantityPurchased?: string;
  CreatedDate?: string;
  Buyer?: {
    UserID?: string;
    Email?: string;
  };
  [key: string]: unknown;
}

/**
 * Parse an eBay notification XML payload into a typed object.
 *
 * @param xml - The raw XML string from eBay
 * @returns Parsed notification object
 */
export function parseNotification(xml: string): EbayNotification {
  const parsed = parseXml<RawNotification>(xml);

  // Find the notification body (handle both SOAP-wrapped and direct formats)
  let body: RawNotificationBody | undefined;

  if (parsed.Envelope?.Body) {
    // SOAP-wrapped notification (namespace prefix stripped by removeNSPrefix)
    const bodyContent = parsed.Envelope.Body;
    // Find the response element (e.g., GetItemTransactionsResponse)
    for (const key of Object.keys(bodyContent)) {
      if (key.endsWith('Response') || key.includes('Notification')) {
        body = bodyContent[key] as RawNotificationBody;
        break;
      }
    }
  } else {
    // Direct format - find the response/notification element
    for (const key of Object.keys(parsed)) {
      if (key.endsWith('Response') || key.includes('Notification')) {
        body = parsed[key] as RawNotificationBody;
        break;
      }
    }
  }

  if (!body) {
    // Fallback to treating the whole parsed object as the body
    body = parsed as unknown as RawNotificationBody;
  }

  const eventType = (body.NotificationEventName ?? 'Unknown') as NotificationEventType;

  const notification: EbayNotification = {
    eventType,
    timestamp: body.Timestamp ?? new Date().toISOString(),
    recipientUserId: body.RecipientUserID ?? '',
    notificationId: body.CorrelationID,
    signature: body.NotificationSignature,
    raw: body,
  };

  return notification;
}

/**
 * Extract item details from a notification body.
 */
export function extractItem(body: unknown): NotificationItem | undefined {
  const raw = body as RawNotificationBody;
  // Handle Item being parsed as array (due to isArray config in xml.ts)
  const item = Array.isArray(raw.Item) ? raw.Item[0] : raw.Item;

  if (!item?.ItemID) {
    return undefined;
  }

  return {
    itemId: item.ItemID,
    title: item.Title,
    currentPrice: item.SellingStatus?.CurrentPrice
      ? {
          value: item.SellingStatus.CurrentPrice['#text'] ?? '0',
          currencyId: item.SellingStatus.CurrentPrice['@_currencyID'] ?? 'USD',
        }
      : undefined,
    quantity: item.Quantity ? parseInt(item.Quantity, 10) : undefined,
    listingType: item.ListingType,
  };
}

/**
 * Extract transaction details from a notification body.
 */
export function extractTransaction(body: unknown): NotificationTransaction | undefined {
  const raw = body as RawNotificationBody;
  const transactions = raw.TransactionArray?.Transaction;

  if (!transactions) {
    return undefined;
  }

  const transaction = Array.isArray(transactions) ? transactions[0] : transactions;

  if (!transaction?.TransactionID) {
    return undefined;
  }

  return {
    transactionId: transaction.TransactionID,
    transactionPrice: transaction.TransactionPrice
      ? {
          value: transaction.TransactionPrice['#text'] ?? '0',
          currencyId: transaction.TransactionPrice['@_currencyID'] ?? 'USD',
        }
      : undefined,
    quantityPurchased: transaction.QuantityPurchased
      ? parseInt(transaction.QuantityPurchased, 10)
      : undefined,
    createdDate: transaction.CreatedDate,
  };
}

/**
 * Extract buyer details from a notification body.
 */
export function extractBuyer(body: unknown): NotificationUser | undefined {
  const raw = body as RawNotificationBody;
  const transactions = raw.TransactionArray?.Transaction;

  if (!transactions) {
    return undefined;
  }

  const transaction = Array.isArray(transactions) ? transactions[0] : transactions;
  const buyer = transaction?.Buyer;

  if (!buyer?.UserID) {
    return undefined;
  }

  return {
    userId: buyer.UserID,
    email: buyer.Email,
  };
}

/**
 * Parse and extract full typed notification details.
 *
 * @param xml - The raw XML string from eBay
 * @returns Parsed notification with extracted details
 */
export function parseFullNotification(xml: string): EbayNotification & {
  item?: NotificationItem;
  buyer?: NotificationUser;
  transaction?: NotificationTransaction;
} {
  const notification = parseNotification(xml);

  return {
    ...notification,
    item: extractItem(notification.raw),
    buyer: extractBuyer(notification.raw),
    transaction: extractTransaction(notification.raw),
  };
}
