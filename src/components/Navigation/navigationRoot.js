import {
    APP_ROUTER_PATHS,
    APP_AUTH_MODAL_SIGN_IN_TAB_KEY
} from '@app-constants';
import { bool, func, shape, string } from 'prop-types';
import React from 'react';
import { Loader } from 'react-feather';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import { ChevronRightSmall, Profile } from '@app/components/Icons';
import Link from '@app/components/Link';
import { MODAL_NAMES } from '@app/components/SimpleModal';
import { useId } from '@app/hooks/useId';

import CallPickupStore from './CallPickupStore';
import defaultClasses from './navigationRoot.module.css';

const NavigationRoot = ({
    classes: propsClasses,
    handleView,
    currentUser,
    isUserSignedIn,
    isUserGettingDetails,
    isRoot
}) => {
    const classes = useStyle(defaultClasses, propsClasses);
    const { id } = useId();
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const menuFirstLevel = !isRoot ? classes.rootLeft : classes.root;

    return (
        <>
            <div className={menuFirstLevel}>
                <ul>
                    <li
                        className={classes.menuItem}
                        onClickCapture={() => handleView('MENU')}
                    >
                        Departments
                        <span className={classes.menuItemIcon}>
                            <Icon src={ChevronRightSmall} />
                        </span>
                    </li>
                    <li
                        className={classes.menuItem}
                        onClickCapture={() => handleView('BRANDS')}
                    >
                        Brands
                        <span className={classes.menuItemIcon}>
                            <Icon src={ChevronRightSmall} />
                        </span>
                    </li>
                    <li className={classes.menuItemLinkContainer}>
                        <Link to="/stores" className={classes.menuItemLink}>
                            Store Locator
                            <span className={classes.menuItemIcon}>
                                <Icon src={ChevronRightSmall} />
                            </span>
                        </Link>
                    </li>
                    {/* <li className={classes.menuItem}>Reorder</li> */}
                    <li className={classes.menuItemLinkContainer}>
                        {isUserSignedIn ? (
                            <Link
                                to={APP_ROUTER_PATHS.orderHistory}
                                className={classes.menuItemLink}
                            >
                                Order Status
                                <span className={classes.menuItemIcon}>
                                    <Icon src={ChevronRightSmall} />
                                </span>
                            </Link>
                        ) : (
                            <button
                                aria-labelledby={id`orderStatusTrigger`}
                                onClick={() => {
                                    toggleModal({
                                        identifier: MODAL_NAMES.auth
                                    });
                                }}
                            >
                                <span
                                    className={classes.menuItemButton}
                                    id={id`orderStatusTrigger`}
                                >
                                    Order Status
                                    <span className={classes.menuItemIcon}>
                                        <Icon src={ChevronRightSmall} />
                                    </span>
                                </span>
                            </button>
                        )}
                    </li>
                    <li
                        className={classes.menuItem}
                        onClickCapture={() => handleView('USEFUL')}
                    >
                        Resources
                        <span className={classes.menuItemIcon}>
                            <Icon src={ChevronRightSmall} />
                        </span>
                    </li>
                    <li className={classes.menuItemMembership}>
                        {isUserSignedIn ? (
                            <Link
                                to={APP_ROUTER_PATHS.accountPage}
                                className={classes.menuItemMembershipLink}
                            >
                                <span className={classes.menuItemIconProfile}>
                                    {isUserGettingDetails ? (
                                        <Icon
                                            classes={{
                                                icon: classes.loaderIcon
                                            }}
                                            src={Loader}
                                        />
                                    ) : (
                                        <Icon src={Profile} />
                                    )}
                                </span>
                                <span>
                                    {currentUser.firstname}{' '}
                                    {currentUser.lastname}
                                </span>
                                <span className={classes.menuItemIcon}>
                                    <Icon src={ChevronRightSmall} />
                                </span>
                            </Link>
                        ) : (
                            <button
                                aria-labelledby={id`membershipTrigger`}
                                onClick={() =>
                                    toggleModal({
                                        identifier: MODAL_NAMES.auth,
                                        props: {
                                            initialTabKey: APP_AUTH_MODAL_SIGN_IN_TAB_KEY
                                        }
                                    })
                                }
                            >
                                <span
                                    className={classes.menuItemMembershipButton}
                                >
                                    <span
                                        className={classes.menuItemIconProfile}
                                    >
                                        <Icon src={Profile} />
                                    </span>
                                    <span
                                        className={classes.membershipButtonTypo}
                                        id={id`membershipTrigger`}
                                    >
                                        <b
                                            className={
                                                classes.membershipButtonBold
                                            }
                                        >
                                            Membership
                                        </b>
                                        <span
                                            className={
                                                classes.membershipButtonText
                                            }
                                        >
                                            Sign in / Register
                                        </span>
                                    </span>
                                    <span className={classes.menuItemIcon}>
                                        <Icon src={ChevronRightSmall} />
                                    </span>
                                </span>
                            </button>
                        )}
                    </li>
                </ul>
                <div className={classes.footer}>
                    <CallPickupStore />
                </div>
            </div>
        </>
    );
};

NavigationRoot.propTypes = {
    classes: shape({
        callButton: string,
        callButtonIcon: string,
        item: string,
        footer: string,
        membershipButtonBold: string,
        membershipButtonText: string,
        membershipButtonTypo: string,
        menuItem: string,
        menuItemIcon: string,
        menuItemButton: string,
        menuItemIconProfile: string,
        menuItemLink: string,
        menuItemLinkContainer: string,
        menuItemMembership: string,
        menuItemMembershipButton: string,
        menuItemMembershipLink: string,
        root: string,
        rootLeft: string,
        phone: string
    }),
    handleView: func,
    isRoot: bool,
    currentUser: shape({
        email: string,
        firstname: string,
        lastname: string
    }),
    isUserSignedIn: bool,
    isUserGettingDetails: bool
};

export default NavigationRoot;
