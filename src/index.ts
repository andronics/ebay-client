// Main client exports
export { TradingClient } from './trading/index.js';
export { FulfillmentClient } from './fulfillment/index.js';
export { InventoryClient } from './inventory/index.js';
export { AccountClient } from './account/index.js';

// Notification handling
export {
  parseNotification,
  parseFullNotification,
  validateNotification,
  validateNotificationStrict,
  verifySignature,
  buildAckResponse,
  buildChallengeResponse,
  isChallengeRequest,
  getChallengeValue,
  ACK_RESPONSE_HEADERS,
  NOTIFICATION_EVENT_TYPES,
} from './notifications/index.js';

// Auth utilities
export {
  buildAuthNAuthHeaders,
  buildOAuthHeaders,
  isTokenExpired,
  OAuthScopes,
} from './auth/index.js';

// Error classes
export {
  EbayError,
  ApiError,
  ValidationError,
  SignatureError,
} from './errors/index.js';

// Configuration helpers
export {
  EbaySiteId,
  getTradingEndpoint,
  getFulfillmentEndpoint,
  getInventoryEndpoint,
  getAccountEndpoint,
} from './types/config.js';

// Re-export key types
export type {
  // Config
  AuthNAuthConfig,
  OAuthConfig,
  TradingClientConfig,
  FulfillmentClientConfig,
  InventoryClientConfig,
  AccountClientConfig,

  // Trading
  AddItemRequest,
  AddItemResponse,
  GetItemRequest,
  GetItemResponse,
  ReviseItemRequest,
  ReviseItemResponse,
  EndItemRequest,
  EndItemResponse,
  GetTokenStatusResponse,

  // Fulfillment
  Order,
  OrderSearchResponse,
  CreateShipmentRequest,
  CreateShipmentResponse,

  // Inventory
  InventoryItem,
  InventoryItemsResponse,
  CreateOrReplaceInventoryItemRequest,
  Offer,
  OffersResponse,
  CreateOfferRequest,
  CreateOfferResponse,
  UpdateOfferRequest,
  PublishOfferResponse,

  // Account
  FulfillmentPolicy,
  FulfillmentPolicyRequest,
  SetFulfillmentPolicyResponse,
  FulfillmentPoliciesResponse,
  PaymentPolicy,
  PaymentPolicyRequest,
  SetPaymentPolicyResponse,
  PaymentPoliciesResponse,
  ReturnPolicy,
  ReturnPolicyRequest,
  SetReturnPolicyResponse,
  ReturnPoliciesResponse,
  SellingPrivileges,

  // Notifications
  EbayNotification,
  NotificationEventType,
  ItemSoldNotification,
  FixedPriceTransactionNotification,
} from './types/index.js';
