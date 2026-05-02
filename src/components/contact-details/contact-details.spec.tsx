import { test, expect } from '#ctsetup';
import { click, fill } from '#utils/action-utils';
import { getLocatorByTestId } from '#utils/element-utils';
import {
    expectElementToBeVisible,
    expectElementToHaveText,
    expectElementToHaveCount,
} from '#utils/expect-utils';
import { ContactDetails, ContactDetailsValue } from '#components/contact-details/contact-details';

// --- Locator constants ---
const EMAIL = 'email';
const EMAIL_ERROR = 'email-error';
const ADD_MOBILE_BTN = 'add-mobile';
const MOBILES_ERROR = 'mobiles-error';
const MOBILE_LIST = 'mobile-list';

const seed = (mobiles = 1): ContactDetailsValue => ({
    email: '',
    mobiles: Array.from({ length: mobiles }, () => ({ type: 'Mobile' as const, number: '' })),
});

test.describe('ContactDetails component', () => {
    test('renders email input and one mobile row by default', async ({ mount }) => {
        const component = await mount(<ContactDetails value={seed(1)} onChange={() => {}} />);
        await expectElementToBeVisible(getLocatorByTestId(component, EMAIL));
        await expectElementToBeVisible(getLocatorByTestId(component, MOBILE_LIST));
        await expectElementToHaveCount(getLocatorByTestId(component, 'mobile-row-0'), 1);
    });

    test('typing email calls onChange', async ({ mount }) => {
        const captured: { value: ContactDetailsValue | null } = { value: null };
        const component = await mount(
            <ContactDetails
                value={seed(1)}
                onChange={(next) => {
                    captured.value = next;
                }}
            />,
        );
        await fill(getLocatorByTestId(component, EMAIL), 'a@b.com');
        expect(captured.value?.email).toBe('a@b.com');
    });

    test('clicking Add another mobile appends a new row via onChange', async ({ mount }) => {
        const captured: { value: ContactDetailsValue | null } = { value: null };
        const component = await mount(
            <ContactDetails
                value={seed(1)}
                onChange={(next) => {
                    captured.value = next;
                }}
            />,
        );
        await click(getLocatorByTestId(component, ADD_MOBILE_BTN));
        expect(captured.value?.mobiles.length).toBe(2);
        expect(captured.value?.mobiles[1]).toEqual({ type: 'Mobile', number: '' });
    });

    test('renders multiple mobile rows when value contains many', async ({ mount }) => {
        const component = await mount(<ContactDetails value={seed(3)} onChange={() => {}} />);
        await expectElementToBeVisible(getLocatorByTestId(component, 'mobile-row-0'));
        await expectElementToBeVisible(getLocatorByTestId(component, 'mobile-row-1'));
        await expectElementToBeVisible(getLocatorByTestId(component, 'mobile-row-2'));
    });

    test('remove button on a row is hidden when only one row exists', async ({ mount }) => {
        const component = await mount(<ContactDetails value={seed(1)} onChange={() => {}} />);
        await expect(getLocatorByTestId(component, 'mobile-remove-0')).toHaveCount(0);
    });

    test('remove buttons appear when multiple rows exist and removal calls onChange', async ({
        mount,
    }) => {
        const captured: { value: ContactDetailsValue | null } = { value: null };
        const component = await mount(
            <ContactDetails
                value={seed(2)}
                onChange={(next) => {
                    captured.value = next;
                }}
            />,
        );
        await expectElementToBeVisible(getLocatorByTestId(component, 'mobile-remove-0'));
        await click(getLocatorByTestId(component, 'mobile-remove-0'));
        expect(captured.value?.mobiles.length).toBe(1);
    });

    test('renders email error when provided', async ({ mount }) => {
        const component = await mount(
            <ContactDetails
                value={seed(1)}
                errors={{ email: 'Email is invalid' }}
                onChange={() => {}}
            />,
        );
        await expectElementToHaveText(
            getLocatorByTestId(component, EMAIL_ERROR),
            'Email is invalid',
        );
    });

    test('renders mobiles error when provided', async ({ mount }) => {
        const component = await mount(
            <ContactDetails
                value={seed(1)}
                errors={{ mobiles: 'At least one mobile number is required' }}
                onChange={() => {}}
            />,
        );
        await expectElementToHaveText(
            getLocatorByTestId(component, MOBILES_ERROR),
            'At least one mobile number is required',
        );
    });
});
