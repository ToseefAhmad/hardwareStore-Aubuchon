import { shape } from 'prop-types';
import React from 'react';

import { useBrandContext } from '@app/context/Brand';
import Row from '@app/pageBuilder/ContentTypes/Row';
import ContentTypeFactory from '@app/pageBuilder/factory';

const AboutUsLinkParser = restProps => {
    const [{ brand }] = useBrandContext();
    const brandCmsPage = brand?.cms_about_us_page;

    const childElements = restProps.childItems.map((childTreeItem, i) => {
        if (brandCmsPage) {
            childTreeItem.content = childTreeItem?.content?.replace(
                '/about-us',
                `/${brandCmsPage}`
            );
        }
        return <ContentTypeFactory key={i} data={childTreeItem} />;
    });

    return <Row {...restProps}>{childElements}</Row>;
};

AboutUsLinkParser.propTypes = {
    restProps: shape({})
};

export default AboutUsLinkParser;
