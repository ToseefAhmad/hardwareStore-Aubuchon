import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useState, useMemo, useRef, useCallback } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useBrandContext } from '@app/context/Brand';
import { useTailwindContext } from '@app/context/tailwind';
import { smoothScroll } from '@app/utils/smooth-scroll';

import OrdersTableOperations from './ordersTable.gql';

/**
 * Orders Table component talon
 *
 * @param {number} pageSize
 */
export const useOrdersTable = ({ pageSize }) => {
    const {
        queries: { getOrdersListQuery }
    } = OrdersTableOperations;

    const [, { getBrandFromList }] = useBrandContext();
    const tailwind = useTailwindContext();

    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const tableRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { data, loading } = useQuery(getOrdersListQuery, {
        fetchPolicy: 'network-only',
        variables: {
            currentPage,
            pageSize
        },
        onCompleted(data) {
            const {
                customer: { orders }
            } = data;

            setTotalPages(orders.page_info.total_pages);
        }
    });

    const listData = useMemo(() => {
        let value = [];

        if (data) {
            const {
                customer: { orders }
            } = data;

            value = orders.items.map(item => {
                const {
                    id,
                    status,
                    pickup_store,
                    shipping_address,
                    number: orderNumber,
                    order_date,
                    total
                } = item;
                const brand = getBrandFromList(pickup_store.brand.uid);

                return {
                    id,
                    status,
                    brand: {
                        title: brand.name,
                        logoUrl: brand.logo
                    },
                    shippingAddress: shipping_address.lastname,
                    orderNumber,
                    orderDate: dayjs(order_date).format('MM/DD/YYYY'),
                    total: total.grand_total.value
                };
            });
        }

        return value;
    }, [data, getBrandFromList]);

    const handleChangePage = useCallback(
        page => {
            setCurrentPage(page);
            isMobile &&
                smoothScroll({
                    to: { y: tableRef.current.offsetTop - 80 },
                    duration: 750
                });
        },
        [isMobile]
    );

    return {
        tableRef,
        listData,
        currentPage,
        totalPages,
        isLoading: loading,
        isMobile,
        handleChangePage
    };
};
