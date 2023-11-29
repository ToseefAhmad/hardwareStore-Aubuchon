import { checkPropTypes } from "prop-types";

/***
 * Usage:
 * MyComponent.propTypes = {
 *     customMapProp = mapOf(string, number),
 *     customRequiredMapProp = mapOf(string, shape({ foo: string })).isRequired,
 * }
 *
 * @param keyType
 * @param valueType
 * @return {(function(*, *, *): (null|Error|undefined))|*}
 */
function mapOf(keyType, valueType) {
    function validate(props, propName, componentName) {
        if (!props[propName]) {
            return null;
        }

        if (!(props[propName] instanceof Map)) {
            return new Error(`Prop "${propName}" must be a Map for component "${componentName}`);
        }

        props[propName].forEach((value, key) => {
            checkPropTypes({
                key: keyType,
                value: valueType
            }, {
                key,
                value
            }, 'prop', `${componentName}.${propName}`)
        });
    }

    Object.defineProperty(validate, 'isRequired', {
        value: (props, propName, componentName) => {
            if (!(propName in props)) {
                return new Error(`Prop "${propName}" is required for component "${componentName}`);
            }

            return validate(props, propName, componentName);
        }
    });

    return validate;
}

export default mapOf;
