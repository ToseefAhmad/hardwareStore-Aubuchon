import { string } from 'prop-types';
import React from 'react';

import RichContent from '@app/components/RichContent';

import classes from './cmsBlock.module.css';

const CmsBlock = ({ content }) => {
    if (!content) {
        return null;
    }

    return (
        <div className={classes.root}>
            <RichContent html={content} />
        </div>
    );
};

CmsBlock.propTypes = {
    content: string
};

export default CmsBlock;
