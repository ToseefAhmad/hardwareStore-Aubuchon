import classnames from 'classnames';
import { number } from 'prop-types';
import React, { useRef } from 'react';

import LinkButton from '@app/components/LinkButton';
import RichContent from '@app/components/RichContent';

import classes from './bonusRewards.module.css';
import { useBonusRewards } from './useBonusRewards';

const BonusRewards = props => {
    const { grandTotal } = props;
    const richContentRef = useRef(null);

    const {
        bonusReward,
        description,
        isEnabled,
        needToSpend,
        progressPercentage,
        handleExpand,
        handleClick,
        isContentVisible,
        isSignedIn,
        isNeedToSpendZero
    } = useBonusRewards(grandTotal);

    if (!isEnabled) {
        return null;
    }

    return (
        <div
            onClick={handleClick}
            aria-hidden
            role="button"
            className={classes.root}
        >
            <div className={classes.borderLine} />
            <div className={classes.mainTitle}>
                <span>
                    {!isNeedToSpendZero ? (
                        <>
                            <span className={classes.needToSpend}>
                                ${needToSpend}
                            </span>{' '}
                            away from earning&nbsp;a&nbsp;
                            <span className={classes.bonusRewards}>
                                ${bonusReward}&nbsp;reward
                            </span>
                        </>
                    ) : (
                        <span>
                            Your order qualifies for&nbsp;a&nbsp;
                            <span className={classes.bonusRewards}>
                                ${bonusReward}&nbsp;reward
                            </span>
                        </span>
                    )}
                </span>
                <LinkButton
                    onPress={handleExpand}
                    classes={{
                        rootSecondary: classes.linkBtn
                    }}
                >
                    {isContentVisible ? (
                        <span>Show&nbsp;less</span>
                    ) : (
                        <span>Show&nbsp;more</span>
                    )}
                </LinkButton>
            </div>
            <div className={classes.progressBar}>
                <div
                    className={classes.progression}
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
            {isContentVisible && (
                <div
                    ref={richContentRef}
                    className={classnames(classes.description, {
                        [classes.isSignedIn]: isSignedIn
                    })}
                >
                    <RichContent html={description} />
                </div>
            )}
        </div>
    );
};

BonusRewards.propTypes = {
    grandTotal: number
};

export default BonusRewards;
