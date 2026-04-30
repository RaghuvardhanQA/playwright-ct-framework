// Custom test fixture for component tests.
// All component test files import `test` and `expect` from this file —
// never directly from '@playwright/experimental-ct-react'.
// This keeps room to add fixtures (theme, viewport, mocks) without touching every test.

import { test as base, expect } from '@playwright/experimental-ct-react';

export const test = base;
export { expect };
