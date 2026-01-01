// Parser
export {
  parseNotification,
  parseFullNotification,
  extractItem,
  extractBuyer,
  extractTransaction,
} from './parser.js';

// Validator
export {
  validateNotification,
  validateNotificationStrict,
  getSchemaForEvent,
  type ValidationResult,
} from './validator.js';

// Signature verification
export {
  verifySignature,
  extractSignatureFromXml,
  validateNotificationStructure,
  type SignatureVerificationConfig,
  type NotificationHeaders,
} from './signature.js';

// Response helpers
export {
  buildAckResponse,
  buildChallengeResponse,
  isChallengeRequest,
  getChallengeValue,
  ACK_RESPONSE_HEADERS,
} from './response.js';

// Re-export types for convenience
export type {
  EbayNotification,
  NotificationEventType,
  NotificationItem,
  NotificationUser,
  NotificationTransaction,
  ItemSoldNotification,
  FixedPriceTransactionNotification,
  ItemEndedNotification,
  ItemListedNotification,
  FeedbackReceivedNotification,
  AskSellerQuestionNotification,
  AnyNotification,
} from '../types/notifications/index.js';

export { NOTIFICATION_EVENT_TYPES } from '../types/notifications/index.js';
