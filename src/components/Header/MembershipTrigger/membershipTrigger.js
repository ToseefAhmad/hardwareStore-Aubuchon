import { shape, string } from 'prop-types';
import React, { Fragment } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import { Stars as MembershipIcon } from '@app/components/Icons';

import defaultClasses from './membershipTrigger.module.css';
import { useMembershipTrigger } from './useMembershipTrigger';

const MembershipTrigger = ({ classes: propsClasses }) => {
    const { handleTriggerClick, isOpen, firstName } = useMembershipTrigger();

    const classes = useStyle(defaultClasses, propsClasses);

    return (
        <Fragment>
            <div className={classes.root}>
                <button
                    className={classes.trigger}
                    onClick={handleTriggerClick}
                    aria-expanded={isOpen}
                    aria-controls="membership"
                >
                    <div className={classes.icon}>
                        <Icon src={MembershipIcon} />
                    </div>
                    <div className={classes.info}>
                        <span className={classes.text}>Membership</span>
                        <span className={classes.actionText}>
                            {firstName ? `Hello, ${firstName}` : 'Learn More'}
                        </span>
                    </div>
                </button>
            </div>
        </Fragment>
    );
};

MembershipTrigger.propTypes = {
    classes: shape({
        root: string,
        trigger: string,
        amountWrapper: string,
        icon: string,
        chevronIcon: string,
        info: string,
        text: string,
        amount: string,
        statusTextWrapper: string
    })
};

export default MembershipTrigger;
