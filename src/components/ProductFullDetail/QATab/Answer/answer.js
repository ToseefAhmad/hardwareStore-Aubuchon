import classNames from 'classnames';
import { Form } from 'informed';
import { shape, bool, object, string, number } from 'prop-types';
import React from 'react';

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    Heart as HeartIcon,
    HeartFilled as HeartFilledIcon
} from '@app/components/Icons';
import TextArea from '@app/components/TextArea';

import PersonalDataForm from '../PersonalDataForm';
import SuccessMessage from '../SuccessMessage';
import classes from './answer.module.css';
import Reply from './Reply';
import { useAnswer } from './useAnswer';

const Answer = ({ storeConfig, answer, isBestAnswer }) => {
    const {
        isLiked,
        isReplyFormShown,
        isRequestInProgress,
        nickName,
        replies,
        formErrors,
        toggleIsLiked,
        handleOpenReplyForm,
        handleMarkAnswerAsInaccurate,
        handleSubmitReplyText,
        handleCloseReplyForm,
        handlePersonalDataSubmit,
        handleCloseSuccessMessage,
        MODAL_TYPE
    } = useAnswer({
        storeConfig,
        answer
    });

    const rootClassName = classNames(classes.root, {
        [classes.root_bestAnswer]: isBestAnswer
    });
    const answerClassName = classNames(classes.answer, {
        [classes.answer_bestAnswer]: isBestAnswer,
        [classes.answer_regularAnswer]: !isBestAnswer
    });
    const heartIconClassName = classNames(
        classes.icon,
        isLiked ? classes.iconFilled : classes.iconEmpty
    );

    return (
        <div className={rootClassName}>
            <div className={answerClassName}>
                {!isBestAnswer && (
                    <button
                        className={classes.likeButton}
                        type="button"
                        onClick={toggleIsLiked}
                    >
                        <Icon
                            src={isLiked ? HeartFilledIcon : HeartIcon}
                            className={heartIconClassName}
                        />
                    </button>
                )}
                <span className={classes.createDate}>
                    {answer.dateCreatedFormatted}
                </span>
                <div>
                    <p>
                        {isBestAnswer && (
                            <span className={classes.bestAnswer}>
                                Best Answer:{' '}
                            </span>
                        )}
                        {answer.text}
                    </p>
                    <div className={classes.answerDetails}>
                        <div className={classes.userDetails}>
                            <span>{nickName}</span>
                            {answer.purchaseDateFormatted && (
                                <p className={classes.itemWithBeforeElement}>
                                    <span className={classes.purchasedOn}>
                                        Purchased on:
                                    </span>{' '}
                                    {answer.purchaseDateFormatted}
                                </p>
                            )}
                        </div>
                        <div className={classes.answerControls}>
                            <button
                                className={classes.button}
                                type="button"
                                onClick={handleOpenReplyForm}
                            >
                                Reply
                            </button>
                            <button
                                className={classes.buttonWithBeforeElement}
                                type="button"
                                onClick={handleMarkAnswerAsInaccurate}
                            >
                                Inaccurate
                            </button>
                        </div>
                    </div>
                </div>
                {!isBestAnswer && (
                    <PersonalDataForm
                        handleSubmit={handlePersonalDataSubmit}
                        isRequestInProgress={isRequestInProgress}
                        formErrors={formErrors}
                        modalId={answer.id}
                        modalType={MODAL_TYPE}
                    />
                )}
            </div>
            {isReplyFormShown && (
                <Form
                    className={classes.replyForm}
                    onSubmit={handleSubmitReplyText}
                >
                    <TextArea field="replyText" validate={isRequired} />
                    <p>
                        Do not include HTML, links, references to other stores,
                        pricing, or contact info.
                    </p>
                    <div className={classes.replyFormButtonsWrapper}>
                        <Button
                            priority="high"
                            type="submit"
                            isLoading={isRequestInProgress}
                        >
                            Submit
                        </Button>
                        <Button type="button" onPress={handleCloseReplyForm}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            )}
            {replies && (
                <ul className={classes.replies}>
                    {replies.map(reply => (
                        <li key={reply.id}>
                            <Reply reply={reply} />
                        </li>
                    ))}
                </ul>
            )}
            <SuccessMessage
                handleClose={handleCloseSuccessMessage}
                message="Your reply has been submitted successfully"
                modalId={answer.id}
                modalType={MODAL_TYPE}
            />
        </div>
    );
};

Answer.propTypes = {
    storeConfig: object.isRequired,
    isBestAnswer: bool,
    answer: shape({
        id: number.isRequired,
        purchaseDateFormatted: string,
        dateCreatedFormatted: string.isRequired,
        text: string.isRequired,
        user: shape({
            nickName: string,
            firstName: string,
            lastName: string
        })
    })
};

Answer.defaultProps = {
    isBestAnswer: false
};

export default Answer;
