export const getOpeningHours = ({ schedule }) => {
    return schedule
        .filter(day => day.status)
        .map(day => {
            return {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    `${day.day[0].toUpperCase()}${day.day
                        .slice(1)
                        .toLowerCase()}`
                ],
                opens: day.open,
                closes: day.close
            };
        });
};

export const getSpecialDays = ({ specialDays }) => {
    return specialDays.map(day => {
        return {
            '@type': 'OpeningHoursSpecification',
            opens: day.time_open,
            closes: day.time_close,
            validFrom: day.date_from,
            validThrough: day.date_to
        };
    });
};

export const getOpeningAndSpecialHours = store => {
    const openingHours = getOpeningHours(store);
    const specialDays = getSpecialDays(store);

    return {
        openingHours,
        specialDays
    };
};
