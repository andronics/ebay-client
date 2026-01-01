import type { ZodError, ZodIssue } from 'zod';
import { EbayError } from './ebay-error.js';

/**
 * Error thrown when schema validation fails.
 */
export class ValidationError extends EbayError {
  /** The Zod error containing all validation issues */
  readonly zodError?: ZodError;

  /** Flattened list of validation issues */
  readonly issues: ZodIssue[];

  /** The type of data that failed validation */
  readonly validationType?: string;

  constructor(message: string, zodError?: ZodError, validationType?: string) {
    super(message);
    this.name = 'ValidationError';
    this.zodError = zodError;
    this.issues = zodError?.issues ?? [];
    this.validationType = validationType;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }

  /**
   * Create from a Zod error.
   */
  static fromZodError(zodError: ZodError, validationType?: string): ValidationError {
    const message = zodError.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');

    return new ValidationError(
      `Validation failed: ${message}`,
      zodError,
      validationType
    );
  }

  /**
   * Get a formatted string of all issues.
   */
  formatIssues(): string {
    return this.issues
      .map((issue) => {
        const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';
        return `${path}${issue.message}`;
      })
      .join('\n');
  }

  /**
   * Get issues for a specific field path.
   */
  getIssuesForPath(path: string): ZodIssue[] {
    return this.issues.filter((issue) => issue.path.join('.') === path);
  }
}
