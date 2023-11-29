import { func, number, string } from 'prop-types';
import React from 'react';

import Icon from '@app/components/Icon';
import { InfoFilled } from '@app/components/Icons';

import classes from './optionHeader.module.css';

export const BUTTON_LABELS = {
    paint_sheen: 'What is sheen?',
    pant_size: 'How much paint do I need?'
};

const OptionHeader = ({ stepNumber, label, attributeCode, handleOpenInfo }) => {
    return (
        <div className={classes.root}>
            <p className={classes.label}>
                Step {stepNumber}: <b>Select {label}</b>
            </p>
            {attributeCode && (
                <div
                    className={classes.infoText}
                    aria-hidden
                    role="button"
                    onClick={() => handleOpenInfo(attributeCode)}
                >
                    {BUTTON_LABELS[attributeCode]}
                    <Icon src={InfoFilled} />
                </div>
            )}
        </div>
    );
};

OptionHeader.defaultProps = {
    handleOpenInfo: () => {}
};

OptionHeader.propTypes = {
    stepNumber: number,
    label: string,
    handleOpenInfo: func,
    attributeCode: string
};

export default OptionHeader;
