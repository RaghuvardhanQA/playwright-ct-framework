import { ChangeEvent } from 'react';
import { MobileNumberRow, MobileNumberRowValue } from '#components/mobile-number-row/mobile-number-row';

export interface ContactDetailsValue {
    email: string;
    mobiles: MobileNumberRowValue[];
}

export interface ContactDetailsErrors {
    email?: string;
    mobiles?: string;
    perMobile?: Array<string | undefined>;
}

export interface ContactDetailsProps {
    value: ContactDetailsValue;
    errors?: ContactDetailsErrors;
    onChange: (next: ContactDetailsValue) => void;
}

export function ContactDetails({ value, errors, onChange }: Readonly<ContactDetailsProps>) {
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, email: e.target.value });
    };

    const handleMobileChange = (index: number, next: MobileNumberRowValue) => {
        const mobiles = value.mobiles.map((m, i) => (i === index ? next : m));
        onChange({ ...value, mobiles });
    };

    const handleAddMobile = () => {
        onChange({
            ...value,
            mobiles: [...value.mobiles, { type: 'Mobile', number: '' }],
        });
    };

    const handleRemoveMobile = (index: number) => {
        const mobiles = value.mobiles.filter((_, i) => i !== index);
        onChange({ ...value, mobiles });
    };

    return (
        <fieldset data-testid="contact-details">
            <legend>Contact Details</legend>

            <label>
                Email *
                <input
                    type="email"
                    data-testid="email"
                    value={value.email}
                    onChange={handleEmail}
                    aria-invalid={!!errors?.email}
                />
            </label>
            {errors?.email && <span data-testid="email-error">{errors.email}</span>}

            <div data-testid="mobile-list">
                <h4>Mobile Numbers *</h4>
                {value.mobiles.map((m, i) => (
                    <MobileNumberRow
                        key={i}
                        index={i}
                        value={m}
                        canRemove={value.mobiles.length > 1}
                        onChange={(next) => handleMobileChange(i, next)}
                        onRemove={() => handleRemoveMobile(i)}
                        error={errors?.perMobile?.[i]}
                    />
                ))}
                <button type="button" data-testid="add-mobile" onClick={handleAddMobile}>
                    Add another mobile
                </button>
                {errors?.mobiles && <span data-testid="mobiles-error">{errors.mobiles}</span>}
            </div>
        </fieldset>
    );
}
