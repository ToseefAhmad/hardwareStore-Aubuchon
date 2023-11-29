import { string } from 'prop-types';
import React, { useRef } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Icon from '@app/components/Icon';
import {
    Userway as UserwayIcon,
    UserwayMobile as UserwayMobileIcon
} from '@app/components/Icons';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './userwayWidget.module.css';

const UserwayWidget = props => {
    const classes = useStyle(defaultClasses, props.propClasses);

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const widgetRef = useRef(document.querySelector('#accessibilityWidget'));

    if (!USERWAY_ACCOUNT_ID || !widgetRef.current) return null;

    return (
        <button
            className={classes.root}
            onClick={() => {
                widgetRef.current.click();
            }}
        >
            <Icon
                classes={{ icon: classes.icon }}
                src={isMobile ? UserwayMobileIcon : UserwayIcon}
            />
        </button>
    );
};

UserwayWidget.propTypes = {
    propClasses: string
};

export default UserwayWidget;
