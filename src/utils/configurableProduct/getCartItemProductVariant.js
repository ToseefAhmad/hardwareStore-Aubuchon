import { getSizeStepProductVariant } from './getSizeStepProductVariant';

export const getCartItemProductVariant = ({
    color: colorProp,
    paintColors,
    configurable_options,
    customizable_options,
    product
}) => {
    if (!configurable_options || !customizable_options || !product) return;
    const color =
        colorProp ??
        paintColors.find(
            color => color.hex === customizable_options[0].values[1]?.value
        );

    const paintSheenUid = configurable_options.find(
        ({ option_label }) => option_label === 'Sheen'
    ).configurable_product_option_value_uid;
    const paintSheenIndex = product.configurable_options
        .find(({ attribute_code }) => attribute_code === 'paint_sheen')
        ?.values.find(({ uid }) => uid === paintSheenUid)?.value_index;

    const items = product.configurable_options.find(
        ({ attribute_code }) => attribute_code === 'pant_size'
    )?.values;
    const sizeVariants = items.map(item => {
        return getSizeStepProductVariant(
            item,
            product.variants,
            [paintSheenIndex],
            color
        );
    });
    const paintSizeUid = configurable_options.find(
        ({ option_label }) => option_label === 'Size'
    ).configurable_product_option_value_uid;

    return sizeVariants.find(
        variant =>
            variant &&
            variant.attributes.find(({ uid }) => uid === paintSizeUid)
    );
};
