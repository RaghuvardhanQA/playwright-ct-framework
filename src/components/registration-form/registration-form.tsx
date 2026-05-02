import { FormEvent, useState } from 'react';
import {
    PersonalDetails,
    PersonalDetailsErrors,
    PersonalDetailsValue,
} from '#components/personal-details/personal-details';
import {
    ContactDetails,
    ContactDetailsErrors,
    ContactDetailsValue,
} from '#components/contact-details/contact-details';

export interface RegistrationFormData {
    personal: PersonalDetailsValue;
    contact: ContactDetailsValue;
}

export interface RegistrationFormProps {
    onSubmit: (data: RegistrationFormData) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialData: RegistrationFormData = {
    personal: { firstName: '', middleName: '', lastName: '' },
    contact: { email: '', mobiles: [{ type: 'Mobile', number: '' }] },
};

export function RegistrationForm({ onSubmit }: Readonly<RegistrationFormProps>) {
    const [data, setData] = useState<RegistrationFormData>(initialData);
    const [personalErrors, setPersonalErrors] = useState<PersonalDetailsErrors>({});
    const [contactErrors, setContactErrors] = useState<ContactDetailsErrors>({});

    const validate = (): boolean => {
        const pErr: PersonalDetailsErrors = {};
        const cErr: ContactDetailsErrors = {};

        if (!data.personal.firstName.trim()) pErr.firstName = 'First name is required';
        if (!data.personal.lastName.trim()) pErr.lastName = 'Last name is required';

        if (!data.contact.email.trim()) cErr.email = 'Email is required';
        else if (!EMAIL_RE.test(data.contact.email.trim())) cErr.email = 'Email is invalid';

        const filledMobiles = data.contact.mobiles.filter((m) => m.number.trim().length > 0);
        if (filledMobiles.length === 0) {
            cErr.mobiles = 'At least one mobile number is required';
        }

        setPersonalErrors(pErr);
        setContactErrors(cErr);

        return Object.keys(pErr).length === 0 && Object.keys(cErr).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(data);
        }
    };

    return (
        <form data-testid="registration-form" onSubmit={handleSubmit} noValidate>
            <PersonalDetails
                value={data.personal}
                errors={personalErrors}
                onChange={(personal) => setData({ ...data, personal })}
            />

            <ContactDetails
                value={data.contact}
                errors={contactErrors}
                onChange={(contact) => setData({ ...data, contact })}
            />

            <button type="submit" data-testid="submit">
                Submit
            </button>
        </form>
    );
}
