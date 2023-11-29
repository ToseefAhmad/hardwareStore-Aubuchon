import { CUSTOM_BLOCKS_CONFIG } from './config';

/**
 * Function for getting the config of a CMS custom block
 *
 * @param {string} richContent
 * @return {Object|null}
 */
export const getCustomBlockConfig = ({ richContent }) => {
    let customBlockConfig = null;

    if (richContent) {
        for (let i = 0; i < CUSTOM_BLOCKS_CONFIG.length; i++) {
            const { detectFn } = CUSTOM_BLOCKS_CONFIG[i];

            if (detectFn(richContent)) {
                customBlockConfig = CUSTOM_BLOCKS_CONFIG[i];

                break;
            }
        }
    }

    return customBlockConfig;
};
