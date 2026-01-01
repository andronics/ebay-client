/**
 * Shipment creation request.
 */
export interface CreateShipmentRequest {
  /** Line items included in this shipment */
  lineItems: Array<{
    lineItemId: string;
    quantity: number;
  }>;
  /** Tracking number from the carrier */
  trackingNumber: string;
  /** Shipping carrier code (e.g., 'ROYAL_MAIL', 'UPS', 'FEDEX') */
  shippingCarrierCode: string;
  /** When the item was shipped (ISO 8601) */
  shippedDate?: string;
}

/**
 * Shipment creation response.
 */
export interface CreateShipmentResponse {
  /** The fulfillment ID for this shipment */
  fulfillmentId: string;
  /** Line items in this fulfillment */
  lineItems?: Array<{
    lineItemId: string;
    quantity?: number;
  }>;
  /** Tracking number */
  shipmentTrackingNumber?: string;
  /** Shipping carrier */
  shippingCarrierCode?: string;
  /** Ship date */
  shippedDate?: string;
}

/**
 * Common shipping carrier codes.
 */
export const ShippingCarriers = {
  // UK
  ROYAL_MAIL: 'ROYAL_MAIL',
  PARCELFORCE: 'PARCELFORCE',
  DPD_UK: 'DPD_UK',
  HERMES_UK: 'HERMES_UK',
  YODEL: 'YODEL',

  // US
  USPS: 'USPS',
  UPS: 'UPS',
  FEDEX: 'FEDEX',

  // International
  DHL: 'DHL',
  DHL_EXPRESS: 'DHL_EXPRESS',
  TNT: 'TNT',
} as const;

export type ShippingCarrierCode = (typeof ShippingCarriers)[keyof typeof ShippingCarriers];
