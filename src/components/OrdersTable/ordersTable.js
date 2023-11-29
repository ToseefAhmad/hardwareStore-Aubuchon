import { bool, number } from 'prop-types';
import React, { useMemo } from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Pagination from '@app/components/Pagination';

import OrdersTableHead from './Head';
import classes from './ordersTable.module.css';
import OrdersTableRow from './Row';
import { useOrdersTable } from './useOrdersTable';

const OrdersTable = props => {
    const { pageSize, isShownPagination } = props;

    const {
        tableRef,
        listData,
        currentPage,
        totalPages,
        isLoading,
        handleChangePage
    } = useOrdersTable({ pageSize });

    const loadingRows = useMemo(() => {
        return [...Array(pageSize).keys()].map(key => (
            <Shimmer key={key} classes={{ root_rectangle: classes.shimmer }} />
        ));
    }, [pageSize]);

    return (
        <div className={classes.root} ref={tableRef}>
            <ul className={classes.list}>
                <OrdersTableHead />
                {isLoading ? (
                    <>{loadingRows}</>
                ) : (
                    <>
                        {listData.length ? (
                            listData.map(rowProps => (
                                <OrdersTableRow
                                    {...rowProps}
                                    key={rowProps.id}
                                />
                            ))
                        ) : (
                            <li className={classes.noDataMessage}>
                                You don&apos;t have any orders yet.
                            </li>
                        )}
                    </>
                )}
            </ul>
            {isShownPagination && totalPages > 1 && (
                <Pagination
                    pageControl={{
                        currentPage,
                        totalPages,
                        setPage: handleChangePage
                    }}
                />
            )}
        </div>
    );
};

OrdersTable.propTypes = {
    pageSize: number.isRequired,
    isShownPagination: bool
};

OrdersTable.defaultProps = {
    isShownPagination: true
};

export default OrdersTable;
