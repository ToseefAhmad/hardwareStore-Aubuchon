import { TextArea as InformedTextArea } from 'informed';
import { number, node, oneOf, oneOfType, shape, string } from 'prop-types';
import React from 'react';

import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { Message } from '@app/components/Field';

import defaultClasses from './textArea.module.css';

const TextArea = props => {
    const { classes: propClasses, field, message, ...rest } = props;
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);

    return (
        <div className={classes.root}>
            <InformedTextArea
                {...rest}
                className={classes.input}
                field={field}
            />
            <Message fieldState={fieldState}>{message}</Message>
        </div>
    );
};

TextArea.propTypes = {
    classes: shape({
        root: string,
        input: string
    }),
    cols: oneOfType([number, string]),
    field: string.isRequired,
    message: node,
    rows: oneOfType([number, string]),
    wrap: oneOf(['hard', 'soft'])
};

TextArea.defaultProps = {
    cols: 40,
    rows: 4,
    wrap: 'hard'
};

export default TextArea;
