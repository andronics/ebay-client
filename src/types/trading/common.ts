/**
 * Common types used across Trading API operations.
 * These are manually defined to provide clean interfaces.
 * For full WSDL-generated types, run `npm run generate:types`.
 */

/**
 * eBay API acknowledgment status.
 */
export type AckCodeType = 'Success' | 'Failure' | 'Warning' | 'PartialFailure';

/**
 * Base response type for all Trading API operations.
 */
export interface BaseResponse {
  Ack?: AckCodeType;
  Timestamp?: string;
  Version?: string;
  Build?: string;
  Errors?: ErrorType | ErrorType[];
}

/**
 * eBay API error structure.
 */
export interface ErrorType {
  ShortMessage?: string;
  LongMessage?: string;
  ErrorCode?: string;
  SeverityCode?: 'Error' | 'Warning';
  ErrorClassification?: 'RequestError' | 'SystemError' | 'CustomCode';
  ErrorParameters?: ErrorParameterType[];
}

/**
 * Error parameter for additional context.
 */
export interface ErrorParameterType {
  ParamID?: string;
  Value?: string;
}

/**
 * Monetary amount with currency.
 */
export interface AmountType {
  '#text'?: string;
  '@_currencyID'?: string;
}

/**
 * Category reference.
 */
export interface CategoryType {
  CategoryID?: string;
  CategoryName?: string;
}

/**
 * Name-value pair for item specifics.
 */
export interface NameValueListType {
  Name: string;
  Value: string | string[];
}

/**
 * Item specifics container.
 */
export interface ItemSpecificsType {
  NameValueList: NameValueListType[];
}

/**
 * Shipping service option.
 */
export interface ShippingServiceOptionsType {
  ShippingService?: string;
  ShippingServiceCost?: number | AmountType;
  ShippingServicePriority?: number;
  FreeShipping?: boolean;
}

/**
 * Shipping details container.
 */
export interface ShippingDetailsType {
  ShippingServiceOptions?: ShippingServiceOptionsType | ShippingServiceOptionsType[];
  ShippingType?: string;
  GlobalShipping?: boolean;
}

/**
 * Fee structure returned by eBay.
 */
export interface FeeType {
  Name?: string;
  Fee?: AmountType;
}

/**
 * Fees container.
 */
export interface FeesType {
  Fee?: FeeType[];
}
