import { z } from 'zod';
import { ValidationError } from '../errors/validation-error.js';
import type { EbayNotification, NotificationEventType } from '../types/notifications/index.js';
import { NOTIFICATION_EVENT_TYPES } from '../types/notifications/index.js';

/**
 * Base notification schema.
 */
const baseNotificationSchema = z.object({
  eventType: z.enum(NOTIFICATION_EVENT_TYPES as [NotificationEventType, ...NotificationEventType[]]),
  timestamp: z.string(),
  recipientUserId: z.string(),
  notificationId: z.string().optional(),
  signature: z.string().optional(),
});

/**
 * Item schema.
 */
const itemSchema = z.object({
  itemId: z.string(),
  title: z.string().optional(),
  currentPrice: z
    .object({
      value: z.string(),
      currencyId: z.string(),
    })
    .optional(),
  quantity: z.number().optional(),
  listingType: z.string().optional(),
});

/**
 * User schema.
 */
const userSchema = z.object({
  userId: z.string(),
  email: z.string().email().optional(),
});

/**
 * Transaction schema.
 */
const transactionSchema = z.object({
  transactionId: z.string(),
  transactionPrice: z
    .object({
      value: z.string(),
      currencyId: z.string(),
    })
    .optional(),
  quantityPurchased: z.number().optional(),
  createdDate: z.string().optional(),
});

/**
 * Extended notification schemas by event type.
 */
const notificationSchemas = {
  ItemSold: baseNotificationSchema.extend({
    eventType: z.literal('ItemSold'),
    item: itemSchema,
    buyer: userSchema,
    transaction: transactionSchema,
  }),

  FixedPriceTransaction: baseNotificationSchema.extend({
    eventType: z.literal('FixedPriceTransaction'),
    item: itemSchema,
    buyer: userSchema,
    transaction: transactionSchema,
  }),

  ItemEnded: baseNotificationSchema.extend({
    eventType: z.literal('ItemEnded'),
    item: itemSchema,
    endReason: z.string().optional(),
  }),

  ItemListed: baseNotificationSchema.extend({
    eventType: z.literal('ItemListed'),
    item: itemSchema,
  }),

  FeedbackReceived: baseNotificationSchema.extend({
    eventType: z.literal('FeedbackReceived'),
    itemId: z.string(),
    transactionId: z.string().optional(),
    commentType: z.enum(['Positive', 'Neutral', 'Negative']).optional(),
    commentText: z.string().optional(),
    fromUser: userSchema,
  }),

  AskSellerQuestion: baseNotificationSchema.extend({
    eventType: z.literal('AskSellerQuestion'),
    itemId: z.string(),
    messageId: z.string().optional(),
    subject: z.string().optional(),
    body: z.string().optional(),
    fromUser: userSchema,
  }),
} as const;

/**
 * Validation result.
 */
export interface ValidationResult {
  success: boolean;
  errors?: z.ZodIssue[];
  data?: EbayNotification;
}

/**
 * Validate a notification against its schema.
 *
 * @param notification - The parsed notification object
 * @returns Validation result
 */
export function validateNotification(notification: EbayNotification): ValidationResult {
  // First validate base schema
  const baseResult = baseNotificationSchema.safeParse(notification);

  if (!baseResult.success) {
    return {
      success: false,
      errors: baseResult.error.issues,
    };
  }

  // Try event-specific schema if available
  const eventType = notification.eventType as keyof typeof notificationSchemas;
  const schema = notificationSchemas[eventType];

  if (schema) {
    const result = schema.safeParse(notification);
    return {
      success: result.success,
      errors: result.success ? undefined : result.error.issues,
      data: result.success ? result.data : undefined,
    };
  }

  // No specific schema, base validation passed
  return {
    success: true,
    data: notification,
  };
}

/**
 * Validate a notification and throw if invalid.
 *
 * @param notification - The parsed notification object
 * @returns Validated notification
 * @throws ValidationError if validation fails
 */
export function validateNotificationStrict(notification: EbayNotification): EbayNotification {
  const result = validateNotification(notification);

  if (!result.success) {
    throw new ValidationError(
      'Notification validation failed',
      result.errors
        ? {
            issues: result.errors,
            format: () => result.errors!,
            flatten: () => ({ formErrors: [], fieldErrors: {} }),
            isEmpty: false,
            addIssue: () => {},
            addIssues: () => {},
            errors: result.errors,
            name: 'ZodError',
            message: 'Validation failed',
          } as unknown as z.ZodError
        : undefined,
      'notification'
    );
  }

  return result.data ?? notification;
}

/**
 * Get the Zod schema for a specific event type.
 */
export function getSchemaForEvent(eventType: NotificationEventType): z.ZodSchema | undefined {
  return notificationSchemas[eventType as keyof typeof notificationSchemas];
}
