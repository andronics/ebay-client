// Common types
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
} from './common.js';

// Request types
export type {
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
} from './requests.js';

// Response types
export type {
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
} from './responses.js';

// Full WSDL-generated types (for reference during development)
// These provide complete eBay schema coverage
export * as Generated from './generated/index.js';
