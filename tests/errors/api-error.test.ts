import { describe, it, expect } from 'vitest';
import { ApiError, type EbayApiErrorDetail } from '../../src/errors/api-error.js';
import { EbayError } from '../../src/errors/ebay-error.js';

describe('ApiError', () => {
  describe('constructor', () => {
    it('extends EbayError', () => {
      const error = new ApiError('Test error', { ErrorCode: '123' });
      expect(error).toBeInstanceOf(EbayError);
      expect(error).toBeInstanceOf(Error);
    });

    it('sets name to ApiError', () => {
      const error = new ApiError('Test error', { ErrorCode: '123' });
      expect(error.name).toBe('ApiError');
    });

    it('sets message', () => {
      const error = new ApiError('Test error message', { ErrorCode: '123' });
      expect(error.message).toBe('Test error message');
    });

    it('extracts error code from details', () => {
      const error = new ApiError('Test', { ErrorCode: '21916734' });
      expect(error.ebayErrorCode).toBe('21916734');
    });

    it('defaults error code to UNKNOWN when missing', () => {
      const error = new ApiError('Test', {});
      expect(error.ebayErrorCode).toBe('UNKNOWN');
    });

    it('extracts short message from details', () => {
      const error = new ApiError('Test', { ShortMessage: 'Short msg' });
      expect(error.shortMessage).toBe('Short msg');
    });

    it('falls back to message for short message', () => {
      const error = new ApiError('Fallback message', {});
      expect(error.shortMessage).toBe('Fallback message');
    });

    it('extracts long message from details', () => {
      const error = new ApiError('Test', { LongMessage: 'Long detailed message' });
      expect(error.longMessage).toBe('Long detailed message');
    });

    it('extracts severity from details', () => {
      const error = new ApiError('Test', { SeverityCode: 'Warning' });
      expect(error.severity).toBe('Warning');
    });

    it('defaults severity to Error', () => {
      const error = new ApiError('Test', {});
      expect(error.severity).toBe('Error');
    });

    it('extracts classification from details', () => {
      const error = new ApiError('Test', { ErrorClassification: 'RequestError' });
      expect(error.classification).toBe('RequestError');
    });

    it('handles array of errors', () => {
      const errors: EbayApiErrorDetail[] = [
        { ErrorCode: '100', ShortMessage: 'First' },
        { ErrorCode: '200', ShortMessage: 'Second' },
      ];
      const error = new ApiError('Test', errors);
      expect(error.details).toHaveLength(2);
      expect(error.ebayErrorCode).toBe('100'); // First error
    });

    it('stores operation name', () => {
      const error = new ApiError('Test', { ErrorCode: '123' }, 'AddItem');
      expect(error.operation).toBe('AddItem');
    });
  });

  describe('fromResponse', () => {
    it('returns null for Success response', () => {
      const response = { Ack: 'Success' };
      expect(ApiError.fromResponse(response)).toBeNull();
    });

    it('creates error for Failure response', () => {
      const response = {
        Ack: 'Failure',
        Errors: { ErrorCode: '123', LongMessage: 'Something went wrong' },
      };
      const error = ApiError.fromResponse(response);
      expect(error).toBeInstanceOf(ApiError);
      expect(error?.message).toBe('Something went wrong');
    });

    it('creates error for Warning response', () => {
      const response = {
        Ack: 'Warning',
        Errors: { ErrorCode: '456', ShortMessage: 'Warning message' },
      };
      const error = ApiError.fromResponse(response);
      expect(error).toBeInstanceOf(ApiError);
    });

    it('uses ShortMessage when LongMessage is missing', () => {
      const response = {
        Ack: 'Failure',
        Errors: { ErrorCode: '123', ShortMessage: 'Short only' },
      };
      const error = ApiError.fromResponse(response);
      expect(error?.message).toBe('Short only');
    });

    it('uses default message when no messages available', () => {
      const response = {
        Ack: 'Failure',
        Errors: { ErrorCode: '123' },
      };
      const error = ApiError.fromResponse(response);
      expect(error?.message).toBe('eBay API error');
    });

    it('handles missing Errors', () => {
      const response = { Ack: 'Failure' };
      const error = ApiError.fromResponse(response);
      expect(error?.message).toBe('Unknown eBay API error');
    });

    it('handles array of errors', () => {
      const response = {
        Ack: 'Failure',
        Errors: [
          { ErrorCode: '100', LongMessage: 'First error' },
          { ErrorCode: '200', LongMessage: 'Second error' },
        ],
      };
      const error = ApiError.fromResponse(response);
      expect(error?.details).toHaveLength(2);
      expect(error?.message).toBe('First error');
    });

    it('includes operation name', () => {
      const response = {
        Ack: 'Failure',
        Errors: { ErrorCode: '123' },
      };
      const error = ApiError.fromResponse(response, 'GetItem');
      expect(error?.operation).toBe('GetItem');
    });
  });

  describe('hasErrorCode', () => {
    it('returns true when code exists', () => {
      const error = new ApiError('Test', [
        { ErrorCode: '100' },
        { ErrorCode: '200' },
      ]);
      expect(error.hasErrorCode('200')).toBe(true);
    });

    it('returns false when code does not exist', () => {
      const error = new ApiError('Test', [{ ErrorCode: '100' }]);
      expect(error.hasErrorCode('999')).toBe(false);
    });

    it('returns false for empty details', () => {
      const error = new ApiError('Test', []);
      expect(error.hasErrorCode('100')).toBe(false);
    });
  });

  describe('hasErrors', () => {
    it('returns true when there are errors', () => {
      const error = new ApiError('Test', [{ SeverityCode: 'Error' }]);
      expect(error.hasErrors()).toBe(true);
    });

    it('returns false when only warnings', () => {
      const error = new ApiError('Test', [{ SeverityCode: 'Warning' }]);
      expect(error.hasErrors()).toBe(false);
    });

    it('returns true when mixed errors and warnings', () => {
      const error = new ApiError('Test', [
        { SeverityCode: 'Warning' },
        { SeverityCode: 'Error' },
      ]);
      expect(error.hasErrors()).toBe(true);
    });
  });

  describe('getErrorCodes', () => {
    it('returns all error codes', () => {
      const error = new ApiError('Test', [
        { ErrorCode: '100' },
        { ErrorCode: '200' },
        { ErrorCode: '300' },
      ]);
      expect(error.getErrorCodes()).toEqual(['100', '200', '300']);
    });

    it('filters out undefined codes', () => {
      const error = new ApiError('Test', [
        { ErrorCode: '100' },
        { ShortMessage: 'No code' },
        { ErrorCode: '200' },
      ]);
      expect(error.getErrorCodes()).toEqual(['100', '200']);
    });

    it('returns empty array when no codes', () => {
      const error = new ApiError('Test', [{ ShortMessage: 'No code' }]);
      expect(error.getErrorCodes()).toEqual([]);
    });
  });
});
