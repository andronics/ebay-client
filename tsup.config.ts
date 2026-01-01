import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/trading/index.ts',
    'src/fulfillment/index.ts',
    'src/notifications/index.ts',
    'src/auth/index.ts',
    'src/types/index.ts',
    'src/types/trading/index.ts',
    'src/types/fulfillment/index.ts',
    'src/types/notifications/index.ts',
    'src/errors/index.ts',
  ],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
});
