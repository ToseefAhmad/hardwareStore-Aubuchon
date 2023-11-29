import classnames from 'classnames';
import React from 'react';
import { useCookies } from 'react-cookie';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    StarFilled,
    CheckMarkAsInStock as Checkmark
} from '@app/components/Icons';

import classes from './signInBanner.module.css';
import { useSignInBanner } from './useSignInBanner';

const PERKS = [
    {
        key: 'betterExperience',
        icon: StarFilled,
        title: 'Register for a better experience!'
    },
    {
        key: 'recommendations',
        icon: Checkmark,
        title: 'Recommendations'
    },
    {
        key: 'easyReordering',
        icon: Checkmark,
        title: 'Quick and easy reordering'
    },
    {
        key: 'specialOffer',
        icon: Checkmark,
        title: 'Special offers'
    }
];

const SignInBanner = () => {
    const [, { dispatch }] = useEventingContext();
    const { handleToggleModal } = useSignInBanner();
    const [cookies] = useCookies(['aubuchon_cid']);

    if (cookies.aubuchon_cid) {
        return null;
    }

    return (
        <div className={classes.root}>
            <ul className={classes.perksList}>
                {PERKS.map(({ key, icon, title }) => (
                    <li key={key} className={classes.perksListItem}>
                        <div className={classes.perksIcon}>
                            <Icon src={icon} />
                        </div>
                        <span
                            className={classnames({
                                [classes.mainTitle]: key === 'betterExperience'
                            })}
                        >
                            {title}
                        </span>
                    </li>
                ))}
            </ul>
            <Button
                classes={{ primary: classes.signInButton }}
                priority="high"
                onClick={() => {
                    handleToggleModal();
                    dispatch({
                        type: 'USER_SIGN_IN_CLICK',
                        payload: {}
                    });
                }}
            >
                Sign in or Create Account
            </Button>
        </div>
    );
};

export default SignInBanner;
