# eBay Sandbox Integration Tests

These tests run against the **real eBay Sandbox API** to validate full end-to-end functionality.

## Setup

1. Get sandbox credentials from the [eBay Developer Portal](https://developer.ebay.com/)
2. Set environment variables:

```bash
export EBAY_SANDBOX_APP_ID="your-app-id"
export EBAY_SANDBOX_DEV_ID="your-dev-id"
export EBAY_SANDBOX_CERT_ID="your-cert-id"
export EBAY_SANDBOX_AUTH_TOKEN="your-auth-token"
```

Alternatively, create a `.env.test` file (not committed):

```
EBAY_SANDBOX_APP_ID=your-app-id
EBAY_SANDBOX_DEV_ID=your-dev-id
EBAY_SANDBOX_CERT_ID=your-cert-id
EBAY_SANDBOX_AUTH_TOKEN=your-auth-token
```

## Running Tests

```bash
# Run sandbox tests only
npm run test:integration:sandbox

# Run with environment file
env $(cat .env.test | xargs) npm run test:integration:sandbox
```

## What Gets Tested

1. **GetTokenStatus** - Validates credentials and API connectivity
2. **VerifyAddItem** - Validates item data without creating listing
3. **AddItem** - Creates a real test listing
4. **GetItem** - Retrieves the created listing
5. **ReviseItem** - Updates the listing quantity
6. **EndItem** - Ends the listing early
7. **GetNotificationPreferences** - Reads notification settings

## Notes

- Tests create real listings in the sandbox - they are automatically ended
- The sandbox API can be slow/flaky - tests have 30s timeout
- Tests are skipped automatically if credentials are not set
- All test items include "DO NOT BID" in title for clarity
