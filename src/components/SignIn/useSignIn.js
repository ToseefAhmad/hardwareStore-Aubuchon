import { useAuthForm, FORM_TYPES } from '@app/hooks/useAuthForm';

export const useSignIn = () => {
    return useAuthForm({ formType: FORM_TYPES.SIGN_IN });
};
