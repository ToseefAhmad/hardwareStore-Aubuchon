import { Form } from 'informed';
import { shape, bool, string } from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Button from '@app/components/Button';
import Pagination from '@app/components/Pagination';
import Select from '@app/components/Select';
import { qaSortByOptions } from '@app/utils/TurnTo';

import PersonalDataForm from './PersonalDataForm';
import classes from './qaTab.module.css';
import Question from './Question';
import QuestionField from './QuestionField';
import SearchResult from './SearchResult';
import SuccessMessage from './SuccessMessage';
import { useQATab } from './useQATab';
import WhyDidYouChooseThis from './WhyDidYouChooseThis';

const QATab = ({ productDetails, storeConfig, isMobile }) => {
    const { formatMessage } = useIntl();
    const {
        totalQuestionCount,
        questions,
        turnToQuestionsData,
        searchQuery,
        currentQuestionsPage,
        questionsListRef,
        totalQuestionsPages,
        areQuestionsLoading,
        areTipsExpanded,
        isQuestionSubmitInitiated,
        isRequestInProgress,
        formErrors,
        toggleTipsExpanded,
        handleSortChange,
        handleReactSelectSortChange,
        handleQuestionInputChange,
        handleQuestionsPageChange,
        handleInitiateQuestionSubmit,
        handleQuestionSubmit,
        handlePersonalDataSubmit,
        handleCancelQuestionSubmit,
        handleClosePersonalDataForm,
        handleCloseSuccessMessage
    } = useQATab({ storeConfig, sku: productDetails.sku, isMobile });

    const sortSelectItems = [
        {
            key: 'recent',
            value: qaSortByOptions.RECENT,
            label: 'Most Recent Questions'
        },
        {
            key: 'oldest',
            value: qaSortByOptions.OLDEST,
            label: 'Oldest Questions'
        },
        {
            key: 'best',
            value: qaSortByOptions.BEST,
            label: 'Most Common'
        },
        {
            key: 'mostAnswers',
            value: qaSortByOptions.MOST_ANSWERS,
            label: 'Most Answers'
        },
        {
            key: 'leastAnswers',
            value: qaSortByOptions.LEAST_ANSWERS,
            label: 'Fewest Answers'
        },
        {
            key: 'mostRecentAnswers',
            value: qaSortByOptions.MOST_RECENT_ANSWER,
            label: 'Most Recent Answer'
        },
        {
            key: 'oldestAnswer',
            value: qaSortByOptions.OLDEST_ANSWER,
            label: 'Oldest Answer'
        }
    ];

    const tips = (
        <div className={classes.tips}>
            <div className={classes.tipsListsWrapper}>
                <div>
                    <h5>Instant Answers</h5>
                    <ol className={classes.tipsOrderedList}>
                        <li>
                            Start typing and we&rsquo;ll see if it was already
                            asked and answered.
                        </li>
                        <li>
                            If there aren&rsquo;t already some matches, submit a
                            new question.
                        </li>
                        <li>
                            You&rsquo;ll get fast answers from customers who
                            really own the item(s) and from our product experts.
                            (About half the time you&rsquo;ll get an answer in
                            under 2 hours!)
                        </li>
                    </ol>
                </div>
                <div>
                    <h5>Good Topics To Ask About</h5>
                    <ul className={classes.tipsUnorderedList}>
                        <li>Which items will best meet your needs</li>
                        <li>What customers who own an item think of it</li>
                        <li>How to use, fix, or take care of an item</li>
                        <li>Product information</li>
                        <li>
                            General advice related to the types of products we
                            sell
                        </li>
                        <li>Our store policies</li>
                    </ul>
                </div>
            </div>
            <div className={classes.customerSupport}>
                <h5>Customer Support</h5>
                <p>
                    For questions about an order you have placed, please contact
                    customer support directly.
                </p>
            </div>
        </div>
    );

    const questionsList = (
        <>
            <ul ref={questionsListRef}>
                {!areQuestionsLoading ? (
                    questions.map(question => (
                        <Question
                            key={question.id}
                            storeConfig={storeConfig}
                            question={question}
                        />
                    ))
                ) : (
                    <Shimmer width="100%" height={isMobile ? 98.625 : 83.25} />
                )}
            </ul>
            <Pagination
                classes={{ root: classes.paginationRoot }}
                pageControl={{
                    currentPage: currentQuestionsPage,
                    setPage: handleQuestionsPageChange,
                    totalPages: totalQuestionsPages
                }}
                isVirtual={true}
            />
        </>
    );

    return (
        <>
            <Form
                className={classes.questionForm}
                onSubmit={handleQuestionSubmit}
            >
                <QuestionField
                    handleInputChange={handleQuestionInputChange}
                    searchQuery={searchQuery}
                />
                <p className={classes.searchNotice}>
                    {!isQuestionSubmitInitiated ? (
                        <>
                            Start typing and see existing answers.
                            {!searchQuery && (
                                <>
                                    {' '}
                                    <span>
                                        <button
                                            className={classes.tipsButton}
                                            type="button"
                                            onClick={toggleTipsExpanded}
                                        >
                                            {areTipsExpanded
                                                ? 'Hide Tips'
                                                : 'Learn more'}
                                        </button>
                                    </span>
                                </>
                            )}
                        </>
                    ) : (
                        'Your question may be sent to fellow customers so ask as if you were asking a friend. Do not include HTML, links, references to other brands, pricing or contact info.'
                    )}
                </p>
                {areTipsExpanded && !searchQuery && tips}
                {!!searchQuery &&
                    (!isQuestionSubmitInitiated ? (
                        <SearchResult
                            storeConfig={storeConfig}
                            turnToQuestionsData={turnToQuestionsData}
                            searchQuery={searchQuery}
                            handleInitiateQuestionSubmit={
                                handleInitiateQuestionSubmit
                            }
                            isMobile={isMobile}
                            productSmallImage={productDetails.smallImage}
                        />
                    ) : (
                        <div className={classes.twoButtonsWrapper}>
                            <Button
                                priority="high"
                                type="submit"
                                isLoading={isRequestInProgress}
                            >
                                Submit New Question
                            </Button>
                            <Button
                                type="button"
                                onClick={handleCancelQuestionSubmit}
                            >
                                Cancel
                            </Button>
                        </div>
                    ))}
            </Form>
            <div className={classes.sortSelectWrapper}>
                <div className={classes.questionsCount}>
                    {questions && totalQuestionCount ? (
                        <>
                            {formatMessage(
                                {
                                    id: 'qaTab.questionsCount',
                                    defaultMessage: `{count, plural,
                                        =0 {0 questions}
                                        =1 {1 question}
                                    other {# questions}}`
                                },
                                {
                                    count: totalQuestionCount
                                }
                            )}
                        </>
                    ) : (
                        <Shimmer width="40%" height={isMobile ? 1.5 : 1.625} />
                    )}
                </div>
                <Form>
                    <Select
                        field="sort"
                        items={sortSelectItems}
                        onChangeInformed={handleSortChange}
                        onChangeReactSelect={handleReactSelectSortChange}
                        placeholder="Sort by"
                    />
                </Form>
            </div>
            <div>
                <WhyDidYouChooseThis
                    storeConfig={storeConfig}
                    isMobile={isMobile}
                    sku={productDetails.sku}
                />
            </div>
            <div />
            {totalQuestionCount > 1 && questionsList}
            <PersonalDataForm
                handleSubmit={handlePersonalDataSubmit}
                isRequestInProgress={isRequestInProgress}
                handleClose={handleClosePersonalDataForm}
                formErrors={formErrors}
                withSkipOption={true}
                title="Have answers emailed to you"
                description="Your question has been submitted. Please check back here
                        for answers, or enter your name and email address to
                        have answers emailed to you"
            />
            <SuccessMessage
                handleClose={handleCloseSuccessMessage}
                message="Your question has been submitted successfully"
            />
        </>
    );
};

QATab.propTypes = {
    productDetails: shape({
        sku: string.isRequired
    }).isRequired,
    storeConfig: shape({
        turnto_site_key: string.isRequired,
        turnto_review_url: string.isRequired,
        turnto_qa_enabled: bool.isRequired
    }).isRequired,
    isMobile: bool.isRequired
};

export default QATab;
