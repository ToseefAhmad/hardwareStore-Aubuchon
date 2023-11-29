import { CUSTOM_ROW_CONFIG } from './config';

/**
 * Function for getting the config of a custom rows
 *
 * @param {string} richContent
 * @return {Object|null}
 */
export const getCustomRowConfig = ({ rowConfig }) => {
    let customRowConfig = null;

    if (rowConfig) {
        for (let i = 0; i < CUSTOM_ROW_CONFIG.length; i++) {
            const { detectFn } = CUSTOM_ROW_CONFIG[i];

            if (detectFn(rowConfig)) {
                customRowConfig = CUSTOM_ROW_CONFIG[i];

                break;
            }
        }
    }

    return customRowConfig;
};
