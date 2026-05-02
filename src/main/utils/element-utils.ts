// Facade over Playwright's locator-resolution helpers.
// Component tests use these instead of calling component.locator(...) directly.

import { Locator } from '@playwright/test';

export function getLocator(component: Locator, selector: string): Locator {
    return component.locator(selector);
}

export function getLocatorByRole(
    component: Locator,
    role: Parameters<Locator['getByRole']>[0],
    options?: Parameters<Locator['getByRole']>[1],
): Locator {
    return component.getByRole(role, options);
}

export function getLocatorByText(component: Locator, text: string | RegExp): Locator {
    return component.getByText(text);
}

export function getLocatorByLabel(component: Locator, label: string | RegExp): Locator {
    return component.getByLabel(label);
}

export function getLocatorByPlaceholder(component: Locator, placeholder: string | RegExp): Locator {
    return component.getByPlaceholder(placeholder);
}

export function getLocatorByTestId(component: Locator, testId: string): Locator {
    return component.getByTestId(testId);
}

export async function getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
}

export async function getInputValue(locator: Locator): Promise<string> {
    return locator.inputValue();
}
