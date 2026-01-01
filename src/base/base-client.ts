import { type RetryConfig, DEFAULT_RETRY_CONFIG } from '../utils/http.js';

/**
 * Base configuration shared by all eBay API clients.
 */
export interface BaseClientConfig {
  /** Use sandbox (true) or production (false) environment */
  sandbox: boolean;
  /** Retry configuration */
  retry?: Partial<RetryConfig>;
}

/**
 * Abstract base class for all eBay API clients.
 *
 * Provides common functionality:
 * - Configuration storage
 * - Retry configuration with defaults
 * - Sandbox detection
 *
 * @template TConfig - Client-specific configuration type extending BaseClientConfig
 */
export abstract class BaseClient<TConfig extends BaseClientConfig> {
  protected readonly config: TConfig;
  protected readonly retryConfig: RetryConfig;

  constructor(config: TConfig) {
    this.config = config;
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config.retry };
  }

  /**
   * Get the configured API endpoint URL.
   */
  abstract getEndpoint(): string;

  /**
   * Check if client is configured for sandbox.
   */
  isSandbox(): boolean {
    return this.config.sandbox;
  }
}
