// Facade over Playwright's assertion API.
// Tests use these wrappers so future cross-cutting changes
// (soft mode, custom messages, retries) happen in one place.

import { Locator, expect } from '@playwright/test';

export interface AssertOptions {
    soft?: boolean;
    timeout?: number;
}

export async function expectElementToBeVisible(locator: Locator, options?: AssertOptions): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toBeVisible({ timeout: options?.timeout });
}

export async function expectElementToBeHidden(locator: Locator, options?: AssertOptions): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toBeHidden({ timeout: options?.timeout });
}

export async function expectElementToBeEnabled(locator: Locator, options?: AssertOptions): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toBeEnabled({ timeout: options?.timeout });
}

export async function expectElementToBeDisabled(locator: Locator, options?: AssertOptions): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toBeDisabled({ timeout: options?.timeout });
}

export async function expectElementToBeChecked(locator: Locator, options?: AssertOptions): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toBeChecked({ timeout: options?.timeout });
}

export async function expectElementToHaveText(
    locator: Locator,
    text: string | RegExp,
    options?: AssertOptions,
): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toHaveText(text, { timeout: options?.timeout });
}

export async function expectElementToContainText(
    locator: Locator,
    text: string | RegExp,
    options?: AssertOptions,
): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toContainText(text, { timeout: options?.timeout });
}

export async function expectElementToHaveValue(
    locator: Locator,
    value: string | RegExp,
    options?: AssertOptions,
): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toHaveValue(value, { timeout: options?.timeout });
}

export async function expectElementToHaveCount(
    locator: Locator,
    count: number,
    options?: AssertOptions,
): Promise<void> {
    const assertion = options?.soft ? expect.soft(locator) : expect(locator);
    await assertion.toHaveCount(count, { timeout: options?.timeout });
}
