/**
 * eBay order status.
 */
export type OrderStatusType =
  | 'ACTIVE'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'INACTIVE'
  | 'PENDING_APPROVAL';

/**
 * Payment status.
 */
export type PaymentStatusType =
  | 'FAILED'
  | 'FULLY_REFUNDED'
  | 'LESS_THAN_EXPECTED'
  | 'PAID'
  | 'PARTIALLY_REFUNDED'
  | 'PENDING'
  | 'PRICED'
  | 'WAITING';

/**
 * Fulfillment status.
 */
export type FulfillmentStatusType =
  | 'FULFILLED'
  | 'IN_PROGRESS'
  | 'NOT_STARTED';

/**
 * Monetary amount in Fulfillment API.
 */
export interface Amount {
  value: string;
  currency: string;
}

/**
 * Address structure.
 */
export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  countryCode?: string;
}

/**
 * Contact information.
 */
export interface Contact {
  fullName?: string;
  email?: string;
  primaryPhone?: {
    phoneNumber?: string;
  };
}

/**
 * Buyer information.
 */
export interface Buyer {
  username?: string;
  taxAddress?: Address;
}

/**
 * Line item in an order.
 */
export interface LineItem {
  lineItemId: string;
  legacyItemId?: string;
  sku?: string;
  title?: string;
  quantity?: number;
  lineItemCost?: Amount;
  deliveryCost?: Amount;
  total?: Amount;
  lineItemFulfillmentStatus?: FulfillmentStatusType;
  soldFormat?: 'AUCTION' | 'FIXED_PRICE';
}

/**
 * Shipping fulfillment details.
 */
export interface ShippingFulfillment {
  fulfillmentId?: string;
  shipmentTrackingNumber?: string;
  shippingCarrierCode?: string;
  shippedDate?: string;
  lineItems?: Array<{
    lineItemId: string;
    quantity?: number;
  }>;
}

/**
 * Full order structure.
 */
export interface Order {
  orderId: string;
  legacyOrderId?: string;
  creationDate?: string;
  lastModifiedDate?: string;
  orderFulfillmentStatus?: FulfillmentStatusType;
  orderPaymentStatus?: PaymentStatusType;
  salesRecordReference?: string;
  buyer?: Buyer;
  pricingSummary?: {
    priceSubtotal?: Amount;
    deliveryCost?: Amount;
    total?: Amount;
  };
  cancelStatus?: {
    cancelState?: 'NONE_REQUESTED' | 'CANCEL_REQUESTED' | 'CANCELED' | 'CANCEL_CLOSED';
  };
  paymentSummary?: {
    payments?: Array<{
      paymentStatus?: PaymentStatusType;
      paymentDate?: string;
    }>;
  };
  fulfillmentStartInstructions?: Array<{
    fulfillmentInstructionsType?: 'SHIP_TO' | 'DIGITAL' | 'PREPARE_FOR_PICKUP';
    shippingStep?: {
      shippingCarrierCode?: string;
      shippingServiceCode?: string;
      shipTo?: Contact & { address?: Address };
    };
  }>;
  fulfillmentHrefs?: string[];
  lineItems?: LineItem[];
}

/**
 * Order search response.
 */
export interface OrderSearchResponse {
  href?: string;
  total?: number;
  limit?: number;
  offset?: number;
  orders?: Order[];
  next?: string;
  prev?: string;
  warnings?: Array<{
    errorId?: string;
    domain?: string;
    message?: string;
  }>;
}
