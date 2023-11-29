import { APP_ROUTER_PATHS } from '@app-constants';
import React, { lazy, Suspense } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import AddressCard from '@app/components/AddressCard';
import Icon from '@app/components/Icon';
import { Plus as PlusIcon } from '@app/components/Icons';
import Link from '@app/components/Link';
import Section from '@app/components/Section';
import { useAddressBookPage } from '@app/pages/AccountPagesSwitcher/AddressBookPage/useAddressBookPage';

import classes from './addressBookPage.module.css';
import AddressBookPageShimmer from './addressBookPage.shimmer';

const AddressesTable = lazy(() => import('./AddressesTable'));
const FormError = lazy(() =>
    import('@magento/venia-ui/lib/components/FormError')
);

const AddressBookPage = () => {
    const { formatMessage } = useIntl();
    const {
        pageData,
        loadDataError,
        errors,
        handleDeleteAddress,
        isDeletingCustomerAddress
    } = useAddressBookPage();

    let pageContent = <AddressBookPageShimmer />;

    if (loadDataError) {
        pageContent = (
            <p>
                <FormattedMessage
                    id="addressBookPage.errorTryAgain"
                    defaultMessage="Something went wrong. Please refresh and try again."
                />
            </p>
        );
    } else if (!isObjectEmpty(pageData)) {
        pageContent = (
            <section className={classes.root}>
                <Section>
                    <Section.Title>
                        <FormattedMessage
                            id="addressBookPage.defaultAddressesTitle"
                            defaultMessage="Default Addresses"
                        />
                    </Section.Title>
                    <div className={classes.cards}>
                        <AddressCard
                            data={pageData.addresses.defaultBilling}
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
                            data={pageData.addresses.defaultShipping}
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
                                id="addressBookPage.additionalAddressEntriesTitle"
                                defaultMessage="Additional address entries"
                            />
                        </Section.Title>
                        <Link
                            className={classes.link}
                            to={APP_ROUTER_PATHS.addAddressPage}
                        >
                            <Icon src={PlusIcon} />
                            <FormattedMessage
                                id="addressBookPage.addNewAddress"
                                defaultMessage="Add New Address"
                            />
                        </Link>
                    </header>
                    {pageData.addresses.list.length ? (
                        <Suspense fallback={<Shimmer height="428px" />}>
                            <FormError errors={errors} />
                            <AddressesTable
                                data={pageData.addresses.list}
                                onRemove={handleDeleteAddress}
                                disabled={isDeletingCustomerAddress}
                            />
                        </Suspense>
                    ) : (
                        <h5>
                            <FormattedMessage
                                id="addressBookPage.emptyAddressesTableMessage"
                                defaultMessage="You don't have any other addresses yet."
                            />
                        </h5>
                    )}
                </Section>
            </section>
        );
    }

    return pageContent;
};

export default AddressBookPage;
