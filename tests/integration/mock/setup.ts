import { setupServer } from 'msw/node';
import { tradingHandlers } from './handlers/trading.js';
import { inventoryHandlers } from './handlers/inventory.js';

/**
 * MSW server for mocking HTTP requests in integration tests.
 */
export const server = setupServer(...tradingHandlers, ...inventoryHandlers);

/**
 * Start MSW server before tests.
 */
export function setupMockServer() {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
