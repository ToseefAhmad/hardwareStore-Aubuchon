import { APP_ROUTER_PATHS } from '@app-constants';
import { shape, string } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from '@app/components/Card';
import Link from '@app/components/Link';

const ContactInfoCard = ({ customer: { firstname, lastname, email } }) => (
    <Card>
        <Card.Body>
            <Card.Title>
                <FormattedMessage
                    id="accountPage.contactInformationTitle"
                    defaultMessage="Contact information"
                />
            </Card.Title>
            <p>
                {firstname} {lastname}
            </p>
            <p>{email}</p>
            <Card.Actions>
                <Link
                    to={APP_ROUTER_PATHS.accountInformation}
                    isButtonLike
                    priority="secondary"
                >
                    <FormattedMessage id="global.edit" defaultMessage="Edit" />
                </Link>
                <Link
                    to={{
                        pathname: APP_ROUTER_PATHS.accountInformation,
                        state: { isChangePassword: true }
                    }}
                    isButtonLike
                    priority="secondary"
                >
                    <FormattedMessage
                        id="global.changePassword"
                        defaultMessage="Change Password"
                    />
                </Link>
            </Card.Actions>
        </Card.Body>
    </Card>
);

ContactInfoCard.propTypes = {
    customer: shape({
        firstname: string.isRequired,
        lastname: string.isRequired,
        email: string.isRequired
    })
};

export default ContactInfoCard;
