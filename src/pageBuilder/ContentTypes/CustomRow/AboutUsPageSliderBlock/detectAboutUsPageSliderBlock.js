/**
 * Determine if the content is AboutPageSlider block or not
 *
 * @param {{ cssClasses: string[] }} rowConfig
 * @returns {boolean}
 */
export const detectAboutUsPageSliderBlock = rowConfig => {
    const classes = rowConfig?.cssClasses || [];

    return classes.includes('about-us-page-slider');
};
