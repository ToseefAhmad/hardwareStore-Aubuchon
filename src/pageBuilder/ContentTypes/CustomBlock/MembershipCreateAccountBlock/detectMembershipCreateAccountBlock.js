/**
 * Determine if the content is FAQ block or not
 *
 * @param {string} content
 * @returns {boolean}
 */
export const detectMembershipCreateAccountBlock = content => {
    return /class="createAccountButton/gi.test(content);
};
