import { APP_ROUTER_PATHS } from '@app-constants';
import { func, shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { generatePath } from 'react-router-dom';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Edit as EditIcon, Trash as TrashIcon } from '@app/components/Icons';
import Link from '@app/components/Link';

import classes from './row.module.css';

const AddressesTableRow = props => {
    const {
        data: {
            id,
            firstname,
            lastname,
            street,
            city,
            region,
            postcode,
            country,
            telephone
        },
        onRemove
    } = props;

    return (
        <li className={classes.root}>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.firstnameLabel"
                        defaultMessage="First name:"
                    />
                </dt>
                <dd className={classes.value}>{firstname}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.lastnameLabel"
                        defaultMessage="Last name:"
                    />
                </dt>
                <dd className={classes.value}>{lastname}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.streetAddressLabel"
                        defaultMessage="Street address:"
                    />
                </dt>
                <dd className={classes.value}>{street}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.cityLabel"
                        defaultMessage="City:"
                    />
                </dt>
                <dd className={classes.value}>{city}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.countryLabel"
                        defaultMessage="Country:"
                    />
                </dt>
                <dd className={classes.value}>{country}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.stateLabel"
                        defaultMessage="State:"
                    />
                </dt>
                <dd className={classes.value}>{region}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.postalCodeLabel"
                        defaultMessage="Postal code:"
                    />
                </dt>
                <dd className={classes.value}>{postcode}</dd>
            </dl>
            <dl className={classes.cell}>
                <dt className={classes.label}>
                    <FormattedMessage
                        id="addressesTable.phoneLabel"
                        defaultMessage="Phone:"
                    />
                </dt>
                <dd className={classes.value}>{telephone}</dd>
            </dl>
            <div className={classes.actionsCell}>
                <Link
                    to={generatePath(APP_ROUTER_PATHS.addressPage, { id })}
                    className={classes.actionLink}
                    isButtonLike
                    priority="secondary"
                >
                    <Icon src={EditIcon} />
                </Link>
                <Button
                    classes={{ secondary: classes.actionButton }}
                    onClick={() => onRemove({ id })}
                >
                    <Icon src={TrashIcon} />
                </Button>
            </div>
        </li>
    );
};

AddressesTableRow.propTypes = {
    data: shape({
        firstname: string.isRequired,
        lastname: string.isRequired,
        street: string.isRequired,
        city: string.isRequired,
        region: string.isRequired,
        postcode: string.isRequired,
        country: string.isRequired,
        telephone: string.isRequired
    }).isRequired,
    onRemove: func.isRequired
};

export default AddressesTableRow;
