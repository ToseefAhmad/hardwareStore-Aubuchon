import { useMemo } from 'react';

import { useCreateAccountContext } from '../../context';

import { useAuthForm } from '@app/hooks/useAuthForm';
import { FORM_TYPES } from '@app/hooks/useAuthForm/consts';

export const useRegForm = () => {
    const [{ regFormInitialValues }] = useCreateAccountContext();

    const hookProps = useAuthForm({
        formType: FORM_TYPES.SIGN_UP,
        loyaltyId: regFormInitialValues?.loyalty_id
    });

    const initialValues = useMemo(
        () => ({
            ...regFormInitialValues,
            country_code: 'US'
        }),
        [regFormInitialValues]
    );

    const isEmailFilled = !!regFormInitialValues?.email;
    const isPhoneFilled = !!regFormInitialValues?.telephone;

    return {
        ...hookProps,
        initialValues,
        isEmailFilled,
        isPhoneFilled
    };
};
