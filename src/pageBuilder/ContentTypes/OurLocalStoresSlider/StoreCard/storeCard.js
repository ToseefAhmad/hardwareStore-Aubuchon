import classnames from 'classnames';
import { bool, func, object, oneOfType, string } from 'prop-types';
import React, { useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';

import dropdownTransitions from '@app/components/Header/StoreSwitcher/dropdownTransitions.module.css';
import { useId } from '@app/hooks/useId';
import StoreCardDropdown from '@app/pageBuilder/ContentTypes/OurLocalStoresSlider/StoreCard/StoreCardDropdown';

import classes from './storeCard.module.css';

const StoreCard = props => {
    const {
        storeInfo: {
            name,
            logo,
            description,
            primary_color: primaryColor,
            cms_about_us_page: aboutUsLink,
            uid
        },
        isMobile,
        expanded,
        setExpanded,
        firstElement,
        lastElement
    } = props;

    const isOpened = useMemo(() => {
        return expanded === uid;
    }, [expanded, uid]);

    const { id } = useId();

    const storeCardDropdown = (
        <StoreCardDropdown
            ariaIdentifier={id`localStoreInfo`}
            description={description}
            name={name}
            uid={uid}
            primaryColor={primaryColor}
            aboutUsLink={aboutUsLink}
            firstElement={firstElement}
            lastElement={lastElement}
        />
    );

    return (
        <div className={classes.root}>
            <div className={classes.storeImage}>
                <img alt={name} src={logo} className={classes.imageRoot} />
            </div>
            <div
                className={classes.button}
                onMouseEnter={() => setExpanded(uid)}
                onMouseLeave={() => setExpanded(false)}
            >
                <div
                    className={classnames(classes.circle, {
                        [classes.circleHover]: isOpened || isMobile
                    })}
                    aria-expanded={isOpened}
                    aria-haspopup="dialog"
                    aria-controls={isOpened ? id`localStoreInfo` : null}
                />
                {!isMobile ? (
                    <CSSTransition
                        in={isOpened}
                        classNames={{ ...dropdownTransitions }}
                        timeout={150}
                        unmountOnExit
                    >
                        {storeCardDropdown}
                    </CSSTransition>
                ) : (
                    storeCardDropdown
                )}
            </div>
        </div>
    );
};

StoreCard.propTypes = {
    storeInfo: object,
    name: string,
    logo: string,
    isMobile: bool,
    expanded: oneOfType([bool, string]),
    setExpanded: func,
    firstElement: string,
    lastElement: string
};

export default StoreCard;
