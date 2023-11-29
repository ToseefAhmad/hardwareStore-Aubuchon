import { func } from 'prop-types';
import React, { lazy, Suspense } from 'react';

import classes from './accountMenu.module.css';
import AccountMenuShimmer from './accountMenu.shimmer';

const AccountMenuItems = lazy(() =>
    import('@app/components/AccountMenu/accountMenuItems')
);

const AccountMenu = React.forwardRef(({ handleToggleDropdown }, ref) => {
    return (
        <aside ref={ref} className={classes.root}>
            <Suspense fallback={<AccountMenuShimmer />}>
                <AccountMenuItems handleToggleDropdown={handleToggleDropdown} />
            </Suspense>
        </aside>
    );
});

AccountMenu.propTypes = {
    handleToggleDropdown: func.isRequired
};

AccountMenu.displayName = 'AccountMenu';

export default AccountMenu;
