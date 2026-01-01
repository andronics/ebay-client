import type {
  BaseResponse,
  FeesType,
  CategoryType,
  ItemSpecificsType,
  ShippingDetailsType,
  AmountType,
} from './common.js';

/**
 * Token status information.
 */
export interface TokenStatusType {
  Status?: 'Active' | 'Inactive' | 'RevokedByeBay' | 'RevokedByUser' | 'RevokedByApp';
  ExpirationTime?: string;
  EIASToken?: string;
}

/**
 * GetTokenStatus response.
 */
export interface GetTokenStatusResponse extends BaseResponse {
  TokenStatus?: TokenStatusType;
}

/**
 * AddItem/VerifyAddItem response.
 */
export interface AddItemResponse extends BaseResponse {
  ItemID?: string;
  StartTime?: string;
  EndTime?: string;
  Fees?: FeesType;
  CategoryID?: string;
  Category2ID?: string;
}

/**
 * ReviseItem response.
 */
export interface ReviseItemResponse extends BaseResponse {
  ItemID?: string;
  StartTime?: string;
  EndTime?: string;
  Fees?: FeesType;
}

/**
 * EndItem response.
 */
export interface EndItemResponse extends BaseResponse {
  EndTime?: string;
}

/**
 * Seller information in GetItem response.
 */
export interface SellerType {
  UserID?: string;
  FeedbackScore?: number;
  PositiveFeedbackPercent?: number;
  SellerBusinessType?: string;
}

/**
 * Full item details returned by GetItem.
 */
export interface ItemType {
  ItemID?: string;
  Title?: string;
  Description?: string;
  PrimaryCategory?: CategoryType;
  StartPrice?: AmountType;
  BuyItNowPrice?: AmountType;
  Quantity?: number;
  QuantityAvailable?: number;
  ConditionID?: number;
  ConditionDisplayName?: string;
  Country?: string;
  Currency?: string;
  ListingDuration?: string;
  ListingType?: string;
  Location?: string;
  PostalCode?: string;
  Site?: string;
  StartTime?: string;
  EndTime?: string;
  ViewItemURL?: string;
  Seller?: SellerType;
  ShippingDetails?: ShippingDetailsType;
  ItemSpecifics?: ItemSpecificsType;
  WatchCount?: number;
  HitCount?: number;
  SellingStatus?: {
    CurrentPrice?: AmountType;
    QuantitySold?: number;
    ListingStatus?: 'Active' | 'Completed' | 'Custom' | 'Ended';
  };
  PictureDetails?: {
    PictureURL?: string | string[];
    GalleryURL?: string;
  };
}

/**
 * GetItem response.
 */
export interface GetItemResponse extends BaseResponse {
  Item?: ItemType;
}

/**
 * Delivery URL details.
 */
export interface DeliveryURLDetailsType {
  DeliveryURL?: string;
  Status?: 'Enabled' | 'Disabled' | 'Pending' | 'CustomCode';
}

/**
 * Application delivery preferences in response.
 */
export interface ApplicationDeliveryPreferencesResponseType {
  ApplicationEnable?: 'Enable' | 'Disable';
  ApplicationURL?: string;
  AlertEnable?: 'Enable' | 'Disable';
  DeliveryURLDetails?: DeliveryURLDetailsType | DeliveryURLDetailsType[];
}

/**
 * User delivery preferences in response.
 */
export interface UserDeliveryPreferenceArrayType {
  NotificationEnable?: Array<{
    EventType?: string;
    EventEnable?: 'Enable' | 'Disable';
  }>;
}

/**
 * SetNotificationPreferences response.
 */
export interface SetNotificationPreferencesResponse extends BaseResponse {}

/**
 * GetNotificationPreferences response.
 */
export interface GetNotificationPreferencesResponse extends BaseResponse {
  ApplicationDeliveryPreferences?: ApplicationDeliveryPreferencesResponseType;
  UserDeliveryPreferenceArray?: UserDeliveryPreferenceArrayType;
}
