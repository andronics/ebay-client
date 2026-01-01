import type { FulfillmentClientConfig } from '../types/config.js';
import { BaseRestClient } from '../base/index.js';

import type {
  Order,
  OrderSearchResponse,
  CreateShipmentRequest,
  CreateShipmentResponse,
} from '../types/fulfillment/index.js';

/**
 * API path for the Fulfillment API.
 */
const API_PATH = '/sell/fulfillment/v1';

/**
 * Parameters for getOrders.
 */
export interface GetOrdersParams {
  /** Filter by order fulfillment status */
  orderFulfillmentStatus?: 'FULFILLED' | 'IN_PROGRESS' | 'NOT_STARTED';
  /** Maximum number of orders to return (1-200) */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  /** Filter expression (e.g., "creationdate:[2024-01-01T00:00:00Z..]") */
  filter?: string;
}

/**
 * Parameters for getOrder.
 */
export interface GetOrderParams {
  /** The eBay order ID */
  orderId: string;
  /** Field groups to include in response */
  fieldGroups?: string;
}

/**
 * Parameters for createShipment.
 */
export interface CreateShipmentParams extends CreateShipmentRequest {
  /** The eBay order ID */
  orderId: string;
}

/**
 * Client for eBay Fulfillment API (REST-based).
 *
 * @example
 * ```typescript
 * const client = new FulfillmentClient({
 *   sandbox: false,
 *   auth: {
 *     type: 'oauth',
 *     accessToken: 'your-access-token',
 *   },
 * });
 *
 * const orders = await client.getOrders({ limit: 50 });
 * ```
 */
export class FulfillmentClient extends BaseRestClient<FulfillmentClientConfig> {
  constructor(config: FulfillmentClientConfig) {
    super(config, API_PATH);
  }

  // ===========================================================================
  // Order Operations
  // ===========================================================================

  /**
   * Get a list of orders.
   *
   * @param params - Query parameters
   */
  async getOrders(params: GetOrdersParams = {}): Promise<OrderSearchResponse> {
    const queryParams = new URLSearchParams();

    if (params.orderFulfillmentStatus) {
      queryParams.set('orderFulfillmentStatus', params.orderFulfillmentStatus);
    }
    if (params.limit) {
      queryParams.set('limit', String(Math.min(Math.max(1, params.limit), 200)));
    }
    if (params.offset) {
      queryParams.set('offset', String(params.offset));
    }
    if (params.filter) {
      queryParams.set('filter', params.filter);
    }

    const queryString = queryParams.toString();
    const path = `/order${queryString ? `?${queryString}` : ''}`;

    return this.request<OrderSearchResponse>('GET', path);
  }

  /**
   * Get a specific order by ID.
   *
   * @param params - Order ID and options
   */
  async getOrder(params: GetOrderParams): Promise<Order> {
    const queryParams = new URLSearchParams();

    if (params.fieldGroups) {
      queryParams.set('fieldGroups', params.fieldGroups);
    }

    const queryString = queryParams.toString();
    const path = `/order/${params.orderId}${queryString ? `?${queryString}` : ''}`;

    return this.request<Order>('GET', path);
  }

  // ===========================================================================
  // Shipment Operations
  // ===========================================================================

  /**
   * Create a shipment for an order.
   *
   * @param params - Shipment details including order ID
   */
  async createShipment(params: CreateShipmentParams): Promise<CreateShipmentResponse> {
    const { orderId, ...shipmentData } = params;
    const path = `/order/${orderId}/shipping_fulfillment`;

    return this.request<CreateShipmentResponse>('POST', path, { body: shipmentData });
  }

  /**
   * Get shipment details for an order.
   *
   * @param orderId - The eBay order ID
   * @param fulfillmentId - The fulfillment ID
   */
  async getShipment(orderId: string, fulfillmentId: string): Promise<CreateShipmentResponse> {
    const path = `/order/${orderId}/shipping_fulfillment/${fulfillmentId}`;
    return this.request<CreateShipmentResponse>('GET', path);
  }

  /**
   * Get all shipments for an order.
   *
   * @param orderId - The eBay order ID
   */
  async getShipments(orderId: string): Promise<{ fulfillments?: CreateShipmentResponse[] }> {
    const path = `/order/${orderId}/shipping_fulfillment`;
    return this.request<{ fulfillments?: CreateShipmentResponse[] }>('GET', path);
  }
}
