import classNames from 'classnames';
import { Form } from 'informed';
import { number, shape, string } from 'prop-types';
import React from 'react';

import { isRequired } from '@magento/venia-ui/lib/util/formValidators';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    Triangle as TriangleIcon,
    TriangleFilled as TriangleFilledIcon,
    Edit as EditIcon,
    Expand as ExpandIcon,
    HeartFilled as HeartFilledIcon
} from '@app/components/Icons';
import TextArea from '@app/components/TextArea';

import Answer from '../Answer';
import PersonalDataForm from '../PersonalDataForm';
import SuccessMessage from '../SuccessMessage';
import classes from './question.module.css';
import { useQuestion } from './useQuestion';

const Question = ({ storeConfig, question }) => {
    const {
        isUpVoted,
        answers,
        bestAnswer,
        areAllAnswersShown,
        isAnswerFormShown,
        isRequestInProgress,
        formErrors,
        toggleIsUpVoted,
        toggleAreAllAnswersShown,
        handleOpenAnswerForm,
        handleSubmitAnswer,
        handleCloseAnswerForm,
        handlePersonalDataSubmit,
        handleCloseSuccessMessage,
        MODAL_TYPE
    } = useQuestion({
        storeConfig,
        question
    });

    const allAnswersClassName = classNames(classes.allAnswers, {
        [classes.allAnswersHidden]: !areAllAnswersShown
    });
    const bestAnswerClassName = classNames(classes.bestAnswer, {
        [classes.bestAnswerHidden]: areAllAnswersShown
    });
    const upVoteIconClassName = classNames(
        classes.icon,
        isUpVoted ? classes.iconFilled : classes.iconEmpty
    );

    return (
        <li className={classes.root}>
            <div className={classes.questionHeader}>
                <button
                    className={classes.upVote}
                    type="button"
                    onClick={toggleIsUpVoted}
                >
                    <span className={upVoteIconClassName}>
                        <Icon
                            src={isUpVoted ? TriangleFilledIcon : TriangleIcon}
                        />
                    </span>
                    <span className={classes.upVotesCount}>
                        {isUpVoted ? question.upVotes + 1 : question.upVotes}
                    </span>
                </button>
                <div className={classes.headerDetails}>
                    <span className={classes.createDate}>
                        {question.dateCreatedFormatted}
                    </span>
                    <div>
                        <h5>{question.text}</h5>
                        <p>{question.user?.nickName || 'A shopper'}</p>
                    </div>
                </div>
            </div>
            {bestAnswer && (
                <div className={bestAnswerClassName}>
                    <Answer
                        answer={bestAnswer}
                        storeConfig={storeConfig}
                        isBestAnswer={true}
                    />
                </div>
            )}
            <div className={classes.answerControls}>
                {answers.length > 1 && (
                    <button
                        className={classes.toggleAnswersButton}
                        onClick={toggleAreAllAnswersShown}
                        type="button"
                    >
                        <span className={classes.expandIcon}>
                            <Icon src={ExpandIcon} />
                        </span>
                        <h5>
                            {areAllAnswersShown
                                ? 'Hide Answers'
                                : `See ${answers.length} answers`}
                        </h5>
                    </button>
                )}
                <button
                    className={classes.toggleButton}
                    onClick={handleOpenAnswerForm}
                    type="button"
                >
                    <span className={classes.expandIcon}>
                        <Icon src={EditIcon} />
                    </span>
                    <h5>Answer</h5>
                </button>
            </div>
            {isAnswerFormShown && (
                <Form
                    onSubmit={handleSubmitAnswer}
                    className={classes.answerForm}
                >
                    <TextArea field="answerText" validate={isRequired} />
                    <p>
                        Do not include HTML, links, references to other stores,
                        pricing, or contact info.
                    </p>
                    <div className={classes.answerFormButtonsWrapper}>
                        <Button
                            priority="high"
                            type="submit"
                            isLoading={isRequestInProgress}
                        >
                            Submit
                        </Button>
                        <Button type="button" onClick={handleCloseAnswerForm}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            )}
            <div className={allAnswersClassName}>
                <ul className={classes.answerList}>
                    {answers.map(answer => (
                        <li className={classes.answerListItem} key={answer.id}>
                            <Answer answer={answer} storeConfig={storeConfig} />
                        </li>
                    ))}
                </ul>
                <div className={classes.voteForAnswerWrapper}>
                    <span className={classes.iconFilled}>
                        <Icon src={HeartFilledIcon} />
                    </span>
                    <p className={classes.voteForAnswerText}>
                        Vote for the best answer above!
                    </p>
                </div>
            </div>
            <PersonalDataForm
                handleSubmit={handlePersonalDataSubmit}
                isRequestInProgress={isRequestInProgress}
                formErrors={formErrors}
                modalId={question.id}
                modalType={MODAL_TYPE}
            />
            <SuccessMessage
                handleClose={handleCloseSuccessMessage}
                message="Your answer has been submitted successfully"
                modalId={question.id}
                modalType={MODAL_TYPE}
            />
        </li>
    );
};

Question.propTypes = {
    storeConfig: shape({
        turnto_site_key: string.isRequired,
        turnto_review_url: string.isRequired
    }).isRequired,
    question: shape({
        upVotes: number.isRequired,
        dateCreatedFormatted: string.isRequired,
        text: string.isRequired,
        user: shape({
            nickName: string
        })
    }).isRequired
};

export default Question;
