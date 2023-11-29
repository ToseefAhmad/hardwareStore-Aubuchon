import { node, object } from 'prop-types';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
export {
    default as HeadProvider
} from '@magento/venia-ui/lib/components/Head/headProvider';
Helmet.defaultProps.defer = false;

import { useStoreConfig } from '@app/hooks/useStoreConfig';

export const Link = props => {
    const { children, ...tagProps } = props;
    return (
        <Helmet>
            <link {...tagProps}>{children}</link>
        </Helmet>
    );
};

Link.propTypes = {
    children: node
};

export const Meta = props => {
    const { children, ...tagProps } = props;
    return (
        <Helmet>
            <meta {...tagProps}>{children}</meta>
        </Helmet>
    );
};

Meta.propTypes = {
    children: node
};

export const Style = props => {
    const { children, ...tagProps } = props;
    return (
        <Helmet>
            <style {...tagProps}>{children}</style>
        </Helmet>
    );
};

Style.propTypes = {
    children: node
};

export const Title = props => {
    const { children, ...tagProps } = props;
    return (
        <Helmet>
            <title {...tagProps}>{children}</title>
        </Helmet>
    );
};

Title.propTypes = {
    children: node
};

export const GetFormattedStoreTitle = title => {
    const { storeConfig: storeNameData } = useStoreConfig({
        fields: ['store_name']
    });

    const storeName = useMemo(() => {
        return storeNameData?.store_name || '';
    }, [storeNameData]);

    let titleText;
    if (title) {
        titleText = `${title} | ${storeName}`;
    } else {
        titleText = storeName;
    }

    return titleText;
};

export const StoreTitle = props => {
    const { children, ...tagProps } = props;

    const titleText = GetFormattedStoreTitle(children);

    return (
        <Helmet>
            <title {...tagProps}>{titleText}</title>
        </Helmet>
    );
};

StoreTitle.propTypes = {
    children: node
};

export const MetaStoreTitle = props => {
    const { children, ...tagProps } = props;
    const titleText = GetFormattedStoreTitle(children);

    return (
        <Helmet>
            <meta {...tagProps} content={titleText} />
        </Helmet>
    );
};

MetaStoreTitle.propTypes = {
    children: node
};

export const RichSnippet = props => {
    const { data, ...tagProps } = props;
    const richSnippetJSON = JSON.stringify(data);

    if (!data) {
        return null;
    }

    return (
        <Helmet>
            <script type="application/ld+json" {...tagProps}>
                {richSnippetJSON}
            </script>
        </Helmet>
    );
};

RichSnippet.propTypes = {
    data: object
};
