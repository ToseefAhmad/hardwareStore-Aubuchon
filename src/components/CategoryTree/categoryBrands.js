import { Form } from 'informed';
import { bool, func, number, shape, string } from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

import { useStyle } from '@magento/venia-ui/lib/classify';

import Select from '@app/components/Select';

import Branch from './categoryBranch';
import CategoryBrandsShimmer from './categoryBrand.shimmer';
import defaultClasses from './categoryBrands.module.css';
import Leaf from './categoryLeaf';
import { useCategoryBrands } from './useCategoryBrands';

const alphabet = ['all', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const keys = alphabet.map(key => {
    if (key === 'all') {
        return {
            key: 'all',
            value: 'all',
            label: 'All Brands'
        };
    }

    return {
        key: key,
        value: key,
        label: key
    };
});

const itemSize = {
    mobile: 61,
    desktop: 71
};

const CategoryBrands = ({
    categoryId,
    categoryLength,
    classes: propsClasses,
    index,
    isRootVisible,
    onNavigate,
    setCategoryId
}) => {
    const {
        childCategories,
        loading,
        categoryUrlSuffix,
        isMobile
    } = useCategoryBrands({
        categoryId
    });

    const classes = useStyle(defaultClasses, propsClasses);
    const rootClass = isRootVisible
        ? classes.rootRight
        : index < categoryLength - 1
        ? classes.rootLeft
        : classes.root;

    const [searchTerm, setSearchTerm] = useState('');
    const [selectResult, setSelectResults] = useState([]);

    const handleChangeInformed = e => {
        setSearchTerm(e.target.value);
    };

    const handleChangeReactSelect = value => {
        setSearchTerm(value);
    };

    useEffect(() => {
        let result;
        const values = childCategories.length ? childCategories : [];

        if (searchTerm === 'all') {
            result = values;
        } else {
            result = values.filter(
                value => value?.name?.charAt(0).toUpperCase() === searchTerm
            );
        }

        setSelectResults(result);
    }, [searchTerm, childCategories, setSelectResults]);

    selectResult.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    return (
        <div className={rootClass}>
            {loading || !childCategories.length ? (
                <CategoryBrandsShimmer />
            ) : (
                <Fragment>
                    <Form className={classes.select}>
                        <Select
                            field="dropdownBrands"
                            items={keys}
                            onChangeInformed={handleChangeInformed}
                            onChangeReactSelect={handleChangeReactSelect}
                            placeholder="Jump to a Letter"
                            isSearchable={true}
                        />
                    </Form>
                    <div>
                        <AutoSizer>
                            {({ height, width }) => (
                                <FixedSizeList
                                    height={height}
                                    itemCount={selectResult.length}
                                    itemSize={
                                        isMobile
                                            ? itemSize.mobile
                                            : itemSize.desktop
                                    }
                                    width={width}
                                >
                                    {({ index, style }) => {
                                        const category = selectResult[index];
                                        const isLeaf = !parseInt(
                                            category.children_count
                                        );

                                        const item = isLeaf ? (
                                            <Leaf
                                                key={category.uid}
                                                category={category}
                                                onNavigate={onNavigate}
                                                categoryUrlSuffix={
                                                    categoryUrlSuffix
                                                }
                                                classes={{ root: classes.item }}
                                                style={style}
                                                isListElement={false}
                                            />
                                        ) : (
                                            <Branch
                                                key={category.uid}
                                                category={category}
                                                setCategoryId={setCategoryId}
                                                classes={{ root: classes.item }}
                                                style={style}
                                                isListElement={false}
                                            />
                                        );

                                        return <div style={style}>{item}</div>;
                                    }}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

CategoryBrands.propTypes = {
    categoryId: string,
    categoryLength: number,
    classes: shape({
        item: string,
        root: string,
        rootLeft: string,
        rootRight: string,
        select: string
    }),
    index: number,
    isRootVisible: bool,
    onNavigate: func.isRequired,
    setCategoryId: func.isRequired
};

export default CategoryBrands;
