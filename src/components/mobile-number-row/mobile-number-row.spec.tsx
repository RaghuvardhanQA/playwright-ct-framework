import { test, expect } from '#ctsetup';
import { click, fill, selectByText } from '#utils/action-utils';
import { getLocatorByTestId } from '#utils/element-utils';
import {
    expectElementToBeVisible,
    expectElementToHaveValue,
    expectElementToHaveText,
} from '#utils/expect-utils';
import { MobileNumberRow, MobileNumberRowValue } from '#components/mobile-number-row/mobile-number-row';
import { MobileNumberRowHarness } from '#components/mobile-number-row/mobile-number-row.harness';

// --- Locator constants (built from index 0 for these tests) ---
const TYPE_SELECT = 'mobile-type-0';
const NUMBER_INPUT = 'mobile-number-0';
const REMOVE_BTN = 'mobile-remove-0';
const ROW_ERROR = 'mobile-error-0';

const baseValue: MobileNumberRowValue = { type: 'Mobile', number: '' };

test.describe('MobileNumberRow component', () => {
    test('renders type dropdown and number input', async ({ mount }) => {
        const component = await mount(
            <MobileNumberRow
                index={0}
                value={baseValue}
                canRemove={false}
                onChange={() => {}}
                onRemove={() => {}}
            />,
        );
        await expectElementToBeVisible(getLocatorByTestId(component, TYPE_SELECT));
        await expectElementToBeVisible(getLocatorByTestId(component, NUMBER_INPUT));
    });

    test('dropdown contains all 4 mobile types', async ({ mount }) => {
        const expectedTypes = ['Home', 'Work', 'Mobile', 'Other'];
        const component = await mount(
            <MobileNumberRow
                index={0}
                value={baseValue}
                canRemove={false}
                onChange={() => {}}
                onRemove={() => {}}
            />,
        );
        const options = getLocatorByTestId(component, TYPE_SELECT).locator('option');
        await expect(options).toHaveCount(expectedTypes.length);
        for (let i = 0; i < expectedTypes.length; i++) {
            await expect(options.nth(i)).toHaveText(expectedTypes[i]);
        }
    });

    test('typing a number updates the input value via onChange', async ({ mount }) => {
        // Use the stateful harness so the controlled input actually re-renders
        // with each keystroke. With a static `value` prop the input stays
        // empty and Playwright's `fill` would race the onChange events.
        const component = await mount(<MobileNumberRowHarness />);
        await fill(getLocatorByTestId(component, NUMBER_INPUT), '5551234567');
        await expectElementToHaveValue(getLocatorByTestId(component, NUMBER_INPUT), '5551234567');
    });

    test('changing type calls onChange with new type', async ({ mount }) => {
        const captured: { value: MobileNumberRowValue | null } = { value: null };
        const component = await mount(
            <MobileNumberRow
                index={0}
                value={baseValue}
                canRemove={false}
                onChange={(next) => {
                    captured.value = next;
                }}
                onRemove={() => {}}
            />,
        );
        await selectByText(getLocatorByTestId(component, TYPE_SELECT), 'Work');
        expect(captured.value?.type).toBe('Work');
    });

    test('shows the controlled type value', async ({ mount }) => {
        const component = await mount(
            <MobileNumberRow
                index={0}
                value={{ type: 'Home', number: '999' }}
                canRemove={false}
                onChange={() => {}}
                onRemove={() => {}}
            />,
        );
        await expectElementToHaveValue(getLocatorByTestId(component, TYPE_SELECT), 'Home');
        await expectElementToHaveValue(getLocatorByTestId(component, NUMBER_INPUT), '999');
    });

    test('hides remove button when canRemove is false', async ({ mount }) => {
        const component = await mount(
            <MobileNumberRow
                index={0}
                value={baseValue}
                canRemove={false}
                onChange={() => {}}
                onRemove={() => {}}
            />,
        );
        await expect(getLocatorByTestId(component, REMOVE_BTN)).toHaveCount(0);
    });

    test('shows remove button when canRemove is true and fires onRemove', async ({ mount }) => {
        let removed = false;
        const component = await mount(
            <MobileNumberRow
                index={0}
                value={baseValue}
                canRemove={true}
                onChange={() => {}}
                onRemove={() => {
                    removed = true;
                }}
            />,
        );
        await click(getLocatorByTestId(component, REMOVE_BTN));
        expect(removed).toBe(true);
    });

    test('renders inline error message when provided', async ({ mount }) => {
        const component = await mount(
            <MobileNumberRow
                index={0}
                value={baseValue}
                canRemove={false}
                onChange={() => {}}
                onRemove={() => {}}
                error="Invalid number"
            />,
        );
        await expectElementToHaveText(getLocatorByTestId(component, ROW_ERROR), 'Invalid number');
    });
});
