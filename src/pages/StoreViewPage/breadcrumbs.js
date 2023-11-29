import React from 'react';
import { FormattedMessage } from 'react-intl';

import Icon from '@app/components/Icon';
import { ChevronRightSmall } from '@app/components/Icons';
import Link from '@app/components/Link';

import classes from './breadcrumbs.module.css';

const Breadcrumbs = () => {
    return (
        <div className={classes.breadcrumbs}>
            <Link to="/">
                <FormattedMessage id="global.home" defaultMessage="Home" />
            </Link>
            <span className={classes.divider}>
                <Icon src={ChevronRightSmall} />
            </span>
            <Link to="/stores">
                <FormattedMessage
                    id="global.shops"
                    defaultMessage="Store Locator"
                />
            </Link>
        </div>
    );
};

export default Breadcrumbs;
