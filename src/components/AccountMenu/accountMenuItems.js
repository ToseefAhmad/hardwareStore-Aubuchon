import { func } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import SignOutButton from '@app/pages/AccountPagesSwitcher/AccountPage/SignOutButton';

import classes from './accountMenuItems.module.css';
import { useAccountMenuItems } from './useAccountMenuItems';

const AccountMenuItems = ({ handleToggleDropdown }) => {
    const { menuItems } = useAccountMenuItems();

    return (
        <div className={classes.root}>
            {menuItems.map(item => (
                <NavLink
                    className={classes.link}
                    activeClassName={classes.linkActive}
                    key={item.name}
                    to={item.url}
                    onClick={handleToggleDropdown}
                >
                    <FormattedMessage id={item.id} defaultMessage={item.name} />
                </NavLink>
            ))}
            <SignOutButton />
        </div>
    );
};

AccountMenuItems.propTypes = {
    handleToggleDropdown: func
};

AccountMenuItems.defaultProps = {
    handleToggleDropdown: () => {}
};

export default AccountMenuItems;
