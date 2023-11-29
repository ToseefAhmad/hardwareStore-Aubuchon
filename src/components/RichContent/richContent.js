import { string } from 'prop-types';
import React from 'react';

import richContentRenderers from '@magento/venia-ui/lib/components/RichContent/richContentRenderers';

import { parseHtml } from './htmlParser';
import classes from './richContent.module.css';

const RichContent = ({ html }) => {
    const rendererProps = {
        html: parseHtml(html),
        classes
    };
    for (const Renderer of richContentRenderers) {
        const { Component, canRender } = Renderer;
        if (canRender(rendererProps.html)) {
            return <Component {...rendererProps} />;
        }
    }
    // If no renderer returned a value
    if (process.env.NODE_ENV === 'development') {
        console.warn(
            `None of the following rich content renderers returned anything for the provided HTML.`,
            richContentRenderers.map(r => `<${r.name}>`),
            html
        );
    }
    return null;
};

/**
 * Props for {@link RichContent}
 *
 * @typedef props
 *
 * @property {String} html Content
 */
RichContent.propTypes = {
    html: string
};

export default RichContent;
