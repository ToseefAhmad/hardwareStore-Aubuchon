import classnames from 'classnames';
import { func } from 'prop-types';
import React, { Suspense, useCallback, useEffect, useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Close as CloseIcon, Search } from '@app/components/Icons';
import ColorItemsShimmer from '@app/components/ProductOptions/ColorStep/colorItemsShimmer';
import ColorModalShimmer from '@app/components/ProductOptions/ColorStep/colorModalShimmer';
import Item from '@app/components/ProductOptions/ColorStep/item';
import { useColorStep } from '@app/components/ProductOptions/ColorStep/useColorStep';
import OptionHeader from '@app/components/ProductOptions/optionHeader';
import { useOptionsContext } from '@app/components/ProductOptions/optionsContext';
import SimpleModal from '@app/components/SimpleModal';
import TextInput from '@app/components/TextInput';

import classes from './colorStep.module.css';

const ColorStep = ({ setColor }) => {
    const {
        toggleModal,
        modalName,
        searchTerm,
        selectResult,
        setSelectResult,
        isMobile,
        activeOption,
        setActiveOption,
        selectedOption,
        colors,
        handleSearch,
        handleOpenModal,
        handleChooseColor,
        isColorChosen,
        isVirtualize,
        loading
    } = useColorStep({
        setColor
    });
    const { product } = useOptionsContext();

    const itemSize = useMemo(() => (isMobile ? 118 : 97), [isMobile]);

    const getVariantColors = (productData, colorData) => {
        const variantColorSet = new Set();
        productData.variants.forEach(variant => {
            if (variant.product?.paint_color_multi) {
                const variantColors = variant.product.paint_color_multi.split(
                    ','
                );
                variantColors.forEach(variantColor =>
                    variantColorSet.add(parseInt(variantColor))
                );
            }
        });

        return colorData.filter(color =>
            variantColorSet.has(color.linked_value)
        );
    };

    const variantColors = useMemo(() => getVariantColors(product, colors), [
        product,
        colors
    ]);

    const itemInRow = useMemo(() => (isMobile ? 2 : 4), [isMobile]);
    const rowCount = useMemo(() => Math.ceil(selectResult.length / itemInRow), [
        selectResult.length,
        itemInRow
    ]);

    const SearchIcon = (
        <span
            aria-hidden
            role="button"
            className={classes.searchIcon}
            onClick={() => handleSearch(searchTerm)}
        >
            <Icon src={Search} />
        </span>
    );

    const swatches = useMemo(
        () =>
            selectResult.map(item => {
                const isSelected = activeOption?.linked_value
                    ? activeOption.linked_value === item.linked_value
                    : selectedOption?.linked_value === item.linked_value;

                return (
                    <Item
                        key={item.linked_value}
                        setActiveOption={setActiveOption}
                        item={item}
                        isSelected={isSelected}
                    />
                );
            }),
        [
            activeOption?.linked_value,
            selectResult,
            setActiveOption,
            selectedOption?.linked_value
        ]
    );

    useEffect(() => {
        let result;

        if (searchTerm === '' && selectResult.length === variantColors.length)
            return;

        if (searchTerm === '') {
            result = variantColors;
        } else {
            result = variantColors.filter(
                swatch =>
                    swatch?.label
                        ?.toLowerCase()
                        .indexOf(searchTerm?.toLowerCase()) >= 0
            );
        }

        setSelectResult(result);
    }, [selectResult.length, variantColors, searchTerm, setSelectResult]);

    const buttonContent = useMemo(() => {
        return selectedOption?.label ? (
            <span className={classes.selectColor}>
                <span
                    className={classes.swatchColorSmall}
                    style={{
                        backgroundColor: selectedOption?.hex
                    }}
                />
                <span>{selectedOption?.label}</span>
            </span>
        ) : (
            'Select Color'
        );
    }, [selectedOption?.label, selectedOption?.hex]);

    const fixedListRow = useCallback(
        rowIndex => {
            const rowItems = selectResult.slice(
                rowIndex * itemInRow,
                rowIndex * itemInRow + itemInRow
            );

            return rowItems.map(item => {
                const isSelected = activeOption?.linked_value
                    ? activeOption.linked_value === item.linked_value
                    : selectedOption.linked_value === item.linked_value;

                return (
                    <Item
                        key={item.linked_value}
                        setActiveOption={setActiveOption}
                        item={item}
                        isSelected={isSelected}
                    />
                );
            });
        },
        [
            itemInRow,
            activeOption.linked_value,
            selectResult,
            selectedOption.linked_value,
            setActiveOption
        ]
    );

    return (
        <>
            <OptionHeader stepNumber={1} label="color" />
            <div>
                <Button
                    onPress={handleOpenModal}
                    classes={{
                        secondary: classes.secondary
                    }}
                >
                    {buttonContent}
                </Button>
                <SimpleModal
                    className={classes.modalContainer}
                    modalName={modalName}
                >
                    <Suspense fallback={<ColorModalShimmer />}>
                        <>
                            <div className={classes.header}>
                                <p className={classes.headerTitle}>
                                    Select color
                                </p>
                                <Button
                                    onPress={toggleModal}
                                    className={classes.closeButton}
                                >
                                    <Icon src={CloseIcon} />
                                </Button>
                            </div>
                            {!isMobile && <div className={classes.grayLine} />}
                            <div className={classes.content}>
                                <TextInput
                                    icon={SearchIcon}
                                    placeholder={
                                        'Search by color name or number'
                                    }
                                    classes={{
                                        input: classes.searchInput,
                                        root: classes.searchRoot,
                                        icon: classes.icon
                                    }}
                                    field="search_query"
                                    onValueChange={value =>
                                        handleSearch(value || '')
                                    }
                                />
                                {loading ? (
                                    <ColorItemsShimmer />
                                ) : (
                                    <div
                                        className={classnames(classes.list, {
                                            [classes.fullHeight]: isVirtualize
                                        })}
                                    >
                                        {isVirtualize ? (
                                            <AutoSizer>
                                                {({ height, width }) => (
                                                    <FixedSizeList
                                                        height={height}
                                                        itemCount={rowCount}
                                                        itemSize={itemSize}
                                                        width={width}
                                                    >
                                                        {({ index, style }) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    style={
                                                                        style
                                                                    }
                                                                    className={
                                                                        classes.item
                                                                    }
                                                                >
                                                                    {fixedListRow(
                                                                        index
                                                                    )}
                                                                </div>
                                                            );
                                                        }}
                                                    </FixedSizeList>
                                                )}
                                            </AutoSizer>
                                        ) : (
                                            swatches
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={classes.footer}>
                                <Button
                                    priority="high"
                                    disabled={!isColorChosen}
                                    onPress={handleChooseColor}
                                >
                                    Choose Color
                                </Button>
                            </div>
                        </>
                    </Suspense>
                </SimpleModal>
            </div>
        </>
    );
};

ColorStep.defaultProps = {
    setColor: () => {}
};

ColorStep.propTypes = {
    setColor: func
};

export default ColorStep;
