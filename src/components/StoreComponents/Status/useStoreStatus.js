import { useMemo } from 'react';
import { useIntl } from 'react-intl';

/**
 * @param {boolean} isOpen
 * @param {object} storeWorkInfo
 * @param {boolean} isHyphen
 */
export const useStoreStatus = ({ isOpen, isHyphen, storeWorkInfo }) => {
    const { formatMessage } = useIntl();
    const hyphen = isHyphen ? '-' : '';
    const {
        specialDayComment,
        timeToOpen,
        timeToClose,
        isSundayClosed
    } = storeWorkInfo;
    const sundayStatus = isSundayClosed && 'Sundays';

    const statusText = useMemo(
        () =>
            isOpen
                ? formatMessage({
                      id: 'global.storeOpen',
                      defaultMessage: 'Open'
                  })
                : formatMessage({
                      id: 'global.storeClosed',
                      defaultMessage: 'Closed'
                  }),
        [isOpen, formatMessage]
    );
    const workHours = useMemo(
        () =>
            `${hyphen} ${formatMessage({
                id: 'global.until',
                defaultMessage: 'until'
            })} ${isOpen ? timeToClose : timeToOpen}`,
        [hyphen, formatMessage, isOpen, timeToClose, timeToOpen]
    );

    const showWorkHours = (timeToOpen || timeToClose) && workHours;

    const storeStatus =
        specialDayComment || sundayStatus || showWorkHours || '';

    return {
        statusText,
        storeStatus
    };
};
