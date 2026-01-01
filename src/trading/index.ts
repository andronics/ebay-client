export { TradingClient } from './client.js';

// Re-export types for convenience
export type {
  TradingClientConfig,
  AuthNAuthConfig,
} from '../types/config.js';

export type {
  // Common
  AckCodeType,
  BaseResponse,
  ErrorType,
  AmountType,
  CategoryType,
  ItemSpecificsType,
  ShippingDetailsType,
  FeesType,

  // Requests
  AddItemRequest,
  VerifyAddItemRequest,
  ReviseItemRequest,
  EndItemRequest,
  GetItemRequest,
  SetNotificationPreferencesRequest,
  GetNotificationPreferencesRequest,

  // Responses
  GetTokenStatusResponse,
  AddItemResponse,
  ReviseItemResponse,
  EndItemResponse,
  GetItemResponse,
  SetNotificationPreferencesResponse,
  GetNotificationPreferencesResponse,
} from '../types/trading/index.js';
