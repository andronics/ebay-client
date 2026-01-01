/**
 * Base error class for all eBay-related errors.
 */
export class EbayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EbayError';
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EbayError);
    }
  }
}
