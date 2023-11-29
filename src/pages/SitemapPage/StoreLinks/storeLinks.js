import { arrayOf, shape, string, number } from 'prop-types';
import React from 'react';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { Section } from '@app/components/Accordion';
import Link from '@app/components/Link';

import defaultClasses from './storeLinks.module.css';

const StoreLinks = props => {
    const { name, items, classes: propClasses } = props;

    const classes = useStyle(defaultClasses, propClasses);

    items.sort((a, b) => a.city.localeCompare(b.city));

    const content = items.map(item => {
        return (
            <div key={item.id} className={classes.linksList}>
                <Link
                    to={resourceUrl(`/stores/${item.url_key}`)}
                    className={classes.link}
                >
                    {item.city}, {item.region_code}
                </Link>
            </div>
        );
    });

    return (
        <Section
            id={name}
            title={name}
            classes={{
                root: classes.body,
                title: classes.title
            }}
        >
            {content}
        </Section>
    );
};

StoreLinks.propTypes = {
    name: string,
    items: arrayOf(
        shape({
            id: number,
            city: string,
            region_code: string,
            url_key: string
        })
    ),
    classes: shape({
        root: string,
        linksList: string,
        link: string,
        title: string
    })
};

export default StoreLinks;
