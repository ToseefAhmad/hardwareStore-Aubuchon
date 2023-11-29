import { shape, string, bool } from 'prop-types';
import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useToasts } from '@magento/peregrine';
import { useCreditCard } from '@magento/peregrine/lib/talons/SavedPaymentsPage/useCreditCard';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Alert as AlertIcon, Trash as TrashIcon } from '@app/components/Icons';
import { CARD_IMAGE_MAPPER } from '@app/utils/creditCardUtils';

import classes from './creditCard.module.css';

const errorIcon = <Icon src={AlertIcon} size={20} />;

const CreditCard = ({ details, public_hash, showDeleteButton }) => {
    const { handleDeletePayment, hasError } = useCreditCard({
        paymentHash: public_hash
    });

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            addToast({
                type: 'error',
                icon: errorIcon,
                message: formatMessage({
                    id: 'savedPaymentsPage.creditCard.errorRemoving',
                    defaultMessage:
                        'Something went wrong deleting this payment method. Please refresh and try again.'
                }),
                dismissable: true,
                timeout: 7000
            });
        }
    }, [addToast, formatMessage, hasError]);

    return (
        <li className={classes.root}>
            <dl className={classes.cell}>
                <dd className={classes.typeValue}>
                    {CARD_IMAGE_MAPPER[details.type] ? (
                        <img
                            src={CARD_IMAGE_MAPPER[details.type]}
                            alt={details.type}
                            className={classes.image}
                        />
                    ) : (
                        <div className={classes.placeholder} />
                    )}
                </dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.labelNumber}>
                    <FormattedMessage
                        id="creditCard.numberLabel"
                        defaultMessage="Card number:"
                    />
                </dt>
                <dd className={classes.value}>Ending {details.maskedCC}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.labelDate}>
                    <FormattedMessage
                        id="creditCard.expirationDataLabel"
                        defaultMessage="Expiration date:"
                    />
                </dt>
                <dd className={classes.value}>{details.expirationDate}</dd>
            </dl>
            {showDeleteButton && (
                <div className={classes.actionsCell}>
                    <Button
                        classes={{ secondary: classes.actionButton }}
                        onPress={handleDeletePayment}
                    >
                        <Icon src={TrashIcon} />
                        <span className={classes.delete}>
                            <FormattedMessage
                                id={'storedPayments.delete'}
                                defaultMessage={'Delete'}
                            />
                        </span>
                    </Button>
                </div>
            )}
        </li>
    );
};

CreditCard.propTypes = {
    details: shape({
        expirationDate: string,
        maskedCC: string,
        type: string
    }),
    public_hash: string,
    showDeleteButton: bool
};

CreditCard.defaultProps = {
    showDeleteButton: true
};

export default CreditCard;
