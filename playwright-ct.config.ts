import { defineConfig, devices } from '@playwright/experimental-ct-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    testDir: './src',
    testMatch: '**/*.spec.tsx',
    snapshotDir: './__snapshots__',
    timeout: 10 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        trace: 'on-first-retry',
        ctPort: 3100,
        ctViteConfig: {
            plugins: [tsconfigPaths()],
        },
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
