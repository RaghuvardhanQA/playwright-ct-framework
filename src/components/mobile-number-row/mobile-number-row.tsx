import { ChangeEvent } from 'react';

export type MobileType = 'Home' | 'Work' | 'Mobile' | 'Other';

export const MOBILE_TYPES: ReadonlyArray<MobileType> = ['Home', 'Work', 'Mobile', 'Other'];

export interface MobileNumberRowValue {
    type: MobileType;
    number: string;
}

export interface MobileNumberRowProps {
    index: number;
    value: MobileNumberRowValue;
    canRemove: boolean;
    onChange: (next: MobileNumberRowValue) => void;
    onRemove: () => void;
    error?: string;
}

export function MobileNumberRow({
    index,
    value,
    canRemove,
    onChange,
    onRemove,
    error,
}: Readonly<MobileNumberRowProps>) {
    const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange({ ...value, type: e.target.value as MobileType });
    };

    const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
        onChange({ ...value, number: e.target.value });
    };

    return (
        <div data-testid={`mobile-row-${index}`}>
            <label>
                Type
                <select
                    data-testid={`mobile-type-${index}`}
                    value={value.type}
                    onChange={handleType}
                >
                    {MOBILE_TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Number
                <input
                    type="tel"
                    data-testid={`mobile-number-${index}`}
                    value={value.number}
                    onChange={handleNumber}
                    aria-invalid={!!error}
                />
            </label>

            {canRemove && (
                <button
                    type="button"
                    data-testid={`mobile-remove-${index}`}
                    onClick={onRemove}
                >
                    Remove
                </button>
            )}

            {error && <span data-testid={`mobile-error-${index}`}>{error}</span>}
        </div>
    );
}
