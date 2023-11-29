import { shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import CmsBlock from '@app/components/CmsBlock';

import defaultClasses from './linksList.module.css';

const LinksList = props => {
    const { identifiers } = props;
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <CmsBlock
            classes={{
                root: classes.root,
                content: classes.content
            }}
            identifiers={identifiers}
        />
    );
};

LinksList.propTypes = {
    classes: shape({
        root: string
    }),
    identifiers: string.isRequired
};

export default LinksList;
