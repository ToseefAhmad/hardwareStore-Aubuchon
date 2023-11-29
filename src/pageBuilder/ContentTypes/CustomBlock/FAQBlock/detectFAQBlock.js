/**
 * Determine if the content is FAQ block or not
 *
 * @param {string} content
 * @returns {boolean}
 */
export const detectFAQBlock = content => {
    return /class="faqBlock/gi.test(content);
};
