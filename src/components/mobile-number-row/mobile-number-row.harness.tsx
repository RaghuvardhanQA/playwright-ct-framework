// Stateful harness wrapper for MobileNumberRow.
// Required for tests that exercise typing into the controlled input —
// without local state, the input never re-renders and Playwright's fill races onChange.

import { useState } from 'react';
import { MobileNumberRow, MobileNumberRowValue } from '#components/mobile-number-row/mobile-number-row';

export function MobileNumberRowHarness() {
    const [value, setValue] = useState<MobileNumberRowValue>({ type: 'Mobile', number: '' });
    return (
        <MobileNumberRow
            index={0}
            value={value}
            canRemove={false}
            onChange={setValue}
            onRemove={() => {}}
        />
    );
}
