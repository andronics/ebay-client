/**
 * Sample Trading API XML responses for testing.
 */

export const GET_TOKEN_STATUS_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<GetTokenStatusResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
  <Build>E1225_CORE_APIXO_12345678_R1</Build>
  <TokenStatus>
    <Status>Active</Status>
    <EIASToken>nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6wJnY+gD5aCpQ==</EIASToken>
    <ExpirationTime>2025-06-15T00:00:00.000Z</ExpirationTime>
  </TokenStatus>
</GetTokenStatusResponse>`;

export const GET_TOKEN_STATUS_FAILURE = `<?xml version="1.0" encoding="UTF-8"?>
<GetTokenStatusResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Failure</Ack>
  <Errors>
    <ShortMessage>Invalid token</ShortMessage>
    <LongMessage>The authentication token is invalid or expired.</LongMessage>
    <ErrorCode>931</ErrorCode>
    <SeverityCode>Error</SeverityCode>
    <ErrorClassification>RequestError</ErrorClassification>
  </Errors>
  <Version>1225</Version>
  <Build>E1225_CORE_APIXO_12345678_R1</Build>
</GetTokenStatusResponse>`;

export const VERIFY_ADD_ITEM_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<VerifyAddItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
  <ItemID>0</ItemID>
  <Fees>
    <Fee>
      <Name>InsertionFee</Name>
      <Fee currencyID="GBP">0.35</Fee>
    </Fee>
  </Fees>
</VerifyAddItemResponse>`;

export const ADD_ITEM_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<AddItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
  <ItemID>123456789012</ItemID>
  <StartTime>2024-01-15T10:30:00.000Z</StartTime>
  <EndTime>2024-02-14T10:30:00.000Z</EndTime>
  <Fees>
    <Fee>
      <Name>InsertionFee</Name>
      <Fee currencyID="GBP">0.35</Fee>
    </Fee>
    <Fee>
      <Name>FinalValueFee</Name>
      <Fee currencyID="GBP">0.00</Fee>
    </Fee>
  </Fees>
</AddItemResponse>`;

export const ADD_ITEM_ERROR = `<?xml version="1.0" encoding="UTF-8"?>
<AddItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Failure</Ack>
  <Errors>
    <ShortMessage>Missing required field</ShortMessage>
    <LongMessage>The item specific Brand is missing. Add Brand to this listing.</LongMessage>
    <ErrorCode>21916587</ErrorCode>
    <SeverityCode>Error</SeverityCode>
    <ErrorClassification>RequestError</ErrorClassification>
    <ErrorParameters ParamID="0">
      <Value>Brand</Value>
    </ErrorParameters>
  </Errors>
  <Version>1225</Version>
</AddItemResponse>`;

export const GET_ITEM_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<GetItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
  <Item>
    <ItemID>123456789012</ItemID>
    <Title>Test Item Title</Title>
    <PrimaryCategory>
      <CategoryID>12345</CategoryID>
      <CategoryName>Test Category</CategoryName>
    </PrimaryCategory>
    <StartPrice currencyID="GBP">9.99</StartPrice>
    <Quantity>10</Quantity>
    <ConditionID>1000</ConditionID>
    <ListingStatus>Active</ListingStatus>
  </Item>
</GetItemResponse>`;

export const REVISE_ITEM_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<ReviseItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
  <ItemID>123456789012</ItemID>
  <StartTime>2024-01-15T10:30:00.000Z</StartTime>
  <EndTime>2024-02-14T10:30:00.000Z</EndTime>
</ReviseItemResponse>`;

export const END_ITEM_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<EndItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
  <EndTime>2024-01-15T10:35:00.000Z</EndTime>
</EndItemResponse>`;

export const SET_NOTIFICATION_PREFERENCES_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<SetNotificationPreferencesResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
</SetNotificationPreferencesResponse>`;

export const GET_NOTIFICATION_PREFERENCES_SUCCESS = `<?xml version="1.0" encoding="UTF-8"?>
<GetNotificationPreferencesResponse xmlns="urn:ebay:apis:eBLBaseComponents">
  <Timestamp>2024-01-15T10:30:00.000Z</Timestamp>
  <Ack>Success</Ack>
  <Version>1225</Version>
  <ApplicationDeliveryPreferences>
    <ApplicationURL>https://example.com/notifications</ApplicationURL>
    <ApplicationEnable>Enable</ApplicationEnable>
    <AlertEmail>none</AlertEmail>
  </ApplicationDeliveryPreferences>
  <UserDeliveryPreferenceArray>
    <NotificationEnable>
      <EventType>ItemSold</EventType>
      <EventEnable>Enable</EventEnable>
    </NotificationEnable>
    <NotificationEnable>
      <EventType>FixedPriceTransaction</EventType>
      <EventEnable>Enable</EventEnable>
    </NotificationEnable>
  </UserDeliveryPreferenceArray>
</GetNotificationPreferencesResponse>`;
