import { getAdvanced } from '@app/pageBuilder/utils';

export default node => {
    const forms = node.querySelectorAll(
        '.product-item-details > .product-item-name > a.product-item-link'
    );

    return {
        pathNames: [...forms].map(form => form.getAttribute('href')),
        ...getAdvanced(node)
    };
};
