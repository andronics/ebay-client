import { EbayError } from './ebay-error.js';

/**
 * Error thrown when notification signature verification fails.
 */
export class SignatureError extends EbayError {
  /** The reason for the signature failure */
  readonly reason: SignatureFailureReason;

  /** The expected signature value (if available) */
  readonly expected?: string;

  /** The actual signature value received */
  readonly actual?: string;

  constructor(
    message: string,
    reason: SignatureFailureReason,
    options?: { expected?: string; actual?: string }
  ) {
    super(message);
    this.name = 'SignatureError';
    this.reason = reason;
    this.expected = options?.expected;
    this.actual = options?.actual;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SignatureError);
    }
  }

  /**
   * Create an error for missing signature header.
   */
  static missingSignature(): SignatureError {
    return new SignatureError(
      'Notification is missing signature header',
      'missing_signature'
    );
  }

  /**
   * Create an error for missing timestamp.
   */
  static missingTimestamp(): SignatureError {
    return new SignatureError(
      'Notification is missing timestamp header',
      'missing_timestamp'
    );
  }

  /**
   * Create an error for expired timestamp.
   */
  static expiredTimestamp(timestamp: string): SignatureError {
    return new SignatureError(
      `Notification timestamp has expired: ${timestamp}`,
      'expired_timestamp'
    );
  }

  /**
   * Create an error for invalid signature.
   */
  static invalidSignature(expected?: string, actual?: string): SignatureError {
    return new SignatureError(
      'Notification signature verification failed',
      'invalid_signature',
      { expected, actual }
    );
  }

  /**
   * Create an error for invalid payload.
   */
  static invalidPayload(details?: string): SignatureError {
    return new SignatureError(
      details ? `Invalid notification payload: ${details}` : 'Invalid notification payload',
      'invalid_payload'
    );
  }
}

export type SignatureFailureReason =
  | 'missing_signature'
  | 'missing_timestamp'
  | 'expired_timestamp'
  | 'invalid_signature'
  | 'invalid_payload';
