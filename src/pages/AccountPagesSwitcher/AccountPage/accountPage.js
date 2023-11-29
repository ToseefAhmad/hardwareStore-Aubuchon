import { APP_ROUTER_PATHS } from '@app-constants';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useWindowSize } from '@magento/peregrine';
import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import AddressCard from '@app/components/AddressCard';
import Link from '@app/components/Link';
import OrdersTable from '@app/components/OrdersTable';
import Section from '@app/components/Section';
import { useTailwindContext } from '@app/context/tailwind';

import SavedPaymentsPage from '../SavedPaymentsPage';
import classes from './accountPage.module.css';
import AccountPageShimmer from './accountPage.shimmer';
import ContactInfoCard from './ContactInfoCard';
import RewardInfo from './RewardInfo';
import SignOutButton from './SignOutButton';
import { useAccountPage } from './useAccountPage';

const AccountPage = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const { formatMessage } = useIntl();

    const { pageData, loadDataError } = useAccountPage();

    let pageContent = <AccountPageShimmer />;

    if (loadDataError) {
        pageContent = (
            <div className={classes.errorContainer}>
                <p>
                    <FormattedMessage
                        id="accountPage.errorTryAgain"
                        defaultMessage="Something went wrong. Please refresh and try again."
                    />
                </p>
            </div>
        );
    } else if (!isObjectEmpty(pageData)) {
        pageContent = (
            <section className={classes.root}>
                {isMobile && <SignOutButton />}
                <RewardInfo data={pageData.rewardInformation} />
                <Section>
                    <Section.Title>
                        <FormattedMessage
                            id="accountPage.accountInformationTitle"
                            defaultMessage="Account Information"
                        />
                    </Section.Title>
                    <div className={classes.cards}>
                        <ContactInfoCard customer={pageData.customer} />
                    </div>
                </Section>
                <Section>
                    <header>
                        <Section.Title>
                            <FormattedMessage
                                id="accountPage.addressBookTitle"
                                defaultMessage="Address Book"
                            />
                        </Section.Title>
                        <Link
                            to={APP_ROUTER_PATHS.addressBook}
                            className={classes.link}
                        >
                            <FormattedMessage
                                id="accountPage.manageAddressesLink"
                                defaultMessage="Manage Addresses"
                            />
                        </Link>
                    </header>
                    <div className={classes.cards}>
                        <AddressCard
                            data={pageData.customer.addresses.defaultBilling}
                            title={formatMessage({
                                id: 'accountPage.defaultBillingAddressTitle',
                                defaultMessage: 'Default Billing Address'
                            })}
                            emptyMessage={formatMessage({
                                id: 'accountPage.emptyDefaultBillingAddress',
                                defaultMessage:
                                    'The customer does not have default billing address'
                            })}
                        />
                        <AddressCard
                            data={pageData.customer.addresses.defaultShipping}
                            title={formatMessage({
                                id: 'accountPage.defaultShippingAddressTitle',
                                defaultMessage: 'Default Shipping Address'
                            })}
                            emptyMessage={formatMessage({
                                id: 'accountPage.emptyDefaultShippingAddress',
                                defaultMessage:
                                    'The customer does not have default shipping address'
                            })}
                        />
                    </div>
                </Section>
                <Section>
                    <header>
                        <Section.Title>
                            <FormattedMessage
                                id="accountPage.ordersTitle"
                                defaultMessage="Orders"
                            />
                        </Section.Title>
                        <Link
                            to={APP_ROUTER_PATHS.orderHistory}
                            className={classes.link}
                        >
                            <FormattedMessage
                                id="accountPage.ordersLink"
                                defaultMessage=" View All Orders"
                            />
                        </Link>
                    </header>
                    <OrdersTable pageSize={3} isShownPagination={false} />
                </Section>
                <Section>
                    <header>
                        <Section.Title>
                            <FormattedMessage
                                id="accountPage.storedPaymentMethodsTitle"
                                defaultMessage="Stored Payment Methods"
                            />
                        </Section.Title>
                        <Link
                            to={APP_ROUTER_PATHS.savedPaymentsPage}
                            className={classes.link}
                        >
                            <FormattedMessage
                                id="accountPage.storedPaymentMethodsLink"
                                defaultMessage="View All Stored Payment Methods"
                            />
                        </Link>
                    </header>
                    <SavedPaymentsPage
                        maxPayments={3}
                        showDeleteButton={false}
                    />
                </Section>
            </section>
        );
    }

    return pageContent;
};

export default AccountPage;
