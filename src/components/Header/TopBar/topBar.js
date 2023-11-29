import { shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import CmsBlockGroup from '@app/components/CmsBlock';

import AccountTrigger from '../AccountTrigger/accountTrigger';
import classes from './topBar.module.css';
import { useTopBar } from './useTopBar';

const TOP_BAR_CMS_BLOCK_ID = 'header-global-message';

const TopBar = () => {
    const { isShownAccountTrigger } = useTopBar();

    return (
        <Fragment>
            <div className={classes.root}>
                <div className={classes.topBarWrapper}>
                    <div className={classes.cmsBlock}>
                        <CmsBlockGroup
                            identifiers={TOP_BAR_CMS_BLOCK_ID}
                            classes={{ root: classes.cmsBlockRoot }}
                        />
                    </div>
                    {isShownAccountTrigger && (
                        <div className={classes.userNavigationContainer}>
                            <AccountTrigger />
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

TopBar.propTypes = {
    classes: shape({
        root: string,
        topBarWrapper: string,
        cmsBlock: string,
        cmsBlockRoot: string,
        userNavigationContainer: string
    })
};

export default TopBar;
