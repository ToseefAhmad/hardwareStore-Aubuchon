import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import minMax from 'dayjs/plugin/minMax';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const setupDayJs = () => {
    dayjs.extend(objectSupport);
    dayjs.extend(isBetween);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(minMax);
};
