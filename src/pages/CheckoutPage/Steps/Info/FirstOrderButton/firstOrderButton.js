import { func } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Image from '@magento/venia-ui/lib/components/Image';

import Icon from '@app/components/Icon';
import { ChevronRight } from '@app/components/Icons';

import classes from './firstOrderButton.module.css';

const FirstOrderButton = props => {
    const { onClick } = props;

    return (
        <fieldset className={classes.wrap}>
            <button className={classes.root} type="button" onClick={onClick}>
                <span className={classes.phoneImageWrap}>
                    <Image
                        classes={{ image: classes.phoneImage }}
                        src="/assets/membership/gift.png"
                        alt="Phone"
                    />
                </span>
                <strong className={classes.strong}>
                    <FormattedMessage
                        id="firstOrderButton.strongText"
                        defaultMessage="Get 30% off your first order!"
                    />
                </strong>
                <FormattedMessage
                    id="firstOrderButton.text"
                    defaultMessage="Make account and get 30% off your order!"
                />
                <Icon
                    classes={{ icon: classes.arrowIcon }}
                    src={ChevronRight}
                />
            </button>
        </fieldset>
    );
};

FirstOrderButton.propTypes = {
    onClick: func
};

FirstOrderButton.defaultProps = {
    onClick: () => {}
};

export default FirstOrderButton;
