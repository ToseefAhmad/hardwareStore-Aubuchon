export { default } from '@magento/pagebuilder/lib/pagebuilder';
export { default as Component } from '@magento/pagebuilder/lib/pagebuilder';
export {
    default as canRender
} from '@magento/pagebuilder/lib/detectPageBuilder';

import { setContentTypeConfig, contentTypesConfig } from './config';

/**
 * Register new Page Builder components
 */
export const registerPageBuilder = () => {
    Object.keys(contentTypesConfig).forEach(contentKey => {
        setContentTypeConfig(contentKey, contentTypesConfig[contentKey]);
    });
};
