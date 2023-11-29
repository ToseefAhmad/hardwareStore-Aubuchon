import { APP_ROUTER_PATHS } from '@app-constants';
import { number, shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { generatePath } from 'react-router-dom';

import Card from '@app/components/Card';
import Link from '@app/components/Link';

const AddressCard = props => {
    const { data, title, emptyMessage } = props;

    let content;

    if (!data) {
        content = <p>{emptyMessage}</p>;
    } else {
        const {
            id,
            firstname,
            lastname,
            street,
            city,
            region,
            postcode,
            country,
            telephone
        } = data;

        content = (
            <>
                <div>
                    <p>
                        {firstname} {lastname}
                    </p>
                    <p>{street}</p>
                    <p>
                        {city}, {region}, {postcode}
                    </p>
                    <p>{country}</p>
                    <p>{telephone}</p>
                </div>
                <Card.Actions>
                    <Link
                        to={generatePath(APP_ROUTER_PATHS.addressPage, {
                            id
                        })}
                        isButtonLike
                        priority="secondary"
                    >
                        <FormattedMessage
                            id="global.editAddress"
                            defaultMessage="Edit Address"
                        />
                    </Link>
                </Card.Actions>
            </>
        );
    }

    return (
        <Card>
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {content}
            </Card.Body>
        </Card>
    );
};

AddressCard.propTypes = {
    data: shape({
        id: number.isRequired,
        firstname: string.isRequired,
        lastname: string.isRequired,
        street: string.isRequired,
        city: string.isRequired,
        region: string.isRequired,
        postcode: string.isRequired,
        country: string.isRequired,
        telephone: string.isRequired
    }),
    title: string,
    emptyMessage: string.isRequired
};

export default AddressCard;
