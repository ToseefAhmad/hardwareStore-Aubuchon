import { APP_ROUTER_PATHS } from '@app-constants';
import { bool } from 'prop-types';
import React from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import Link from '@app/components/Link';
import LinkButton from '@app/components/LinkButton';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import { APP_AUTH_MODAL_SIGN_UP_TAB_KEY } from '@app/constants';

import classes from './membership.module.css';

const Membership = props => {
    const { isSignedIn } = props;

    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    return (
        <>
            <div className={classes.root}>
                <h4>Membership</h4>
                <p className={classes.text}>
                    Locals save time & money by using free pickup & curbside and
                    earning points & rewards.
                </p>
                <div className={classes.links}>
                    {!isSignedIn && (
                        <LinkButton
                            classes={{ rootSecondary: classes.signUpLink }}
                            onPress={() =>
                                toggleModal({
                                    identifier: MODAL_NAMES.auth,
                                    props: {
                                        initialTabKey: APP_AUTH_MODAL_SIGN_UP_TAB_KEY
                                    }
                                })
                            }
                        >
                            Sign up today (it’s free!)
                        </LinkButton>
                    )}
                    <Link
                        to={APP_ROUTER_PATHS.accountPage}
                        priority="secondary"
                    >
                        My Account
                    </Link>
                </div>
            </div>
        </>
    );
};

Membership.propTypes = {
    isSignedIn: bool
};

export default Membership;
