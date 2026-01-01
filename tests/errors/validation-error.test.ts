import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { ValidationError } from '../../src/errors/validation-error.js';
import { EbayError } from '../../src/errors/ebay-error.js';

describe('ValidationError', () => {
  describe('constructor', () => {
    it('extends EbayError', () => {
      const error = new ValidationError('Test error');
      expect(error).toBeInstanceOf(EbayError);
      expect(error).toBeInstanceOf(Error);
    });

    it('sets name to ValidationError', () => {
      const error = new ValidationError('Test error');
      expect(error.name).toBe('ValidationError');
    });

    it('sets message', () => {
      const error = new ValidationError('Validation failed');
      expect(error.message).toBe('Validation failed');
    });

    it('stores zodError', () => {
      const schema = z.object({ name: z.string() });
      const result = schema.safeParse({ name: 123 });
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        expect(error.zodError).toBe(result.error);
      }
    });

    it('extracts issues from zodError', () => {
      const schema = z.object({ name: z.string() });
      const result = schema.safeParse({ name: 123 });
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        expect(error.issues.length).toBeGreaterThan(0);
      }
    });

    it('sets empty issues when no zodError', () => {
      const error = new ValidationError('Failed');
      expect(error.issues).toEqual([]);
    });

    it('stores validationType', () => {
      const error = new ValidationError('Failed', undefined, 'Notification');
      expect(error.validationType).toBe('Notification');
    });
  });

  describe('fromZodError', () => {
    it('creates ValidationError from ZodError', () => {
      const schema = z.object({ name: z.string() });
      const result = schema.safeParse({ name: 123 });
      if (!result.success) {
        const error = ValidationError.fromZodError(result.error);
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toContain('Validation failed');
      }
    });

    it('includes field path in message', () => {
      const schema = z.object({ user: z.object({ email: z.string().email() }) });
      const result = schema.safeParse({ user: { email: 'invalid' } });
      if (!result.success) {
        const error = ValidationError.fromZodError(result.error);
        expect(error.message).toContain('user.email');
      }
    });

    it('includes validation type in error', () => {
      const schema = z.object({ name: z.string() });
      const result = schema.safeParse({ name: 123 });
      if (!result.success) {
        const error = ValidationError.fromZodError(result.error, 'Order');
        expect(error.validationType).toBe('Order');
      }
    });

    it('handles multiple issues', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });
      const result = schema.safeParse({ name: 123, age: 'old' });
      if (!result.success) {
        const error = ValidationError.fromZodError(result.error);
        expect(error.issues.length).toBe(2);
        expect(error.message).toContain(';');
      }
    });
  });

  describe('formatIssues', () => {
    it('formats single issue', () => {
      const schema = z.object({ name: z.string() });
      const result = schema.safeParse({ name: 123 });
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        const formatted = error.formatIssues();
        expect(formatted).toContain('name');
      }
    });

    it('formats multiple issues with newlines', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });
      const result = schema.safeParse({ name: 123, age: 'old' });
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        const formatted = error.formatIssues();
        expect(formatted).toContain('\n');
      }
    });

    it('handles issues without path', () => {
      const schema = z.string();
      const result = schema.safeParse(123);
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        const formatted = error.formatIssues();
        expect(formatted).not.toContain(':'); // No path prefix
      }
    });

    it('returns empty string when no issues', () => {
      const error = new ValidationError('Failed');
      expect(error.formatIssues()).toBe('');
    });
  });

  describe('getIssuesForPath', () => {
    it('returns issues for matching path', () => {
      const schema = z.object({
        user: z.object({
          email: z.string().email(),
          name: z.string(),
        }),
      });
      const result = schema.safeParse({ user: { email: 'bad', name: 123 } });
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        const emailIssues = error.getIssuesForPath('user.email');
        expect(emailIssues.length).toBe(1);
      }
    });

    it('returns empty array for non-matching path', () => {
      const schema = z.object({ name: z.string() });
      const result = schema.safeParse({ name: 123 });
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        const issues = error.getIssuesForPath('email');
        expect(issues).toEqual([]);
      }
    });

    it('handles nested paths', () => {
      const schema = z.object({
        deep: z.object({
          nested: z.object({
            value: z.number(),
          }),
        }),
      });
      const result = schema.safeParse({ deep: { nested: { value: 'string' } } });
      if (!result.success) {
        const error = new ValidationError('Failed', result.error);
        const issues = error.getIssuesForPath('deep.nested.value');
        expect(issues.length).toBe(1);
      }
    });
  });
});
