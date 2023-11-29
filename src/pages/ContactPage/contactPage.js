import classNames from 'classnames';
import React from 'react';

import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import GoogleMaps from '@app/components/GoogleMaps';
import { Meta } from '@app/components/Head';
import Icon from '@app/components/Icon';
import { Phone, Mail, ChevronLeftSmall } from '@app/components/Icons';
import Link from '@app/components/Link';
import Social from '@app/components/Social';
import StoreMap from '@app/components/StoreMap';

import classes from './contactPage.module.css';
import { useContactPage } from './useContactPage';

const CONTACT_US_DESCRIPTION =
    "Questions? We're here to help in store or online at HardwareStore.com.";

const ContactPage = () => {
    const {
        storeList,
        storeListLoading,
        isMobile,
        cmsConfig
    } = useContactPage();
    const [, { dispatch }] = useEventingContext();

    return (
        <>
            <StoreTitle>Contact Us</StoreTitle>
            <Meta name="description" content={CONTACT_US_DESCRIPTION} />
            <div className={classes.root}>
                <h1 className={classes.title}>
                    {isMobile && (
                        <Link
                            to="/"
                            priority="secondary"
                            className={classes.backButton}
                        >
                            <Icon src={ChevronLeftSmall} />
                        </Link>
                    )}
                    Contact us
                </h1>
                <ul className={classes.list}>
                    <li className={classes.item}>
                        <h4 className={classes.itemTitle}>
                            {cmsConfig.connect.title}
                        </h4>
                        <div className={classes.content}>
                            <div className={classes.iconWrapper}>
                                <span className={classes.phoneIcon}>
                                    <Icon src={Phone} />
                                </span>
                                <div className={classes.phoneNumbers}>
                                    <a
                                        className={classes.link}
                                        href={`tel:${
                                            cmsConfig.connect.phoneNumber
                                        }`}
                                    >
                                        {cmsConfig.connect.phoneNumber}
                                    </a>
                                    <p className={classes.phoneWithText}>
                                        <a
                                            className={classes.link}
                                            href={`tel:${
                                                cmsConfig.connect
                                                    .phoneNumberCorporate
                                            }`}
                                        >
                                            {
                                                cmsConfig.connect
                                                    .phoneNumberCorporate
                                            }
                                        </a>
                                        (corporate)
                                    </p>
                                </div>
                            </div>
                            <div
                                className={classNames(
                                    classes.iconWrapper,
                                    classes.emailLink
                                )}
                            >
                                <span className={classes.emailIcon}>
                                    <Icon src={Mail} />
                                </span>
                                <p>
                                    <a
                                        className={classes.link}
                                        href={`mailto:${
                                            cmsConfig.connect.email
                                        }`}
                                        onClick={() =>
                                            dispatch({
                                                type: 'CONTACT_US_EMAIL'
                                            })
                                        }
                                    >
                                        {cmsConfig.connect.email}
                                    </a>
                                </p>
                            </div>
                            <section className={classes.social}>
                                <Social
                                    classes={{
                                        linkList: classes.socialLinkList
                                    }}
                                    isTitleVisible={false}
                                    isIconsAlignLeft={true}
                                />
                            </section>
                        </div>
                    </li>
                    <li className={classes.item}>
                        <h4 className={classes.itemTitle}>
                            {cmsConfig.storeLocator.title}
                        </h4>
                        <div className={classes.content}>
                            <p>{cmsConfig.storeLocator.text}</p>
                        </div>
                        <div className={classes.bottom}>
                            <Link
                                className={classes.buttonLink}
                                to={cmsConfig.storeLocator.link}
                                priority="secondary"
                                onClick={() =>
                                    dispatch({
                                        type: 'CONTACT_US_RETAIL_LOCATIONS'
                                    })
                                }
                            >
                                Store Locator
                            </Link>
                        </div>
                    </li>
                    <li className={classes.item}>
                        <h4 className={classes.itemTitle}>
                            {cmsConfig.mainOffice.title}
                        </h4>
                        <div className={classes.content}>
                            <p>
                                {cmsConfig.mainOffice.text.map(
                                    (text, index) => {
                                        return (
                                            <span
                                                className={classes.line}
                                                key={index}
                                            >
                                                {text}
                                            </span>
                                        );
                                    }
                                )}
                            </p>
                        </div>
                        <div className={classes.bottom}>
                            <a
                                className={classes.buttonLink}
                                href={cmsConfig.mainOffice.link}
                                onClick={() =>
                                    dispatch({
                                        type: 'CONTACT_US_DRIVING_LOCATIONS'
                                    })
                                }
                                target="_blank"
                                rel="noreferrer"
                            >
                                Get Directions
                            </a>
                        </div>
                    </li>
                </ul>
                <div className={classes.mapWrapper}>
                    <h2 className={classes.subTitle}>Nearest stores to you</h2>
                    <div className={classes.map}>
                        {storeListLoading && (
                            <div className={classes.mapShimmer}>
                                <Shimmer width="100%" height="100%" />
                            </div>
                        )}
                        {!storeListLoading && storeList?.length > 0 && (
                            <GoogleMaps>
                                <StoreMap
                                    locations={storeList}
                                    locateOnInit={true}
                                    isFullBleed={true}
                                />
                            </GoogleMaps>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
