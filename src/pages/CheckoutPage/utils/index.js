export const serializeShippingMethod = ({ carrier_code, method_code }) =>
    `${carrier_code}|${method_code}`;

export const deserializeShippingMethod = serializedValue =>
    serializedValue.split('|');
