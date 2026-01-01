import type { InventoryClientConfig } from '../types/config.js';
import { getInventoryEndpoint } from '../types/config.js';
import { buildOAuthHeaders, validateOAuthConfig } from '../auth/oauth.js';
import { httpRequest, type RetryConfig, DEFAULT_RETRY_CONFIG } from '../utils/http.js';
import { ApiError } from '../errors/api-error.js';

import type {
  InventoryItem,
  InventoryItemsResponse,
  CreateOrReplaceInventoryItemRequest,
  Offer,
  OffersResponse,
  CreateOfferRequest,
  CreateOfferResponse,
  UpdateOfferRequest,
  PublishOfferResponse,
} from '../types/inventory/index.js';

// ============================================================================
// Parameter Types
// ============================================================================

/**
 * Parameters for getInventoryItems.
 */
export interface GetInventoryItemsParams {
  /** Maximum number of items to return (1-100) */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
}

/**
 * Parameters for getOffers.
 */
export interface GetOffersParams {
  /** Filter by SKU */
  sku?: string;
  /** Filter by marketplace */
  marketplaceId?: string;
  /** Filter by format (FIXED_PRICE, AUCTION) */
  format?: string;
  /** Maximum number to return (1-200) */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
}

// ============================================================================
// Error Response Type
// ============================================================================

/**
 * Error response from Inventory API.
 */
interface InventoryApiError {
  errors?: Array<{
    errorId?: number;
    domain?: string;
    category?: string;
    message?: string;
    longMessage?: string;
  }>;
}

// ============================================================================
// Client Class
// ============================================================================

/**
 * Client for eBay Inventory API (REST-based).
 *
 * The Inventory API allows sellers to manage inventory items and offers.
 * Inventory items represent products, while offers connect inventory items
 * to eBay listings on specific marketplaces.
 *
 * @example
 * ```typescript
 * const client = new InventoryClient({
 *   sandbox: false,
 *   auth: {
 *     type: 'oauth',
 *     accessToken: 'your-access-token',
 *   },
 * });
 *
 * // Create an inventory item
 * await client.createOrReplaceInventoryItem('SKU123', {
 *   product: { title: 'My Product' },
 *   condition: 'NEW',
 *   availability: { shipToLocationAvailability: { quantity: 10 } },
 * });
 *
 * // Create and publish an offer
 * const { offerId } = await client.createOffer({
 *   sku: 'SKU123',
 *   marketplaceId: 'EBAY_GB',
 *   pricingSummary: { price: { value: '29.99', currency: 'GBP' } },
 * });
 * await client.publishOffer(offerId);
 * ```
 */
export class InventoryClient {
  private readonly config: InventoryClientConfig;
  private readonly baseUrl: string;
  private readonly retryConfig: RetryConfig;

  constructor(config: InventoryClientConfig) {
    validateOAuthConfig(config.auth);

    this.config = config;
    this.baseUrl = getInventoryEndpoint(config.sandbox);
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config.retry };
  }

  /**
   * Make a request to the Inventory API.
   */
  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: object
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers = buildOAuthHeaders(this.config.auth);

    const response = await httpRequest<T | InventoryApiError>(url, {
      method,
      headers,
      body,
      retry: this.retryConfig,
    });

    // Check for API errors
    if (!response.ok) {
      const errorData = response.data as InventoryApiError;
      const error = errorData.errors?.[0];
      const message = error?.longMessage ?? error?.message ?? 'Inventory API error';
      throw new ApiError(
        message,
        {
          ErrorCode: String(error?.errorId ?? 'UNKNOWN'),
          ShortMessage: error?.message,
          LongMessage: error?.longMessage,
        },
        path
      );
    }

    return response.data as T;
  }

  // ===========================================================================
  // Inventory Item Operations
  // ===========================================================================

  /**
   * Create or replace an inventory item.
   *
   * @param sku - The seller-defined SKU
   * @param item - The inventory item data
   */
  async createOrReplaceInventoryItem(
    sku: string,
    item: CreateOrReplaceInventoryItemRequest
  ): Promise<void> {
    const path = `/inventory_item/${encodeURIComponent(sku)}`;
    await this.request<void>('PUT', path, item);
  }

  /**
   * Get an inventory item by SKU.
   *
   * @param sku - The seller-defined SKU
   */
  async getInventoryItem(sku: string): Promise<InventoryItem> {
    const path = `/inventory_item/${encodeURIComponent(sku)}`;
    return this.request<InventoryItem>('GET', path);
  }

  /**
   * Delete an inventory item.
   *
   * @param sku - The seller-defined SKU
   */
  async deleteInventoryItem(sku: string): Promise<void> {
    const path = `/inventory_item/${encodeURIComponent(sku)}`;
    await this.request<void>('DELETE', path);
  }

  /**
   * Get a list of inventory items.
   *
   * @param params - Query parameters
   */
  async getInventoryItems(params: GetInventoryItemsParams = {}): Promise<InventoryItemsResponse> {
    const queryParams = new URLSearchParams();

    if (params.limit) {
      queryParams.set('limit', String(Math.min(Math.max(1, params.limit), 100)));
    }
    if (params.offset) {
      queryParams.set('offset', String(params.offset));
    }

    const queryString = queryParams.toString();
    const path = `/inventory_item${queryString ? `?${queryString}` : ''}`;

    return this.request<InventoryItemsResponse>('GET', path);
  }

  // ===========================================================================
  // Offer Operations
  // ===========================================================================

  /**
   * Create an offer for an inventory item.
   *
   * @param offer - The offer data
   */
  async createOffer(offer: CreateOfferRequest): Promise<CreateOfferResponse> {
    return this.request<CreateOfferResponse>('POST', '/offer', offer);
  }

  /**
   * Get an offer by ID.
   *
   * @param offerId - The eBay offer ID
   */
  async getOffer(offerId: string): Promise<Offer> {
    const path = `/offer/${encodeURIComponent(offerId)}`;
    return this.request<Offer>('GET', path);
  }

  /**
   * Update an existing offer.
   *
   * @param offerId - The eBay offer ID
   * @param offer - The updated offer data
   */
  async updateOffer(offerId: string, offer: UpdateOfferRequest): Promise<void> {
    const path = `/offer/${encodeURIComponent(offerId)}`;
    await this.request<void>('PUT', path, offer);
  }

  /**
   * Publish an offer to create a live listing.
   *
   * @param offerId - The eBay offer ID
   */
  async publishOffer(offerId: string): Promise<PublishOfferResponse> {
    const path = `/offer/${encodeURIComponent(offerId)}/publish`;
    return this.request<PublishOfferResponse>('POST', path);
  }

  /**
   * Get a list of offers.
   *
   * @param params - Query parameters
   */
  async getOffers(params: GetOffersParams = {}): Promise<OffersResponse> {
    const queryParams = new URLSearchParams();

    if (params.sku) {
      queryParams.set('sku', params.sku);
    }
    if (params.marketplaceId) {
      queryParams.set('marketplace_id', params.marketplaceId);
    }
    if (params.format) {
      queryParams.set('format', params.format);
    }
    if (params.limit) {
      queryParams.set('limit', String(Math.min(Math.max(1, params.limit), 200)));
    }
    if (params.offset) {
      queryParams.set('offset', String(params.offset));
    }

    const queryString = queryParams.toString();
    const path = `/offer${queryString ? `?${queryString}` : ''}`;

    return this.request<OffersResponse>('GET', path);
  }

  // ===========================================================================
  // Utility
  // ===========================================================================

  /**
   * Get the configured base URL.
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Check if client is configured for sandbox.
   */
  isSandbox(): boolean {
    return this.config.sandbox;
  }
}
