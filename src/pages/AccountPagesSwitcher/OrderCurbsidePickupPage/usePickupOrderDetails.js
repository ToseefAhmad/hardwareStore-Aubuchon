import { useMutation } from '@apollo/client';
import { ORDER_STATUS_CODES } from '@app-constants';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useToasts, useWindowSize } from '@magento/peregrine';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import isObjectEmpty from '@magento/peregrine/lib/util/isObjectEmpty';

import { ORDER_ITEM_STATUS_CODES } from '@app/constants';
import { useBrandContext } from '@app/context/Brand';
import { usePickupStoreContext } from '@app/context/PickupStore';
import { useTailwindContext } from '@app/context/tailwind';
import useSubmitAnimation from '@app/hooks/useSubmitAnimation';
import { useCancelledItemAmount } from '@app/pages/AccountPagesSwitcher/OrderViewPage/useCancelledItemAmount';
import { getStoreOpenCloseData } from '@app/utils/stores';

export const usePickupOrderDetails = ({
    availabilityVars,
    backUrl,
    isOrderInfoDataLoading,
    orderData,
    orderInstructionVars,
    operations: { addOrderInstructionMutation, isOrderAvailableForPickupQuery },
    storeConfig
}) => {
    const history = useHistory();
    const [, { addToast }] = useToasts();
    const [{ schedule, specialDays }] = usePickupStoreContext();
    const [, { getBrandFromList }] = useBrandContext();

    const { innerWidth } = useWindowSize();
    const { screens } = useTailwindContext();
    const isMobile = innerWidth < screens.lg;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [addOrderInstruction] = useMutation(addOrderInstructionMutation, {
        fetchPolicy: 'no-cache'
    });

    const getIsOrderAvailableForPickup = useAwaitQuery(
        isOrderAvailableForPickupQuery
    );

    const submitButtonRef = useRef();
    const { runAnimation } = useSubmitAnimation();

    /**
     * Order information
     */
    const orderInfo = useMemo(() => {
        let value = {};

        if (orderData && storeConfig) {
            const { product_url_suffix } = storeConfig;
            const { name } = getBrandFromList(orderData.pickup_store.brand.uid);
            if (orderData.curbside_customer_arrived_at && !hasBeenSubmitted) {
                setHasBeenSubmitted(true);
            }
            value = {
                ...orderData,
                pickup_store: {
                    ...orderData.pickup_store,
                    name
                },
                product_url_suffix
            };
        }

        return value;
    }, [
        orderData,
        storeConfig,
        getBrandFromList,
        hasBeenSubmitted,
        setHasBeenSubmitted
    ]);

    /**
     * Handler for order navigation back button click
     */
    const handleNavBackButtonClick = useCallback(() => {
        history.push(backUrl);
    }, [backUrl, history]);

    /**
     * Handler for submitting check in form
     */
    const handleCheckInFormSubmit = useCallback(
        async ({ message = '' }) => {
            const { id } = orderInfo;

            if (!id) return;

            setIsSubmitting(true);

            const { isOpen } = getStoreOpenCloseData({ schedule, specialDays });

            if (!isOpen) {
                addToast({
                    type: 'error',
                    message: 'Unfortunately, the selected store is now closed.'
                });

                setIsSubmitting(false);

                return;
            }

            try {
                const {
                    data: {
                        isOrderAvailableForPickup: { is_available }
                    }
                } = await getIsOrderAvailableForPickup({
                    fetchPolicy: 'no-cache',
                    variables: availabilityVars
                });

                if (!is_available) {
                    addToast({
                        type: 'error',
                        message:
                            'Unfortunately, the selected order is not available for pickup.'
                    });

                    setIsSubmitting(false);

                    return;
                }

                await addOrderInstruction({
                    variables: {
                        ...orderInstructionVars,
                        message
                    }
                });

                // setIsSubmitted is needed to show success icon on button, as setHasBeenSubmitted has delay time.
                setIsSubmitted(true);

                if (!isMobile) {
                    setHasBeenSubmitted(true);
                } else {
                    runAnimation(submitButtonRef, () => {
                        setHasBeenSubmitted(true);
                    });
                }
            } catch (e) {
                process.env.NODE_ENV !== 'production' && console.error(e);

                const validationErrorMessage =
                    'We are already handling your order';
                const fallbackErrorMessage =
                    'Something went wrong. Please refresh and try again.';

                addToast({
                    type: 'error',
                    message: e.message.includes(validationErrorMessage)
                        ? validationErrorMessage
                        : fallbackErrorMessage
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        [
            orderInfo,
            schedule,
            specialDays,
            addToast,
            getIsOrderAvailableForPickup,
            availabilityVars,
            addOrderInstruction,
            orderInstructionVars,
            isMobile,
            runAnimation
        ]
    );

    const { canceledItemsPriceAndDiscountValues } = useCancelledItemAmount({
        items: orderInfo?.items
    });

    const orderProducts = useMemo(
        () =>
            (orderInfo?.items || []).filter(
                item =>
                    item.item_status ===
                        ORDER_ITEM_STATUS_CODES.ready_for_pickup &&
                    item.qty_picked > 0
            ),
        [orderInfo]
    );

    const isValid = useMemo(() => {
        if (!orderInfo || isOrderInfoDataLoading) return true;

        const orderValid =
            orderInfo.status_code === ORDER_STATUS_CODES.ready_for_pickup;
        const orderHasValidItems = orderInfo.items?.some(
            item =>
                item.item_status === ORDER_ITEM_STATUS_CODES.ready_for_pickup &&
                item.qty_picked > 0
        );

        return orderValid || orderHasValidItems;
    }, [isOrderInfoDataLoading, orderInfo]);

    /**
     * Method for redirect if order has wrong status
     */
    useEffect(() => {
        if (isObjectEmpty(orderInfo)) return;

        if (!isValid) {
            history.push(backUrl);
        }
    }, [backUrl, history, isValid, orderInfo]);

    return {
        canceledItemsPriceAndDiscountValues,
        orderInfo,
        orderProducts,
        isSubmitting,
        hasBeenSubmitted,
        handleNavBackButtonClick,
        handleCheckInFormSubmit,
        submitButtonRef,
        isSubmitted
    };
};
