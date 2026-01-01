import { EbayError } from './ebay-error.js';

/**
 * Error details from an eBay API response.
 */
export interface EbayApiErrorDetail {
  ShortMessage?: string;
  LongMessage?: string;
  ErrorCode?: string;
  SeverityCode?: 'Error' | 'Warning';
  ErrorClassification?: string;
  ErrorParameters?: Array<{
    ParamID?: string;
    Value?: string;
  }>;
}

/**
 * Error thrown when the eBay API returns an error response.
 */
export class ApiError extends EbayError {
  /** The eBay error code (e.g., "21916734") */
  readonly ebayErrorCode: string;

  /** The short error message from eBay */
  readonly shortMessage: string;

  /** The detailed error message from eBay */
  readonly longMessage?: string;

  /** The severity of the error */
  readonly severity: 'Error' | 'Warning';

  /** The error classification */
  readonly classification?: string;

  /** Raw error details from the API */
  readonly details: EbayApiErrorDetail[];

  /** The API operation that was called */
  readonly operation?: string;

  constructor(
    message: string,
    details: EbayApiErrorDetail | EbayApiErrorDetail[],
    operation?: string
  ) {
    const errorArray = Array.isArray(details) ? details : [details];
    const primary = errorArray[0];

    super(message);
    this.name = 'ApiError';

    this.ebayErrorCode = primary?.ErrorCode ?? 'UNKNOWN';
    this.shortMessage = primary?.ShortMessage ?? message;
    this.longMessage = primary?.LongMessage;
    this.severity = primary?.SeverityCode ?? 'Error';
    this.classification = primary?.ErrorClassification;
    this.details = errorArray;
    this.operation = operation;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /**
   * Create an ApiError from an eBay API response.
   */
  static fromResponse(
    response: { Ack?: string; Errors?: EbayApiErrorDetail | EbayApiErrorDetail[] },
    operation?: string
  ): ApiError | null {
    if (response.Ack === 'Success') {
      return null;
    }

    const errors = response.Errors;
    if (!errors) {
      return new ApiError('Unknown eBay API error', [], operation);
    }

    const errorArray = Array.isArray(errors) ? errors : [errors];
    const primary = errorArray[0];
    const message = primary?.LongMessage ?? primary?.ShortMessage ?? 'eBay API error';

    return new ApiError(message, errorArray, operation);
  }

  /**
   * Check if this is a specific eBay error code.
   */
  hasErrorCode(code: string): boolean {
    return this.details.some((d) => d.ErrorCode === code);
  }

  /**
   * Check if there are any errors (not just warnings).
   */
  hasErrors(): boolean {
    return this.details.some((d) => d.SeverityCode === 'Error');
  }

  /**
   * Get all error codes from the response.
   */
  getErrorCodes(): string[] {
    return this.details
      .filter((d) => d.ErrorCode)
      .map((d) => d.ErrorCode as string);
  }
}
