import classnames from 'classnames';
import { number, string, func, bool } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Cup } from '@app/components/Icons';

import classes from './card.module.css';

const Card = ({
    amount,
    expires,
    id,
    onApply,
    onCancel,
    isHidden,
    isLoading,
    isDisabled
}) => {
    const isApplied = !expires;

    return (
        <div
            className={classnames(classes.root, {
                [classes.hidden]: isHidden
            })}
        >
            <div className={classes.info}>
                <span className={classes.icon}>
                    <Icon src={Cup} />
                </span>
                <div>
                    <strong className={classes.strong}>
                        <span className={classes.money}>${amount}</span>{' '}
                        <span className={classes.title}>Reward</span>
                    </strong>
                    {!isApplied && <p>Expires {expires}</p>}
                </div>
            </div>
            <Button
                priority="low"
                onPress={isApplied ? () => onCancel(id) : () => onApply(id)}
                type="button"
                isShort={true}
                isLoading={isLoading}
                disabled={isDisabled}
                classes={{
                    secondary: classnames(classes.secondary)
                }}
            >
                {isApplied ? 'Applied' : 'Apply'}
            </Button>
        </div>
    );
};

Card.defaultProps = {
    onApply: () => {},
    onCancel: () => {},
    isLoading: false,
    isDisabled: false
};

Card.propTypes = {
    amount: number.isRequired,
    expires: string,
    id: string.isRequired,
    onApply: func,
    onCancel: func,
    isHidden: bool,
    isLoading: bool,
    isDisabled: bool
};

export default Card;
