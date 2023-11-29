import { Form } from 'informed';
import React from 'react';

import { filterPropTypes } from '../filterPropTypes';
import PriceFilter from './priceFilter';
import classes from './priceFilterForm.module.css';

const PriceFilterForm = props => {
    return (
        <Form className={classes.root}>
            <PriceFilter {...props} />
        </Form>
    );
};

PriceFilterForm.propTypes = filterPropTypes;

export default PriceFilterForm;
