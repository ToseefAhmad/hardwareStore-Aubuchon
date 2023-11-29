import { bool, shape, string } from 'prop-types';
import React, { Suspense } from 'react';

import {
    getContentTypeConfig,
    setContentTypeConfig
} from '@magento/pagebuilder/lib/config';
import customContentTypes from '@magento/pagebuilder/lib/ContentTypes/customContentTypes';

import { getCustomBlockConfig } from './ContentTypes/CustomBlock/customBlock.utils';
import { getCustomRowConfig } from './ContentTypes/CustomRow/customRow.utils';

/**
 *  add custom content types
 */
const addCustomContentTypes = contentTypes => {
    for (const ContentType of contentTypes) {
        const { component, configAggregator } = ContentType;

        if (!ContentType.name) {
            ContentType.name = component.name;
        }

        if (ContentType.name && component && configAggregator) {
            setContentTypeConfig(ContentType.name, {
                component,
                configAggregator
            });
        }
    }
};

addCustomContentTypes(customContentTypes);

/**
 * Render a content type
 */
const renderContentType = (Component, data) => (
    <Component {...data}>
        {data.children.map((childTreeItem, i) => (
            <ContentTypeFactory key={i} data={childTreeItem} />
        ))}
    </Component>
);

/**
 * Create an instance of a content type component based on configuration
 */
const ContentTypeFactory = props => {
    const {
        data: { isHidden, contentType, ...restProps }
    } = props;
    const contentTypeConfig = getContentTypeConfig(contentType);

    if (isHidden || !contentTypeConfig?.component) {
        return null;
    }

    let component = contentTypeConfig.component;
    let componentShimmer = contentTypeConfig.componentShimmer;

    // Entry point for processing custom CMS blocks
    if (contentType === 'block') {
        const { richContent } = restProps;
        const customBlockConfig = getCustomBlockConfig({ richContent });

        if (customBlockConfig) {
            component = customBlockConfig.component;
            componentShimmer = customBlockConfig.componentShimmer;
        }
    }

    // Entry point for processing custom rows
    if (contentType === 'row') {
        const customRowConfig = getCustomRowConfig({ rowConfig: restProps });

        if (customRowConfig) {
            component = customRowConfig.component;
            componentShimmer = customRowConfig.componentShimmer;
            restProps.childItems = [...restProps.children];
            restProps.children = [];
        }
    }

    const Component = renderContentType(component, restProps);
    const ComponentShimmer = componentShimmer
        ? renderContentType(componentShimmer, restProps)
        : null;

    return <Suspense fallback={ComponentShimmer}>{Component}</Suspense>;
};

ContentTypeFactory.propTypes = {
    data: shape({
        isHidden: bool,
        contentType: string.isRequired,
        richContent: string
    }).isRequired
};

export default ContentTypeFactory;
