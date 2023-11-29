export const getSizeStepProductVariant = (
    item,
    variants,
    optionSelectionsArray,
    color
) => {
    return variants.find(variant =>
        variant.attributes.every(
            attr =>
                (attr.value_index === item.value_index ||
                    optionSelectionsArray.includes(attr.value_index)) &&
                variant.product?.paint_color_multi?.indexOf(
                    color?.linked_value
                ) >= 0
        )
    );
};
