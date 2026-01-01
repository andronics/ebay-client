/**
 * Sample eBay notification XML payloads for testing.
 */

export const ITEM_SOLD_SOAP = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soapenv:Body>
    <GetItemTransactionsResponse xmlns="urn:ebay:apis:eBLBaseComponents">
      <NotificationEventName>ItemSold</NotificationEventName>
      <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
      <RecipientUserID>testseller123</RecipientUserID>
      <CorrelationID>12345678</CorrelationID>
      <NotificationSignature>abc123signature==</NotificationSignature>
      <Item>
        <ItemID>123456789012</ItemID>
        <Title>Test Product for Sale</Title>
        <SellingStatus>
          <CurrentPrice currencyID="GBP">29.99</CurrentPrice>
        </SellingStatus>
        <Quantity>5</Quantity>
        <ListingType>FixedPriceItem</ListingType>
      </Item>
      <TransactionArray>
        <Transaction>
          <TransactionID>9876543210</TransactionID>
          <TransactionPrice currencyID="GBP">29.99</TransactionPrice>
          <QuantityPurchased>1</QuantityPurchased>
          <CreatedDate>2024-01-15T10:30:00.000Z</CreatedDate>
          <Buyer>
            <UserID>testbuyer456</UserID>
            <Email>buyer@example.com</Email>
          </Buyer>
        </Transaction>
      </TransactionArray>
    </GetItemTransactionsResponse>
  </soapenv:Body>
</soapenv:Envelope>`;

export const ITEM_SOLD_DIRECT = `<?xml version="1.0" encoding="UTF-8"?>
<GetItemTransactionsResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <NotificationEventName>ItemSold</NotificationEventName>
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <RecipientUserID>testseller123</RecipientUserID>
  <CorrelationID>12345678</CorrelationID>
  <Item>
    <ItemID>123456789012</ItemID>
    <Title>Test Product for Sale</Title>
    <SellingStatus>
      <CurrentPrice currencyID="GBP">29.99</CurrentPrice>
    </SellingStatus>
    <Quantity>5</Quantity>
    <ListingType>FixedPriceItem</ListingType>
  </Item>
  <TransactionArray>
    <Transaction>
      <TransactionID>9876543210</TransactionID>
      <TransactionPrice currencyID="GBP">29.99</TransactionPrice>
      <QuantityPurchased>1</QuantityPurchased>
      <CreatedDate>2024-01-15T10:30:00.000Z</CreatedDate>
      <Buyer>
        <UserID>testbuyer456</UserID>
        <Email>buyer@example.com</Email>
      </Buyer>
    </Transaction>
  </TransactionArray>
</GetItemTransactionsResponse>`;

export const ITEM_ENDED = `<?xml version="1.0" encoding="UTF-8"?>
<ItemEndedNotification xmlns="urn:ebay:apis:eBLBaseComponents">
  <NotificationEventName>ItemEnded</NotificationEventName>
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <RecipientUserID>testseller123</RecipientUserID>
  <Item>
    <ItemID>123456789012</ItemID>
    <Title>Ended Product</Title>
    <EndReason>NotSold</EndReason>
  </Item>
</ItemEndedNotification>`;

export const FIXED_PRICE_TRANSACTION = `<?xml version="1.0" encoding="UTF-8"?>
<FixedPriceTransactionNotification xmlns="urn:ebay:apis:eBLBaseComponents">
  <NotificationEventName>FixedPriceTransaction</NotificationEventName>
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <RecipientUserID>testseller123</RecipientUserID>
  <CorrelationID>87654321</CorrelationID>
  <Item>
    <ItemID>555555555555</ItemID>
    <Title>Fixed Price Item</Title>
    <Quantity>10</Quantity>
  </Item>
  <TransactionArray>
    <Transaction>
      <TransactionID>1111111111</TransactionID>
      <TransactionPrice currencyID="USD">19.99</TransactionPrice>
      <QuantityPurchased>2</QuantityPurchased>
      <CreatedDate>2024-01-15T10:30:00.000Z</CreatedDate>
      <Buyer>
        <UserID>usbuyer789</UserID>
        <Email>usbuyer@example.com</Email>
      </Buyer>
    </Transaction>
  </TransactionArray>
</FixedPriceTransactionNotification>`;

export const NOTIFICATION_NO_ITEM = `<?xml version="1.0" encoding="UTF-8"?>
<OtherNotification xmlns="urn:ebay:apis:eBLBaseComponents">
  <NotificationEventName>Unknown</NotificationEventName>
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <RecipientUserID>testseller123</RecipientUserID>
</OtherNotification>`;

export const NOTIFICATION_WITH_MULTIPLE_TRANSACTIONS = `<?xml version="1.0" encoding="UTF-8"?>
<GetItemTransactionsResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <NotificationEventName>ItemSold</NotificationEventName>
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <RecipientUserID>testseller123</RecipientUserID>
  <Item>
    <ItemID>123456789012</ItemID>
    <Title>Multi-Transaction Item</Title>
  </Item>
  <TransactionArray>
    <Transaction>
      <TransactionID>111</TransactionID>
      <TransactionPrice currencyID="GBP">10.00</TransactionPrice>
      <QuantityPurchased>1</QuantityPurchased>
      <Buyer>
        <UserID>buyer1</UserID>
      </Buyer>
    </Transaction>
    <Transaction>
      <TransactionID>222</TransactionID>
      <TransactionPrice currencyID="GBP">15.00</TransactionPrice>
      <QuantityPurchased>2</QuantityPurchased>
      <Buyer>
        <UserID>buyer2</UserID>
      </Buyer>
    </Transaction>
  </TransactionArray>
</GetItemTransactionsResponse>`;

export const MALFORMED_NOTIFICATION = `<?xml version="1.0" encoding="UTF-8"?>
<RandomElement>
  <SomeData>not a valid notification</SomeData>
</RandomElement>`;

export const VALID_STRUCTURE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<SomeNotification>
  <NotificationEventName>TestEvent</NotificationEventName>
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <RecipientUserID>user123</RecipientUserID>
</SomeNotification>`;

export const INVALID_STRUCTURE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<SomeNotification>
  <NotificationEventName>TestEvent</NotificationEventName>
</SomeNotification>`;
