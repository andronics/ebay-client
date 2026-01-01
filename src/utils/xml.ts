import { XMLParser, XMLBuilder } from 'fast-xml-parser';

/**
 * XML Parser configured for eBay API responses.
 *
 * - Preserves attributes with '@_' prefix
 * - Removes namespace prefixes for cleaner access
 * - Does NOT auto-parse tag values (keeps strings as strings)
 */
export const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
  // Don't auto-parse numbers - keep as strings to match WSDL types
  parseTagValue: false,
  parseAttributeValue: false,
  // Handle arrays consistently
  isArray: (name) => {
    // Force certain elements to always be arrays
    const alwaysArrays = [
      'Errors',
      'NotificationEnable',
      'NameValueList',
      'ShippingServiceOptions',
      'PaymentMethods',
      'Item',
      'Order',
      'LineItem',
    ];
    return alwaysArrays.includes(name);
  },
});

/**
 * XML Builder configured for eBay API requests.
 *
 * - Preserves attributes with '@_' prefix
 * - No formatting (compact output)
 */
export const xmlBuilder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: false,
  suppressEmptyNode: true,
});

/**
 * The eBay Trading API XML namespace.
 */
export const EBAY_NAMESPACE = 'urn:ebay:apis:eBLBaseComponents';

/**
 * Build an eBay Trading API XML request body.
 *
 * @param operationName - The API operation name (e.g., 'GetTokenStatus')
 * @param authToken - The eBay auth token
 * @param params - Additional request parameters
 * @returns XML string ready to send
 */
export function buildTradingRequest(
  operationName: string,
  authToken: string,
  params: object = {}
): string {
  const requestObj = {
    [`${operationName}Request`]: {
      '@_xmlns': EBAY_NAMESPACE,
      RequesterCredentials: {
        eBayAuthToken: authToken,
      },
      ...params,
    },
  };

  return '<?xml version="1.0" encoding="utf-8"?>' + xmlBuilder.build(requestObj);
}

/**
 * Parse an eBay Trading API XML response.
 *
 * @param xml - The XML response string
 * @param operationName - The expected operation name
 * @returns The parsed response object
 * @throws Error if response is invalid
 */
export function parseTradingResponse<T>(xml: string, operationName: string): T {
  const parsed = xmlParser.parse(xml);
  const responseKey = `${operationName}Response`;
  const result = parsed[responseKey];

  if (!result) {
    throw new Error(`Invalid response: missing ${responseKey}`);
  }

  return result as T;
}

/**
 * Parse any eBay XML (for notifications, etc.).
 *
 * @param xml - The XML string to parse
 * @returns The parsed object
 */
export function parseXml<T = unknown>(xml: string): T {
  return xmlParser.parse(xml) as T;
}

/**
 * Build an XML string from an object.
 *
 * @param obj - The object to convert to XML
 * @returns XML string
 */
export function buildXml(obj: object): string {
  return xmlBuilder.build(obj);
}

/**
 * Wrap content in CDATA for HTML descriptions.
 *
 * @param content - The content to wrap
 * @returns CDATA-wrapped string
 */
export function wrapCDATA(content: string): string {
  return `<![CDATA[${content}]]>`;
}
