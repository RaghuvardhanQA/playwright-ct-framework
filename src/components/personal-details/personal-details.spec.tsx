import { test, expect } from '#ctsetup';
import { fill } from '#utils/action-utils';
import { getLocatorByTestId } from '#utils/element-utils';
import {
    expectElementToBeVisible,
    expectElementToHaveValue,
    expectElementToHaveText,
} from '#utils/expect-utils';
import { PersonalDetails, PersonalDetailsValue } from '#components/personal-details/personal-details';

// --- Locator constants ---
const FIRST_NAME = 'first-name';
const MIDDLE_NAME = 'middle-name';
const LAST_NAME = 'last-name';
const FIRST_NAME_ERROR = 'first-name-error';
const LAST_NAME_ERROR = 'last-name-error';

const empty: PersonalDetailsValue = { firstName: '', middleName: '', lastName: '' };

test.describe('PersonalDetails component', () => {
    test('renders all three name fields', async ({ mount }) => {
        const component = await mount(<PersonalDetails value={empty} onChange={() => {}} />);
        await expectElementToBeVisible(getLocatorByTestId(component, FIRST_NAME));
        await expectElementToBeVisible(getLocatorByTestId(component, MIDDLE_NAME));
        await expectElementToBeVisible(getLocatorByTestId(component, LAST_NAME));
    });

    test('typing in a field calls onChange with the updated value', async ({ mount }) => {
        let received: PersonalDetailsValue | null = null;
        const component = await mount(
            <PersonalDetails
                value={empty}
                onChange={(next) => {
                    received = next;
                }}
            />,
        );
        await fill(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        expect(received).toEqual({ firstName: 'Raghu', middleName: '', lastName: '' });
    });

    test('shows the controlled value in the inputs', async ({ mount }) => {
        const component = await mount(
            <PersonalDetails
                value={{ firstName: 'Raghu', middleName: 'V', lastName: 'Katta' }}
                onChange={() => {}}
            />,
        );
        await expectElementToHaveValue(getLocatorByTestId(component, FIRST_NAME), 'Raghu');
        await expectElementToHaveValue(getLocatorByTestId(component, MIDDLE_NAME), 'V');
        await expectElementToHaveValue(getLocatorByTestId(component, LAST_NAME), 'Katta');
    });

    test('renders first name error when provided', async ({ mount }) => {
        const component = await mount(
            <PersonalDetails
                value={empty}
                errors={{ firstName: 'First name is required' }}
                onChange={() => {}}
            />,
        );
        await expectElementToHaveText(
            getLocatorByTestId(component, FIRST_NAME_ERROR),
            'First name is required',
        );
    });

    test('renders last name error when provided', async ({ mount }) => {
        const component = await mount(
            <PersonalDetails
                value={empty}
                errors={{ lastName: 'Last name is required' }}
                onChange={() => {}}
            />,
        );
        await expectElementToHaveText(
            getLocatorByTestId(component, LAST_NAME_ERROR),
            'Last name is required',
        );
    });

    test('does not render error nodes when errors are absent', async ({ mount }) => {
        const component = await mount(<PersonalDetails value={empty} onChange={() => {}} />);
        await expect(getLocatorByTestId(component, FIRST_NAME_ERROR)).toHaveCount(0);
        await expect(getLocatorByTestId(component, LAST_NAME_ERROR)).toHaveCount(0);
    });
});
