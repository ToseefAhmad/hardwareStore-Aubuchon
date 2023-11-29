import { useFormState, useFormApi } from 'informed';
import { useEffect, useMemo } from 'react';

import {
    getDateObjectValue,
    getFormattedDate,
    getDaysList,
    getMonthList,
    getMonthString
} from './utils/dateOfBirth.utils';

const DEFAULT_DOB_YEAR = 2001;
const DEFAULT_DOB_OPTION_VALUE = 'none';

export const useDateOfBirth = props => {
    const { dateFieldName, initialValue } = props;

    const { setValue: setFormValue } = useFormApi();
    const { errors, values: formValues } = useFormState();

    const dayFieldName = `${dateFieldName}_day`;
    const monthFieldName = `${dateFieldName}_month`;

    const [, monthStr, dayStr] = (initialValue || '').split('-');
    const dayOfBirth = dayStr
        ? dayStr.replace(/^0+/, '')
        : DEFAULT_DOB_OPTION_VALUE;
    const monthOfBirth = monthStr
        ? getMonthString(monthStr)
        : DEFAULT_DOB_OPTION_VALUE;

    const dayFieldValue = formValues[dayFieldName] || dayOfBirth;
    const monthFieldValue = formValues[monthFieldName] || monthStr;

    const dayOptionsList = useMemo(
        () => [
            ...getDaysList({ year: DEFAULT_DOB_YEAR, month: monthFieldValue })
        ],
        [monthFieldValue]
    );

    const monthOptionsList = useMemo(() => [...getMonthList()], []);

    // Setting the initial values of the selections
    useEffect(() => {
        let initialDayFieldValue = DEFAULT_DOB_OPTION_VALUE;
        let initialMonthFieldValue = DEFAULT_DOB_OPTION_VALUE;

        if (initialValue) {
            const { day, month } = getDateObjectValue({
                dateValue: formValues[dateFieldName],
                defaultFieldValue: DEFAULT_DOB_OPTION_VALUE
            });

            initialDayFieldValue = day;
            initialMonthFieldValue = month;
        }

        setFormValue(dayFieldName, initialDayFieldValue);
        setFormValue(monthFieldName, initialMonthFieldValue);
    }, [
        dateFieldName,
        dayFieldName,
        formValues,
        initialValue,
        monthFieldName,
        setFormValue
    ]);

    // Watcher for changes in selections values
    useEffect(() => {
        const isNeedSetNewValue =
            dayFieldValue !== DEFAULT_DOB_OPTION_VALUE &&
            monthFieldValue !== DEFAULT_DOB_OPTION_VALUE;
        const isNeedResetValue =
            dayFieldValue === DEFAULT_DOB_OPTION_VALUE &&
            monthFieldValue === DEFAULT_DOB_OPTION_VALUE;

        if (isNeedSetNewValue) {
            setFormValue(
                dateFieldName,
                getFormattedDate({
                    day: dayFieldValue,
                    month: monthFieldValue,
                    year: DEFAULT_DOB_YEAR
                })
            );
        } else if (isNeedResetValue) {
            setFormValue(dateFieldName, '');
        } else {
            setFormValue(dateFieldName, initialValue);
        }
    }, [
        dayFieldValue,
        monthFieldValue,
        setFormValue,
        dateFieldName,
        initialValue
    ]);

    // Reset the "Day" field if the current value does not exist in the new selected month.
    // The UI changes without it, but not the state of the form.
    useEffect(() => {
        if (
            dayFieldValue !== DEFAULT_DOB_OPTION_VALUE &&
            +dayFieldValue > dayOptionsList.length - 1
        ) {
            setFormValue(dayFieldName, dayOptionsList.length);
        }
    }, [dayFieldName, dayFieldValue, dayOptionsList, setFormValue]);

    return {
        error: errors[dateFieldName],
        dayFieldName,
        monthFieldName,
        dayOptionsList,
        monthOptionsList,
        dayOfBirth,
        monthOfBirth
    };
};
