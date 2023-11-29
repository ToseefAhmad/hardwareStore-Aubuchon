import classnames from 'classnames';
import { bool, node, object, shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useWindowSize } from '@magento/peregrine';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useStyle } from '@magento/peregrine/lib/context/style';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import ArrowButton from '@app/components/ArrowButton';
import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    Location as locationIcon,
    Clock,
    Phone,
    Mail
} from '@app/components/Icons';
import Link from '@app/components/Link';
import Schedule from '@app/components/StoreComponents/Schedule';
import Status from '@app/components/StoreComponents/Status';
import { useBrandContext } from '@app/context/Brand';
import { useTailwindContext } from '@app/context/tailwind';
import { useStoreSwitcher } from '@app/hooks/useStoreSwitcher';
import { getStoreOpenCloseData } from '@app/utils/stores';

import defaultClasses from './storeDetails.module.css';

const StoreDetails = ({
    name,
    location,
    showMakeMyStoreButton,
    children,
    titleNode,
    showTitle,
    classes: propsClasses
}) => {
    const [, { getBrandFromList }] = useBrandContext();
    const { handleStoreSwitch } = useStoreSwitcher();
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const classes = useStyle(defaultClasses, propsClasses);
    const [, { dispatch }] = useEventingContext();

    const { logo } = getBrandFromList(location.brand?.uid);
    const schedule = location.schedule;
    const specialDays = location.specialDays;
    const { isOpen, storeWorkInfo } = getStoreOpenCloseData({
        schedule,
        specialDays
    });
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const goGoogle = () => {
        dispatch({
            type: 'STORE_DETAIL_GET_DIRECTIONS'
        });

        window.open(
            'https://maps.google.com?q=' +
                location.latitude +
                ',' +
                location.longitude
        );
    };

    // Splits the store's full name into three parts - brand, ' Store in ', location.
    const nameSplit = name?.split(/( Store in )/g);

    return (
        <div className={classes.root}>
            {showTitle && (
                <div
                    className={classnames(classes.title, {
                        [classes.titleOnly]: titleNode
                    })}
                >
                    {isMobile && !titleNode && (
                        <Link to="/stores" className={classes.arrowLink}>
                            <ArrowButton
                                direction="left"
                                priority="high"
                                classes={{
                                    root_highPriority: classes.arrowButton
                                }}
                            />
                        </Link>
                    )}
                    {!titleNode ? (
                        <div>
                            {nameSplit[0]} {nameSplit[1]}
                            <span className={classes.place}>
                                {nameSplit[2]}
                            </span>
                        </div>
                    ) : (
                        titleNode
                    )}
                </div>
            )}
            <div className={classes.image}>
                <img
                    className={classes.image}
                    alt={name}
                    src={resourceUrl(location.images[0], {
                        type: 'image-wysiwyg',
                        quality: 80,
                        width: 400,
                        height: 200,
                        fit: 'cover'
                    })}
                />
            </div>
            {children}
            <div className={classes.content}>
                <div className={classes.logo}>
                    <img width={118} height={24} src={logo} alt="logo" />
                </div>
                <div className={classes.fields}>
                    <div className={classes.address}>
                        <span className={classes.icon}>
                            <Icon src={locationIcon} />
                        </span>
                        <span>
                            {location.address}, {location.city},{' '}
                            {location.region_code}
                        </span>
                    </div>
                </div>
                <div className={classes.buttonWrap}>
                    <Button
                        type="submit"
                        isShort={true}
                        onClick={goGoogle}
                        classes={{
                            secondary: classes.buttonSecondary
                        }}
                    >
                        <FormattedMessage
                            id="global.getDirections"
                            defaultMessage="Get Directions"
                        />
                    </Button>
                </div>
                <div className={classes.fields}>
                    <div>
                        <div className={classes.status}>
                            <span className={classes.iconClock}>
                                <Icon src={Clock} />
                            </span>
                            <div className={classes.storeStatus}>
                                <Status
                                    isOpen={isOpen}
                                    storeWorkInfo={storeWorkInfo}
                                />
                            </div>
                        </div>
                        <div>
                            <Schedule schedule={schedule} />
                        </div>
                    </div>
                    <div className={classes.phone}>
                        <span className={classes.icon}>
                            <Icon src={Phone} />
                        </span>
                        {location.phone ? (
                            <a
                                href={`tel:${location.phone}`}
                                className={classes.link}
                                onClick={() => {
                                    dispatch({
                                        type: 'STORE_DETAIL_CALL'
                                    });
                                }}
                            >
                                {location.phone}
                            </a>
                        ) : (
                            '-'
                        )}
                    </div>
                    <div className={classes.mail}>
                        <span className={classes.icon}>
                            <Icon src={Mail} />
                        </span>
                        <span>
                            {location.email ? (
                                <a
                                    href={`mailto:${location.email}`}
                                    className={classes.link}
                                    onClick={() => {
                                        dispatch({
                                            type: 'STORE_DETAIL_EMAIL'
                                        });
                                    }}
                                >
                                    {location.email}
                                </a>
                            ) : (
                                '-'
                            )}
                        </span>
                    </div>
                </div>
                {showMakeMyStoreButton && (
                    <Button
                        type="submit"
                        priority="high"
                        isShort={true}
                        onPress={() => {
                            handleStoreSwitch(location.id, location.brand.uid);

                            dispatch({
                                type: 'STORE_DETAIL_MAKE_MY_STORE'
                            });
                        }}
                        classes={{
                            primary: classes.buttonPrimary
                        }}
                    >
                        <FormattedMessage
                            id="global.getDirections"
                            defaultMessage="Make My Store"
                        />
                    </Button>
                )}
            </div>
        </div>
    );
};

StoreDetails.defaultProps = {
    showMakeMyStoreButton: false,
    showTitle: true
};

StoreDetails.propTypes = {
    name: string,
    location: object,
    showMakeMyStoreButton: bool,
    showTitle: bool,
    children: node,
    titleNode: node,
    classes: shape({
        image: string,
        content: string,
        mail: string
    })
};

export default StoreDetails;
