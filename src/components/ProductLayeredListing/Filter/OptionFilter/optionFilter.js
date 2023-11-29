import { Form } from 'informed';
import React from 'react';

import { filterPropTypes } from '../filterPropTypes';
import OptionList from './optionList';

const OptionFilter = props => {
    return (
        <Form>
            <OptionList {...props} />
        </Form>
    );
};

OptionFilter.propTypes = filterPropTypes;
export default OptionFilter;
