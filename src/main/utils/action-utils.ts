// Facade over Playwright's locator interactions for component tests.
// Tests and component-objects must use these wrappers — never call
// locator.click() / locator.fill() directly.

import { Locator } from '@playwright/test';

export interface ClickOptions {
    force?: boolean;
}

export async function click(locator: Locator, options?: ClickOptions): Promise<void> {
    await locator.click(options);
}

export async function fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
}

export async function fillAndEnter(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
    await locator.press('Enter');
}

export async function check(locator: Locator): Promise<void> {
    await locator.check();
}

export async function uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
}

export async function hover(locator: Locator): Promise<void> {
    await locator.hover();
}

export async function selectByText(locator: Locator, text: string): Promise<void> {
    await locator.selectOption({ label: text });
}
