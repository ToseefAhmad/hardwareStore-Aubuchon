import { bool, number } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import CreditCard from './CreditCard';
import SavedPaymentsTableHead from './CreditCard/Head';
import classes from './savedPaymentsPage.module.css';
import SavedPaymentsPageShimmer from './savedPaymentsPage.shimmer';
import { useSavedPaymentsPage } from './useSavedPaymentsPage.js';

const SavedPaymentsPage = props => {
    const { isLoading, isError, savedPayments } = useSavedPaymentsPage();

    const { maxPayments, showDeleteButton } = props;

    let pageContent = <SavedPaymentsPageShimmer />;

    if (isError) {
        pageContent = (
            <div className={classes.messageContainer}>
                <p>
                    <FormattedMessage
                        id="rewardsPage.errorTryAgain"
                        defaultMessage="Something went wrong. Please refresh and try again."
                    />
                </p>
            </div>
        );
    } else if (!isLoading) {
        if (!savedPayments.length) {
            pageContent = (
                <div className={classes.messageContainer}>
                    <p>
                        <FormattedMessage
                            id="rewardsPage.noData"
                            defaultMessage="The customer does not have saved payment methods yet."
                        />
                    </p>
                </div>
            );
        } else {
            pageContent = (
                <div className={classes.root}>
                    <div className={classes.cards}>
                        <ul className={classes.table}>
                            <SavedPaymentsTableHead />
                            {savedPayments
                                .slice(0, maxPayments || savedPayments.length)
                                .map(({ public_hash, ...rest }) => (
                                    <CreditCard
                                        {...rest}
                                        key={public_hash}
                                        public_hash={public_hash}
                                        showDeleteButton={showDeleteButton}
                                    />
                                ))}
                        </ul>
                    </div>
                </div>
            );
        }
    }

    return pageContent;
};

SavedPaymentsPage.propTypes = {
    maxPayments: number,
    showDeleteButton: bool
};

export default SavedPaymentsPage;
