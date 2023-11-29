import { useMemo } from 'react';

import { useTabsContext } from '@app/components/Tabs/tabsContext';

export const useSignInTabContent = () => {
    const [
        {
            tabsState: { initialSignInFormValues, warningText }
        }
    ] = useTabsContext();

    const initialValues = useMemo(() => {
        let value = {};

        if (initialSignInFormValues) {
            value = initialSignInFormValues;
        }

        return value;
    }, [initialSignInFormValues]);

    return {
        initialValues,
        warningText
    };
};
