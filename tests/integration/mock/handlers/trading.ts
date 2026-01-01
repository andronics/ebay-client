import { http, HttpResponse } from 'msw';

/**
 * eBay Trading API endpoint (sandbox).
 */
const TRADING_API_URL = 'https://api.sandbox.ebay.com/ws/api.dll';

/**
 * Sample XML responses for Trading API operations.
 */
const responses = {
  AddItem: `<?xml version="1.0" encoding="UTF-8"?>
<AddItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Success</Ack>
  <ItemID>110123456789</ItemID>
  <StartTime>2024-01-15T10:00:00.000Z</StartTime>
  <EndTime>2024-01-22T10:00:00.000Z</EndTime>
  <Fees>
    <Fee>
      <Name>InsertionFee</Name>
      <Amount currencyID="GBP">0.00</Amount>
    </Fee>
    <Fee>
      <Name>FinalValueFee</Name>
      <Amount currencyID="GBP">0.00</Amount>
    </Fee>
  </Fees>
</AddItemResponse>`,

  GetItem: `<?xml version="1.0" encoding="UTF-8"?>
<GetItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Success</Ack>
  <Item>
    <ItemID>110123456789</ItemID>
    <Title>Test Integration Item</Title>
    <Description><![CDATA[<p>Test item description</p>]]></Description>
    <PrimaryCategory>
      <CategoryID>11450</CategoryID>
      <CategoryName>Coins</CategoryName>
    </PrimaryCategory>
    <StartPrice currencyID="GBP">9.99</StartPrice>
    <Quantity>10</Quantity>
    <ListingType>FixedPriceItem</ListingType>
    <ListingStatus>Active</ListingStatus>
    <SellingStatus>
      <CurrentPrice currencyID="GBP">9.99</CurrentPrice>
      <QuantitySold>0</QuantitySold>
    </SellingStatus>
    <TimeLeft>P6DT23H59M59S</TimeLeft>
  </Item>
</GetItemResponse>`,

  ReviseItem: `<?xml version="1.0" encoding="UTF-8"?>
<ReviseItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Success</Ack>
  <ItemID>110123456789</ItemID>
  <StartTime>2024-01-15T10:00:00.000Z</StartTime>
  <EndTime>2024-01-22T10:00:00.000Z</EndTime>
</ReviseItemResponse>`,

  EndItem: `<?xml version="1.0" encoding="UTF-8"?>
<EndItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Success</Ack>
  <EndTime>2024-01-15T12:00:00.000Z</EndTime>
</EndItemResponse>`,

  VerifyAddItem: `<?xml version="1.0" encoding="UTF-8"?>
<VerifyAddItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Success</Ack>
  <ItemID>0</ItemID>
  <Fees>
    <Fee>
      <Name>InsertionFee</Name>
      <Amount currencyID="GBP">0.00</Amount>
    </Fee>
  </Fees>
</VerifyAddItemResponse>`,

  GetTokenStatus: `<?xml version="1.0" encoding="UTF-8"?>
<GetTokenStatusResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Success</Ack>
  <TokenStatus>
    <Status>Active</Status>
    <ExpirationTime>2025-07-15T10:00:00.000Z</ExpirationTime>
  </TokenStatus>
</GetTokenStatusResponse>`,

  Failure: `<?xml version="1.0" encoding="UTF-8"?>
<GetItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Ack>Failure</Ack>
  <Errors>
    <ShortMessage>Invalid item ID</ShortMessage>
    <LongMessage>The item ID 999999999999 is invalid.</LongMessage>
    <ErrorCode>17</ErrorCode>
    <SeverityCode>Error</SeverityCode>
    <ErrorClassification>RequestError</ErrorClassification>
  </Errors>
</GetItemResponse>`,
};

/**
 * Tracked requests for assertion in tests.
 */
export const capturedRequests: Array<{
  callName: string;
  body: string;
  headers: Record<string, string>;
}> = [];

/**
 * Clear captured requests between tests.
 */
export function clearCapturedRequests() {
  capturedRequests.length = 0;
}

/**
 * MSW handlers for Trading API.
 */
export const tradingHandlers = [
  http.post(TRADING_API_URL, async ({ request }) => {
    const callName = request.headers.get('X-EBAY-API-CALL-NAME') ?? '';
    const body = await request.text();

    // Capture request for assertions
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    capturedRequests.push({ callName, body, headers });

    // Check for specific item ID to trigger error
    if (body.includes('<ItemID>999999999999</ItemID>')) {
      return HttpResponse.xml(responses.Failure, { status: 200 });
    }

    // Return appropriate response based on operation
    const response = responses[callName as keyof typeof responses];
    if (response) {
      return HttpResponse.xml(response, { status: 200 });
    }

    // Default: return generic success
    return HttpResponse.xml(
      `<?xml version="1.0"?><${callName}Response xmlns="urn:ebay:apis:eBLBaseComponents"><Ack>Success</Ack></${callName}Response>`,
      { status: 200 }
    );
  }),
];

/**
 * Handler that simulates a 500 error (for retry testing).
 */
export const error500Handler = http.post(TRADING_API_URL, () => {
  return new HttpResponse(null, { status: 500 });
});

/**
 * Handler that simulates a 429 rate limit.
 */
export const rateLimitHandler = http.post(TRADING_API_URL, () => {
  return new HttpResponse(null, { status: 429 });
});
