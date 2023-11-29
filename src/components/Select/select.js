import {
    Option as InformedOption,
    Select as InformedSelect,
    useFieldState,
    useFieldApi
} from 'informed';
import {
    arrayOf,
    node,
    number,
    oneOfType,
    shape,
    string,
    bool,
    func
} from 'prop-types';
import React, { useMemo } from 'react';
import ReactSelect from 'react-select';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';

import { Message } from '@app/components/Field';
import { ChevronDown as ChevronDownIcon } from '@app/components/Icons';
import { useTailwindContext } from '@app/context/tailwind';

import defaultClasses from './select.module.css';

const Select = props => {
    const {
        classes: propClasses,
        field,
        items,
        message,
        isSearchable,
        onChangeInformed,
        onChangeReactSelect,
        placeholder,
        desktopHeight,
        ...rest
    } = props;
    const fieldApi = useFieldApi(field);
    const fieldState = useFieldState(field);
    const { colors } = useTailwindContext();

    const { setValue } = fieldApi;
    const classes = useStyle(defaultClasses, propClasses);
    const inputClass = fieldState.error ? classes.input_error : classes.input;

    const options = useMemo(() => {
        let preparedItems = [];

        if (placeholder) {
            preparedItems.push({
                key: 'placeholder',
                value: '',
                label: placeholder,
                hidden: true
            });
        }

        preparedItems = preparedItems.concat(items);

        return preparedItems.map(
            ({ disabled = null, hidden = null, label, value, key = value }) => (
                <InformedOption
                    key={key}
                    disabled={disabled}
                    hidden={hidden}
                    value={value}
                >
                    {label || (value != null ? value : '')}
                </InformedOption>
            )
        );
    }, [items, placeholder]);

    // The way to apply styles advised by official documentation.
    const customStyles = {
        container: provided => ({
            ...provided,
            pointerEvents: 'auto'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: colors.black.DEFAULT,
            opacity: state.isFocused ? 1 : 0.4,
            transform: state.isFocused ? 'rotate(180deg)' : null,
            ':hover': { opacity: 1 }
        }),
        indicatorSeparator: provided => ({ ...provided, width: '0' }),
        option: (provided, state) => ({
            ...provided,
            padding: '0.8rem 1rem',
            backgroundColor: state.isSelected && null,
            color: state.isSelected && null,
            ':hover': { backgroundColor: colors.gray.lighter }
        }),
        placeholder: provided => ({
            ...provided,
            color: colors.gray.dark
        }),
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused
                ? colors.green.DEFAULT
                : colors.gray.DEFAULT,
            boxShadow: state.isFocused ? colors.green.DEFAULT : null,
            ':hover': {
                borderColor: colors.black.DEFAULT,
                boxShadow: state.isFocused ? colors.black.DEFAULT : null
            },
            height: desktopHeight,
            cursor: state.isDisabled ? 'not-allowed' : 'pointer'
        }),
        valueContainer: provided => ({
            ...provided,

            marginLeft: '1rem'
        }),
        menuList: provided => ({
            ...provided,
            maxHeight: '250px',
            overflowY: 'auto'
        }),
        menu: provided => ({
            ...provided,
            zIndex: 11
        }),
        menuPortal: provided => ({
            ...provided,
            zIndex: 1000
        }),
        singleValue: provided => ({
            ...provided,
            opacity: 1,
            color: colors.gray.dark
        })
    };

    const itemWithNoValue = items.find(({ value }) => value === 'none');

    const handleOnChangeReactSelect = value => {
        if (onChangeReactSelect) {
            onChangeReactSelect(value);
        }

        setValue(value);
    };

    const currentValue = useMemo(() => {
        let field = items ? itemWithNoValue : null;

        if (fieldState?.value) {
            field = items.find(item => item.value === fieldState.value);
        }

        return field;
    }, [fieldState?.value, items, itemWithNoValue]);

    return (
        <div className={classes.root}>
            <div className={classes.selectMobile}>
                <div className={classes.select}>
                    <InformedSelect
                        {...rest}
                        onChange={onChangeInformed}
                        className={inputClass}
                        field={field}
                    >
                        {options}
                    </InformedSelect>
                    <div className={classes.chevron}>
                        <Icon src={ChevronDownIcon} />
                    </div>
                </div>
            </div>
            <div className={classes.selectDesktop}>
                <ReactSelect
                    isDisabled={rest.disabled}
                    isSearchable={isSearchable}
                    options={items}
                    value={currentValue}
                    styles={customStyles}
                    placeholder={placeholder}
                    className={classes.reactSelect}
                    onChange={value => handleOnChangeReactSelect(value.value)}
                    menuPortalTarget={document.querySelector('body')}
                    menuPosition={'fixed'}
                />
            </div>
            <Message fieldState={fieldState}>{message}</Message>
        </div>
    );
};

Select.propTypes = {
    classes: shape({
        root: string,
        select: string,
        input: string,
        input_error: string,
        chevron: string
    }),
    field: string.isRequired,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: string,
            value: oneOfType([number, string])
        })
    ),
    message: node,
    isSearchable: bool,
    onChangeInformed: func,
    onChangeReactSelect: func,
    placeholder: string,
    desktopHeight: string
};

Select.defaultProps = {
    isSearchable: false,
    placeholder: '',
    desktopHeight: '3.375rem'
};

export default Select;
