export const FORM_TYPES = {
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP'
};

export const RE_CAPTCHA_PARAMS = {
    [FORM_TYPES.SIGN_IN]: {
        currentForm: 'CUSTOMER_LOGIN',
        formAction: 'signIn'
    },
    [FORM_TYPES.SIGN_UP]: {
        currentForm: 'CUSTOMER_CREATE',
        formAction: 'createAccount'
    }
};
