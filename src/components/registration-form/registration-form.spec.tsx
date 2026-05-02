import { test, expect } from '#ctsetup';
import { click, fill, selectByText } from '#utils/action-utils';
import { getLocatorByTestId } from '#utils/element-utils';
import {
    expectElementToBeVisible,
    expectElementToHaveText,
    expectElementToHaveCount,
} from '#utils/expect-utils';
import { RegistrationForm, RegistrationFormData } from '#components/registration-form/registration-form';

// --- Locator constants ---
const FIRST_NAME = 'first-name';
const MIDDLE_NAME = 'middle-name';
const LAST_NAME = 'last-name';
const EMAIL = 'email';
const ADD_MOBILE_BTN = 'add-mobile';
const SUBMIT_BTN = 'submit';

const FIRST_NAME_ERROR = 'first-name-error';
const LAST_NAME_ERROR = 'last-name-error';
const EMAIL_ERROR = 'email-error';
const MOBILES_ERROR = 'mobiles-error';

test.describe('RegistrationForm — happy paths', () => {
    test('submits with first/last name, email, and one mobile (middle name optional)', async ({
        mount,
    }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, EMAIL), 'raghu@example.com');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '5551234567');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value).not.toBeNull();
        expect(captured.value!.personal.firstName).toBe('Raghu');
        expect(captured.value!.personal.middleName).toBe('');
        expect(captured.value!.personal.lastName).toBe('Katta');
        expect(captured.value!.contact.email).toBe('raghu@example.com');
        expect(captured.value!.contact.mobiles).toEqual([{ type: 'Mobile', number: '5551234567' }]);
    });

    test('submits with middle name when provided', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, MIDDLE_NAME), 'V');
        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, EMAIL), 'raghu@example.com');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '5551234567');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value?.personal.middleName).toBe('V');
    });

    test('submits with multiple mobile numbers of different types', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, EMAIL), 'raghu@example.com');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '111');
        await selectByText(getLocatorByTestId(component, 'mobile-type-0'), 'Home');

        await click(getLocatorByTestId(component, ADD_MOBILE_BTN));
        await fill(getLocatorByTestId(component, 'mobile-number-1'), '222');
        await selectByText(getLocatorByTestId(component, 'mobile-type-1'), 'Work');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value?.contact.mobiles).toEqual([
            { type: 'Home', number: '111' },
            { type: 'Work', number: '222' },
        ]);
    });
});

test.describe('RegistrationForm — validation', () => {
    test('blocks submit when first name is missing', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, EMAIL), 'raghu@example.com');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '5551234567');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value).toBeNull();
        await expectElementToHaveText(
            getLocatorByTestId(component, FIRST_NAME_ERROR),
            'First name is required',
        );
    });

    test('blocks submit when last name is missing', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, EMAIL), 'raghu@example.com');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '5551234567');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value).toBeNull();
        await expectElementToHaveText(
            getLocatorByTestId(component, LAST_NAME_ERROR),
            'Last name is required',
        );
    });

    test('allows missing middle name (it is optional)', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, EMAIL), 'raghu@example.com');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '5551234567');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value).not.toBeNull();
        await expectElementToHaveCount(getLocatorByTestId(component, FIRST_NAME_ERROR), 0);
    });

    test('blocks submit when email is missing', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '5551234567');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value).toBeNull();
        await expectElementToHaveText(
            getLocatorByTestId(component, EMAIL_ERROR),
            'Email is required',
        );
    });

    test('blocks submit when email format is invalid', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, EMAIL), 'not-an-email');
        await fill(getLocatorByTestId(component, 'mobile-number-0'), '5551234567');

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value).toBeNull();
        await expectElementToHaveText(
            getLocatorByTestId(component, EMAIL_ERROR),
            'Email is invalid',
        );
    });

    test('blocks submit when no mobile number is filled', async ({ mount }) => {
        const captured: { value: RegistrationFormData | null } = { value: null };
        const component = await mount(
            <RegistrationForm
                onSubmit={(data) => {
                    captured.value = data;
                }}
            />,
        );

        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await fill(getLocatorByTestId(component, LAST_NAME), 'Katta');
        await fill(getLocatorByTestId(component, EMAIL), 'raghu@example.com');
        // mobile-number-0 left empty intentionally

        await click(getLocatorByTestId(component, SUBMIT_BTN));

        expect(captured.value).toBeNull();
        await expectElementToHaveText(
            getLocatorByTestId(component, MOBILES_ERROR),
            'At least one mobile number is required',
        );
    });

    test('shows all required errors when submitting an empty form', async ({ mount }) => {
        const component = await mount(<RegistrationForm onSubmit={() => {}} />);
        await click(getLocatorByTestId(component, SUBMIT_BTN));
        await expectElementToBeVisible(getLocatorByTestId(component, FIRST_NAME_ERROR));
        await expectElementToBeVisible(getLocatorByTestId(component, LAST_NAME_ERROR));
        await expectElementToBeVisible(getLocatorByTestId(component, EMAIL_ERROR));
        await expectElementToBeVisible(getLocatorByTestId(component, MOBILES_ERROR));
    });
});
