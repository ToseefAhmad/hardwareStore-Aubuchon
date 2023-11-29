import { arrayOf, shape, string } from 'prop-types';
import React from 'react';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { Section } from '@app/components/Accordion';
import Link from '@app/components/Link';

import classes from './sitemapLinks.module.css';
import { useSitemapLinks } from './useSitemapLinks';

const SiteMapLinks = ({ uid, name, items }) => {
    const { categoryUrlSuffix } = useSitemapLinks();

    const content = items.map(child => {
        return (
            <div key={child.uid}>
                <h3 className={classes.subSitemapLinkTitle}>
                    <Link
                        to={resourceUrl(
                            `${child.url_path}${categoryUrlSuffix}`
                        )}
                    >
                        {child.name}
                    </Link>
                </h3>
                {child.children.map(child => {
                    return (
                        <Link
                            key={child.uid}
                            to={resourceUrl(
                                `${child.url_path}${categoryUrlSuffix}`
                            )}
                            className={classes.subSubSitemapLink}
                        >
                            {child.name}
                        </Link>
                    );
                })}
            </div>
        );
    });

    return (
        <Section
            id={uid}
            title={name}
            classes={{
                root: classes.sitemapLinkBody,
                title: classes.sitemapLinkTitle
            }}
        >
            {content}
        </Section>
    );
};

SiteMapLinks.propTypes = {
    uid: string,
    name: string,
    items: arrayOf(
        shape({
            uid: string,
            name: string,
            url_path: string
        })
    )
};

export default SiteMapLinks;
