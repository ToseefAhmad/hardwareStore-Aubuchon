import { checkPropTypes } from "prop-types";

/**
 * Usage:
 * MyComponent.propTypes = {
 *     customSetProp = setOf(number),
 *     customRequiredSetProp = setOf(string).isRequired,
 * }
 *
 * @param valueType
 * @return {(function(*, *, *): (null|Error|undefined))|*}
 */
function setOf(valueType) {
    function validate(props, propName, componentName) {
        if (!props[propName]) {
            return null;
        }

        if (!(props[propName] instanceof Set)) {
            return new Error(`Prop "${propName}" must be a Set for component "${componentName}`);
        }

        props[propName].forEach((value) => {
            checkPropTypes({
                value: valueType
            }, {
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

export default setOf;
