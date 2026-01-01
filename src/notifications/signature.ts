import { SignatureError } from '../errors/signature-error.js';

/**
 * Configuration for signature verification.
 */
export interface SignatureVerificationConfig {
  /** eBay Certificate ID */
  certId: string;
  /** Maximum age of notification in milliseconds (default: 10 minutes) */
  maxAgeMs?: number;
  /** Skip timestamp validation */
  skipTimestampCheck?: boolean;
}

/**
 * Headers from the notification request.
 */
export interface NotificationHeaders {
  'x-ebay-signature'?: string;
  'x-ebay-timestamp'?: string;
  [key: string]: string | undefined;
}

/**
 * Normalize header keys to lowercase.
 */
function normalizeHeaders(
  headers: NotificationHeaders | Headers | Record<string, string>
): Record<string, string> {
  const normalized: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      normalized[key.toLowerCase()] = value;
    });
  } else {
    for (const [key, value] of Object.entries(headers)) {
      if (value !== undefined) {
        normalized[key.toLowerCase()] = value;
      }
    }
  }

  return normalized;
}

/**
 * Verify the signature of an eBay notification.
 *
 * Note: eBay's signature verification is complex and varies by notification type.
 * This implementation provides a framework that can be extended based on specific
 * eBay documentation for your use case.
 *
 * @param rawXml - The raw XML body of the notification
 * @param headers - The HTTP headers from the request
 * @param config - Verification configuration
 * @returns True if signature is valid
 * @throws SignatureError if verification fails
 */
export async function verifySignature(
  rawXml: string,
  headers: NotificationHeaders | Headers | Record<string, string>,
  config: SignatureVerificationConfig
): Promise<boolean> {
  const normalizedHeaders = normalizeHeaders(headers);

  // Check for signature header
  const signature = normalizedHeaders['x-ebay-signature'];
  if (!signature) {
    // Some notifications don't include signature headers
    // Check for signature in the XML body instead
    if (!rawXml.includes('NotificationSignature')) {
      // No signature present - may be valid for some notification types
      return true;
    }
  }

  // Check timestamp if present
  if (!config.skipTimestampCheck) {
    const timestampHeader = normalizedHeaders['x-ebay-timestamp'];
    if (timestampHeader) {
      const timestamp = new Date(timestampHeader);
      const now = new Date();
      const maxAge = config.maxAgeMs ?? 600000; // 10 minutes default

      if (now.getTime() - timestamp.getTime() > maxAge) {
        throw SignatureError.expiredTimestamp(timestampHeader);
      }
    }
  }

  // For full signature verification, you would need to:
  // 1. Extract the signature from the XML or header
  // 2. Compute the expected signature using your cert
  // 3. Compare the signatures
  //
  // The exact algorithm depends on the notification type and eBay's
  // documentation for your specific integration.
  //
  // This is a placeholder that validates the structure is correct
  // but doesn't perform cryptographic verification.

  return true;
}

/**
 * Extract the signature from a notification XML body.
 *
 * @param xml - The raw XML body
 * @returns The signature value or undefined
 */
export function extractSignatureFromXml(xml: string): string | undefined {
  const match = xml.match(/<NotificationSignature>([^<]+)<\/NotificationSignature>/);
  return match?.[1];
}

/**
 * Validate that a notification is from eBay (basic checks).
 * This performs structural validation without cryptographic verification.
 *
 * @param rawXml - The raw XML body
 * @returns True if the notification appears valid
 */
export function validateNotificationStructure(rawXml: string): boolean {
  // Check for required eBay notification elements
  const requiredElements = [
    'NotificationEventName',
    'RecipientUserID',
    'Timestamp',
  ];

  for (const element of requiredElements) {
    if (!rawXml.includes(`<${element}>`)) {
      return false;
    }
  }

  return true;
}
