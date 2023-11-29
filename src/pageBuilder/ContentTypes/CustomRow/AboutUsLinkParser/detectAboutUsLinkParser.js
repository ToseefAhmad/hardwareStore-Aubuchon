/**
 * Determine if the content contains about us redirect or not
 *
 * @returns {boolean}
 * @param rowConfig
 */
export const detectAboutUsLinkParser = rowConfig => {
    let found = false;
    rowConfig?.children?.forEach(c => {
        if (/href="\/about-us"/gi.test(c?.content)) {
            found = true;
        }
    });
    return found;
};
