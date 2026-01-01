export {
  FulfillmentClient,
  type GetOrdersParams,
  type GetOrderParams,
  type CreateShipmentParams,
} from './client.js';

// Re-export types for convenience
export type {
  FulfillmentClientConfig,
  OAuthConfig,
} from '../types/config.js';

export type {
  Order,
  OrderSearchResponse,
  OrderStatusType,
  PaymentStatusType,
  FulfillmentStatusType,
  Amount,
  Address,
  Contact,
  Buyer,
  LineItem,
  ShippingFulfillment,
  CreateShipmentRequest,
  CreateShipmentResponse,
  ShippingCarrierCode,
} from '../types/fulfillment/index.js';

export { ShippingCarriers } from '../types/fulfillment/index.js';
