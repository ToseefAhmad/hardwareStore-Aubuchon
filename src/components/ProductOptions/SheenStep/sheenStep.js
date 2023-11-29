import PropTypes, { arrayOf, func, object } from 'prop-types';
import React, { useMemo, useState } from 'react';

import { useOptionsContext } from '@app/components/ProductOptions/optionsContext';

import Tile from '../tile';
import classes from './sheenStep.module.css';

const SheenStep = ({
    getItemKey,
    selectedValue,
    items,
    onSelectionChange,
    optionContainerRef
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { color, product } = useOptionsContext();

    const activeSheens = useMemo(
        () =>
            items.filter(item => {
                const foundVariants = product.variants.find(variant =>
                    variant.attributes.every(attr => {
                        if (attr.code === 'paint_sheen') {
                            return (
                                attr.value_index === item.value_index &&
                                variant.product?.paint_color_multi?.indexOf(
                                    color.linked_value
                                ) >= 0
                            );
                        }
                        return true;
                    })
                );
                return foundVariants !== undefined;
            }),
        [items, color, product]
    );

    const tiles = useMemo(
        () =>
            activeSheens.map(item => {
                const isSelected = item.label === selectedValue.label;

                return (
                    <Tile
                        key={getItemKey(item)}
                        isSelected={isSelected}
                        item={item}
                        onClick={() => onSelectionChange(item.value_index)}
                        optionContainerRef={optionContainerRef}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                );
            }),
        [
            getItemKey,
            selectedValue.label,
            activeSheens,
            onSelectionChange,
            optionContainerRef,
            isOpen,
            setIsOpen
        ]
    );

    return <div className={classes.root}>{tiles}</div>;
};

SheenStep.defaultProps = {
    onSelectionChange: () => {},
    selectedValue: {}
};

SheenStep.propTypes = {
    getItemKey: func,
    selectedValue: object,
    items: arrayOf(object),
    onSelectionChange: func,
    optionContainerRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    })
};

export default SheenStep;
