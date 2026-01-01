/**
 * Build an acknowledgment response for eBay notifications.
 *
 * eBay expects a quick 200 OK response to acknowledge receipt.
 * This helper builds an appropriate response body.
 *
 * @returns Acknowledgment response string
 */
export function buildAckResponse(): string {
  return 'OK';
}

/**
 * Build a challenge response for eBay endpoint verification.
 *
 * When you register a notification URL, eBay sends a GET request
 * with a challenge parameter. You must respond with the challenge
 * value as plain text.
 *
 * @param challenge - The challenge value from eBay
 * @returns The challenge value to send back
 */
export function buildChallengeResponse(challenge: string): string {
  return challenge;
}

/**
 * Response headers for notification acknowledgment.
 */
export const ACK_RESPONSE_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
} as const;

/**
 * Check if a request is a challenge verification request.
 *
 * @param method - The HTTP method
 * @param query - The query parameters
 * @returns True if this is a challenge request
 */
export function isChallengeRequest(
  method: string,
  query: Record<string, string | undefined> | URLSearchParams
): boolean {
  if (method.toUpperCase() !== 'GET') {
    return false;
  }

  if (query instanceof URLSearchParams) {
    return query.has('challenge');
  }

  return 'challenge' in query && query.challenge !== undefined;
}

/**
 * Get the challenge value from a request.
 *
 * @param query - The query parameters
 * @returns The challenge value or undefined
 */
export function getChallengeValue(
  query: Record<string, string | undefined> | URLSearchParams
): string | undefined {
  if (query instanceof URLSearchParams) {
    return query.get('challenge') ?? undefined;
  }

  return query.challenge;
}
