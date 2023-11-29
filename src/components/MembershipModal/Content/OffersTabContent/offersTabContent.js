import { func } from 'prop-types';
import React from 'react';

import { useWindowSize } from '@magento/peregrine';

import Icon from '@app/components/Icon';
import {
    Percent15offMobile as Percent30offMobileIcon,
    Percent15offDesktop as Percent30offDesktopIcon
} from '@app/components/Icons';
import { useTailwindContext } from '@app/context/tailwind';

import CallToActionBlock from '../CallToActionBlock';
import classes from './offersTabContent.module.css';

const OffersTabContent = ({ onLinkBtnClick, onBtnClick }) => {
    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();

    const isMobile = innerWidth < screens.lg;

    return (
        <>
            <div className={classes.icon}>
                <Icon
                    src={
                        isMobile
                            ? Percent30offMobileIcon
                            : Percent30offDesktopIcon
                    }
                />
            </div>
            <h3 className={classes.title}>First HardwareStore.com Order*</h3>
            <p className={classes.description}>
                *15% off applies only to your first HardwareStore.com order with
                a max savings of $45. Excludes Honda, Stihl, Husqvarna, Scotts 4
                Step Program and all wood pellet purchases. You must register
                your account to get this offer. Discount will be auto-applied
                during checkout. This offer is subject to change without notice.
            </p>
            <CallToActionBlock
                onBtnClick={onBtnClick}
                onLinkBtnClick={onLinkBtnClick}
            />
        </>
    );
};

OffersTabContent.propTypes = {
    onLinkBtnClick: func.isRequired,
    onBtnClick: func.isRequired
};

export default OffersTabContent;
