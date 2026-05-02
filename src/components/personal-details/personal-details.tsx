import { ChangeEvent } from 'react';

export interface PersonalDetailsValue {
    firstName: string;
    middleName: string;
    lastName: string;
}

export interface PersonalDetailsErrors {
    firstName?: string;
    lastName?: string;
}

export interface PersonalDetailsProps {
    value: PersonalDetailsValue;
    errors?: PersonalDetailsErrors;
    onChange: (next: PersonalDetailsValue) => void;
}

export function PersonalDetails({ value, errors, onChange }: Readonly<PersonalDetailsProps>) {
    const update = (field: keyof PersonalDetailsValue) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, [field]: e.target.value });
    };

    return (
        <fieldset data-testid="personal-details">
            <legend>Personal Details</legend>

            <label>
                First Name *
                <input
                    type="text"
                    data-testid="first-name"
                    value={value.firstName}
                    onChange={update('firstName')}
                    aria-invalid={!!errors?.firstName}
                />
            </label>
            {errors?.firstName && <span data-testid="first-name-error">{errors.firstName}</span>}

            <label>
                Middle Name
                <input
                    type="text"
                    data-testid="middle-name"
                    value={value.middleName}
                    onChange={update('middleName')}
                />
            </label>

            <label>
                Last Name *
                <input
                    type="text"
                    data-testid="last-name"
                    value={value.lastName}
                    onChange={update('lastName')}
                    aria-invalid={!!errors?.lastName}
                />
            </label>
            {errors?.lastName && <span data-testid="last-name-error">{errors.lastName}</span>}
        </fieldset>
    );
}
