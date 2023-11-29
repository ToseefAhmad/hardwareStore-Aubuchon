import classnames from 'classnames';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React, { lazy, Suspense } from 'react';

import classes from './addressesTable.module.css';
import AddressesTableHead from './Head';
import AddressesTableRow from './Row';
import { useAddressesTable } from './useAddressesTable';

const Pagination = lazy(() => import('@app/components/Pagination'));

const AddressesTable = props => {
    const { data, onRemove, disabled } = props;
    const {
        scrollAnchor,
        pageData,
        currentPage,
        totalPages,
        handleChangePage
    } = useAddressesTable({ data });

    return (
        <section
            ref={scrollAnchor}
            className={classnames(classes.root, {
                [classes.disabled]: disabled
            })}
        >
            <ul className={classes.table}>
                <AddressesTableHead />
                {pageData.map(rowData => (
                    <AddressesTableRow
                        key={rowData.id}
                        data={rowData}
                        onRemove={onRemove}
                    />
                ))}
            </ul>
            {totalPages > 1 && (
                <footer className={classes.footer}>
                    <Suspense fallback={null}>
                        <Pagination
                            classes={{
                                root: classes.paginationRoot
                            }}
                            pageControl={{
                                totalPages,
                                currentPage,
                                setPage: handleChangePage
                            }}
                        />
                    </Suspense>
                </footer>
            )}
        </section>
    );
};

AddressesTable.propTypes = {
    data: arrayOf(
        shape({
            id: number.isRequired,
            firstname: string.isRequired,
            lastname: string.isRequired,
            street: string.isRequired,
            city: string.isRequired,
            region: string.isRequired,
            postcode: string.isRequired,
            country: string.isRequired,
            telephone: string.isRequired
        })
    ),
    onRemove: func.isRequired,
    disabled: bool
};

AddressesTable.defaultProps = {
    data: [],
    disabled: false
};

export default AddressesTable;
