import { shape, bool, string } from 'prop-types';
import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Icon from '@app/components/Icon';
import {
    Expand as ExpandIcon,
    Question as QuestionIcon
} from '@app/components/Icons';

import { useWhyDidYouChooseThis } from './useWhyDidYouChooseThis';
import classes from './whyDidYouChooseThis.module.css';

const WhyDidYouChooseThis = ({ storeConfig, sku }) => {
    const {
        comments,
        commentsTotal,
        brandName,
        toggleAreAllCommentsShown,
        areAllCommentsShown,
        areCommentsLoading,
        whyDidYouChooseThisContainerRef
    } = useWhyDidYouChooseThis({ storeConfig, sku });

    const commentControls =
        commentsTotal > 4 ? (
            <button
                className={classes.commentsToggleButton}
                onClick={toggleAreAllCommentsShown}
                type="button"
            >
                <span className={classes.expandIcon}>
                    <Icon src={ExpandIcon} />
                </span>
                <h5>
                    {areAllCommentsShown
                        ? 'Hide Answers'
                        : `See all ${commentsTotal} answers`}
                </h5>
            </button>
        ) : !commentsTotal ? (
            'No Answers'
        ) : (
            'No More Answers'
        );

    return (
        <div
            className={classes.whyDidYouChooseThisContainer}
            ref={whyDidYouChooseThisContainerRef}
        >
            <div className={classes.whyDidYouChooseThisHeader}>
                <span className={classes.whyDidYouChooseThisIcon}>
                    <Icon src={QuestionIcon} />
                </span>
                <div>
                    <h5>Why did you choose this?</h5>
                    <h5 className={classes.whyDidYouChooseThisStoreTitle}>
                        {brandName}
                    </h5>
                </div>
            </div>
            <ul className={classes.whyDidYouChooseThisContent}>
                {comments.map(comment => (
                    <li className={classes.comment} key={comment.id}>
                        <span className={classes.commentDate}>
                            {comment.dateCreatedFormatted}
                        </span>
                        <div className={classes.commentDetails}>
                            <p>{comment.text}</p>
                            <p>{comment.user.nickName}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={classes.whyDidYouChooseThisFooter}>
                {!areCommentsLoading ? (
                    commentControls
                ) : (
                    <Shimmer width="50%" />
                )}
            </div>
        </div>
    );
};

WhyDidYouChooseThis.propTypes = {
    storeConfig: shape({
        turnto_site_key: string.isRequired,
        turnto_review_url: string.isRequired,
        turnto_qa_enabled: bool.isRequired
    }).isRequired,
    sku: string.isRequired
};

export default WhyDidYouChooseThis;
