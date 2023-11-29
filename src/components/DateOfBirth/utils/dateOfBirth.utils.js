import { v4 as uuidv4 } from 'uuid';

export const getDateObjectValue = ({ dateValue, defaultFieldValue = null }) => {
    const result = {
        day: defaultFieldValue,
        month: defaultFieldValue,
        year: defaultFieldValue
    };

    if (dateValue) {
        const date = new Date(dateValue);

        result.day = date.getDate();
        result.month = date.getMonth() + 1;
        result.year = date.getFullYear();
    }

    return result;
};

export const getDateStringValue = ({ day, month, year }) => {
    if (!day || !month || !year) {
        return '';
    }

    return new Date(year, month - 1, day).toLocaleDateString('en');
};

export const getFormattedDate = ({ day, month, year }) => {
    if (!day || !month || !year) {
        return '';
    }
    const date = new Date(year, month - 1, day);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getMonthString = month => {
    const date = new Date();
    date.setMonth(month - 1);

    return date.toLocaleString('en-US', {
        month: 'long'
    });
};

export const getMonthList = () => {
    return Array.from({ length: 12 }, (_, idx) => {
        const monthName = new Date(null, idx + 1, null).toLocaleDateString(
            'en',
            {
                month: 'long'
            }
        );

        return {
            key: uuidv4(),
            label: monthName,
            value: idx + 1
        };
    });
};

export const getDaysList = ({ year, month }) => {
    const daysLength = new Date(
        +year || new Date().getFullYear(),
        +month || 1,
        0
    ).getDate();

    return Array.from({ length: daysLength }, (_, idx) => ({
        key: uuidv4(),
        label: `${idx + 1}`,
        value: idx + 1
    }));
};
