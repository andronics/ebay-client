import type {
  CategoryType,
  ItemSpecificsType,
  ShippingDetailsType,
} from './common.js';

/**
 * Item structure for AddItem/VerifyAddItem requests.
 */
export interface AddItemType {
  Title: string;
  Description: string;
  PrimaryCategory: CategoryType;
  StartPrice: number;
  CategoryMappingAllowed?: boolean;
  ConditionID?: number;
  Country: string;
  Currency: string;
  DispatchTimeMax?: number;
  ListingDuration: string;
  ListingType: 'FixedPriceItem' | 'Auction' | 'StoresFixedPrice';
  PaymentMethods?: string | string[];
  PostalCode?: string;
  Quantity: number;
  ShippingDetails?: ShippingDetailsType;
  ItemSpecifics?: ItemSpecificsType;
  Site?: string;
  Location?: string;
  PictureDetails?: {
    PictureURL?: string | string[];
  };
}

/**
 * AddItem request parameters.
 */
export interface AddItemRequest {
  Item: AddItemType;
}

/**
 * VerifyAddItem request parameters (same as AddItem).
 */
export type VerifyAddItemRequest = AddItemRequest;

/**
 * Item structure for ReviseItem requests.
 */
export interface ReviseItemType {
  ItemID: string;
  Title?: string;
  Description?: string;
  StartPrice?: number;
  Quantity?: number;
  ItemSpecifics?: ItemSpecificsType;
  ShippingDetails?: ShippingDetailsType;
}

/**
 * ReviseItem request parameters.
 */
export interface ReviseItemRequest {
  Item: ReviseItemType;
}

/**
 * Valid reasons for ending a listing.
 */
export type EndingReasonType =
  | 'LostOrBroken'
  | 'NotAvailable'
  | 'Incorrect'
  | 'OtherListingError'
  | 'SellToHighBidder';

/**
 * EndItem request parameters.
 */
export interface EndItemRequest {
  ItemID: string;
  EndingReason: EndingReasonType;
}

/**
 * Detail level for GetItem requests.
 */
export type DetailLevelType =
  | 'ReturnAll'
  | 'ReturnSummary'
  | 'ItemReturnDescription'
  | 'ItemReturnAttributes';

/**
 * GetItem request parameters.
 */
export interface GetItemRequest {
  ItemID: string;
  DetailLevel?: DetailLevelType;
  IncludeItemSpecifics?: boolean;
  IncludeTaxTable?: boolean;
}

/**
 * Notification enable setting.
 */
export interface NotificationEnableType {
  EventType: string;
  EventEnable: 'Enable' | 'Disable';
}

/**
 * Application delivery preferences.
 */
export interface ApplicationDeliveryPreferencesType {
  ApplicationEnable: 'Enable' | 'Disable';
  ApplicationURL: string;
  AlertEnable?: 'Enable' | 'Disable';
}

/**
 * SetNotificationPreferences request parameters.
 */
export interface SetNotificationPreferencesRequest {
  ApplicationDeliveryPreferences?: ApplicationDeliveryPreferencesType;
  UserDeliveryPreferenceArray?: {
    NotificationEnable: NotificationEnableType[];
  };
}

/**
 * Preference level for GetNotificationPreferences.
 */
export type PreferenceLevelType = 'User' | 'Application';

/**
 * GetNotificationPreferences request parameters.
 */
export interface GetNotificationPreferencesRequest {
  PreferenceLevel: PreferenceLevelType;
}
