import { string } from 'prop-types';
import React, { useCallback } from 'react';
import IntlMessageFormat from 'intl-messageformat'

const LOCALE = DEFAULT_LOCALE || 'en-US';
const ERROR_MSG = 'No default message provided!';

const formatMessage = (str = '', values = {}) => {
    const msg = new IntlMessageFormat(str, LOCALE);

    return msg.format(values);
}

export const FormattedMessage = props => {
    const { defaultMessage, values } = props;

    if (!defaultMessage) throw ERROR_MSG;

    return formatMessage(defaultMessage, values);
};

FormattedMessage.propTypes = {
    defaultMessage: string.isRequired
};

export const useIntl = () => {
    return {
        defaultLocale: LOCALE,
        locale: LOCALE,
        formatMessage: useCallback(({defaultMessage = ''}, values = {}) => {
            if (!defaultMessage) throw ERROR_MSG;

            return formatMessage(defaultMessage, values);
        }, [])
    };
}
