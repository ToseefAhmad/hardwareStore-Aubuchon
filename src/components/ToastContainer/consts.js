export const messages = {
    UPDATE_ACCOUNT_INFO: 'Changes are saved successfully',
    GENERAL_ERROR_MESSAGE:
        'An error has occurred. Please refresh the page and try again.',
    EMAIL_ALREADY_IN_USE: 'Provided email address is already in use.'
};

const addOrUpdateCartItemErrorMessages = new Map([
    ['exceeds', 'Requested quantity exceeds available in stock'],
    [
        'current user cannot',
        'There was a problem with your cart. Please sign in again and try adding the item once more.'
    ],
    [
        'Variable "$cartId"',
        'There was a problem with your cart. Please refresh the page and try adding the item once more.'
    ],
    [
        'Could not find a cart',
        'There was a problem with your cart. Please refresh the page and try adding the item once more.'
    ]
]);

const authErrorMessages = new Map([
    ['', 'An error has occurred. Please check the input and try again.'],
    [
        'ReCaptcha validation failed',
        'ReCaptcha validation failed, please try again'
    ],
    [
        'password needs at least 8 characters',
        'The password needs at least 8 characters. Please create a new password and try again.'
    ],
    [
        'Minimum of different classes of characters',
        'Minimum of different classes of characters in password is 2. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.'
    ],
    ['account sign-in was incorrect', 'Email or password is incorrect.']
]);

export const errorEventTypesToMap = {
    ADD_OR_UPDATE_CART_ITEM: addOrUpdateCartItemErrorMessages,
    AUTH: authErrorMessages
};
