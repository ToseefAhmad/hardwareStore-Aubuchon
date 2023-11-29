/**
 * Determine if the content is FAQ block or not
 *
 * @param {string} content
 * @returns {boolean}
 */
export const detectMembershipMemberBenefitsBlock = content => {
    return /class="memberBenefits/gi.test(content);
};
