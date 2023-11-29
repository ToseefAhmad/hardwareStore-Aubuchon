import { useFieldState } from 'informed';
import { arrayOf, number, shape, string, bool } from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import Select from '@app/components/Select';

const Region = props => {
    const { countries, countyField, isValueNumber, ...rest } = props;

    const { formatMessage } = useIntl();
    const { value: countryId } = useFieldState(countyField);

    const regionsList = useMemo(() => {
        const countryData = countries.find(({ id }) => id === countryId);

        return countryData
            ? countryData.available_regions.map(({ id, name, code }) => ({
                  key: id,
                  label: name,
                  value: isValueNumber ? id : code
              }))
            : [];
    }, [countries, countryId, isValueNumber]);

    const valueParser = useCallback(v => +v, []);

    return (
        <Select
            {...rest}
            placeholder={formatMessage({
                id: 'global.selectRegion',
                defaultMessage: 'Select State/Province/Region'
            })}
            isSearchable={true}
            items={regionsList}
            parser={isValueNumber ? valueParser : null}
        />
    );
};

Region.propTypes = {
    countries: arrayOf(
        shape({
            id: string,
            full_name_locale: string,
            available_regions: arrayOf(
                shape({
                    id: number,
                    name: string,
                    code: string
                })
            )
        })
    ).isRequired,
    countyField: string.isRequired,
    isValueNumber: bool
};

Region.defaultProps = {
    isValueNumber: true
};

export default Region;
