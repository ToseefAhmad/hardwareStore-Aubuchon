/**
 * Determine if the content is Create Account block or not
 *
 * @param {{ cssClasses: string[] }} rowConfig
 * @returns {boolean}
 */
export const detectCreateAccountBlockContainer = rowConfig => {
    const classes = rowConfig?.cssClasses || [];

    return classes.includes('createAccountBlockContainer');
};
