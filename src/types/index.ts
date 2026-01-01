// Configuration types
export type {
  AuthNAuthConfig,
  OAuthConfig,
  AuthConfig,
  TradingClientConfig,
  FulfillmentClientConfig,
  EbaySiteIdValue,
} from './config.js';

export {
  EbaySiteId,
  getTradingEndpoint,
  getFulfillmentEndpoint,
} from './config.js';

// Trading types (Generated namespace excluded - import from types/trading directly)
export type {
  AckCodeType,
  BaseResponse,
  ErrorType,
  ErrorParameterType,
  AmountType,
  CategoryType,
  NameValueListType,
  ItemSpecificsType,
  ShippingServiceOptionsType,
  ShippingDetailsType,
  FeeType,
  FeesType,
  AddItemType,
  AddItemRequest,
  VerifyAddItemRequest,
  ReviseItemType,
  ReviseItemRequest,
  EndingReasonType,
  EndItemRequest,
  DetailLevelType,
  GetItemRequest,
  NotificationEnableType,
  ApplicationDeliveryPreferencesType,
  SetNotificationPreferencesRequest,
  PreferenceLevelType,
  GetNotificationPreferencesRequest,
  TokenStatusType,
  GetTokenStatusResponse,
  AddItemResponse,
  ReviseItemResponse,
  EndItemResponse,
  SellerType,
  ItemType,
  GetItemResponse,
  DeliveryURLDetailsType,
  ApplicationDeliveryPreferencesResponseType,
  UserDeliveryPreferenceArrayType,
  SetNotificationPreferencesResponse,
  GetNotificationPreferencesResponse,
} from './trading/index.js';

// Fulfillment types (Generated namespace excluded - import from types/fulfillment directly)
export type {
  OrderStatusType,
  PaymentStatusType,
  FulfillmentStatusType,
  Amount,
  Address,
  Contact,
  Buyer,
  LineItem,
  ShippingFulfillment,
  Order,
  OrderSearchResponse,
  CreateShipmentRequest,
  CreateShipmentResponse,
  ShippingCarrierCode,
} from './fulfillment/index.js';

export { ShippingCarriers } from './fulfillment/index.js';

// Notification types
export * from './notifications/index.js';
