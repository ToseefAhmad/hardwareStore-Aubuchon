import classnames from 'classnames';
import { shape, string } from 'prop-types';
import React, { Fragment, Suspense } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

const Newsletter = React.lazy(() =>
    import('@magento/venia-ui/lib/components/Newsletter')
);
const Social = React.lazy(() => import('@app/components/Social'));
const UserwayWidget = React.lazy(() =>
    import('@app/components/Footer/UserwayWidget')
);

import defaultClasses from './footer.module.css';
import LinksList from './linksList';
import Membership from './Membership';
import OrderStatus from './OrderStatus/orderStatus';
import SupportedPaymentMethods from './supportedPaymentMethods';
import { useFooter } from './useFooter';

const Footer = props => {
    const classes = useStyle(defaultClasses, props.classes);

    const { isSignedIn, isMobile } = useFooter();

    return (
        <footer className={classes.root}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <div
                        className={classnames({
                            [classes.leftBlockSection]: !isMobile
                        })}
                    >
                        {!isSignedIn && (
                            <section className={classes.newsletter}>
                                <Suspense fallback={null}>
                                    <Newsletter />
                                </Suspense>
                            </section>
                        )}
                        {!isMobile && (
                            <section className={classes.social}>
                                <Suspense fallback={null}>
                                    <Social />
                                </Suspense>
                            </section>
                        )}
                        {!isMobile && (
                            <Suspense fallback={null}>
                                <UserwayWidget />
                            </Suspense>
                        )}
                    </div>
                    {!isMobile && (
                        <Fragment>
                            <section className={classes.linkList}>
                                <LinksList identifiers={'footer-categories'} />
                            </section>
                            <section className={classes.linkList}>
                                <LinksList
                                    identifiers={'footer-useful-links'}
                                />
                            </section>
                        </Fragment>
                    )}
                    <div
                        className={classnames({
                            [classes.rightBlockSection]: !isMobile
                        })}
                    >
                        {!isMobile && (
                            <section className={classes.orderStatus}>
                                <OrderStatus isSignedIn={isSignedIn} />
                            </section>
                        )}
                        <section className={classes.membership}>
                            <Membership isSignedIn={isSignedIn} />
                        </section>
                    </div>
                    {isMobile && (
                        <section className={classes.social}>
                            <Suspense fallback={null}>
                                <Social />
                            </Suspense>
                        </section>
                    )}
                </div>
            </div>
            <div className={classes.brandingWrapper}>
                <div className={classes.branding}>
                    <SupportedPaymentMethods />
                    <a
                        href="https://www.aubuchon.company/"
                        className={classes.copyright}
                        target="_blank"
                        rel="noreferrer"
                    >
                        © Copyright W.E. Aubuchon Co., Inc.
                    </a>
                    {isMobile && (
                        <Suspense fallback={null}>
                            <UserwayWidget />
                        </Suspense>
                    )}
                </div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};

export default Footer;
