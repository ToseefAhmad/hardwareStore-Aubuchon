import { debounce } from 'lodash';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { smoothScroll } from '@app/utils/smooth-scroll';
import { turnToApi } from '@app/utils/TurnTo';

const QUESTIONS_PER_PAGE = 6;

export const useQATab = ({ storeConfig, sku, isMobile }) => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [turnToQuestionsData, setTurnToQuestionsData] = useState(null);
    const [areQuestionsLoading, setAreQuestionsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState();
    const [sortBy, setSortBy] = useState('BEST');
    const [currentQuestionsPage, setCurrentQuestionsPage] = useState(1);

    const [areTipsExpanded, setAreTipsExpanded] = useState(false);

    const [isQuestionSubmitInitiated, setIsQuestionSubmitInitiated] = useState(
        false
    );
    const [savedContentToken, setSavedContentToken] = useState(null);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const questionsListRef = useRef();

    const toggleTipsExpanded = useCallback(() => {
        setAreTipsExpanded(prevState => !prevState);
    }, []);

    const handleSortChange = useCallback(e => {
        setSortBy(e.target.value);
        setCurrentQuestionsPage(1);
    }, []);

    const handleReactSelectSortChange = useCallback(value => {
        setSortBy(value);
        setCurrentQuestionsPage(1);
    }, []);

    const debouncedSearch = debounce(async value => {
        setSearchQuery(value);
    }, 500);

    const handleQuestionInputChange = useCallback(
        e => {
            debouncedSearch(e.target.value);
        },
        [debouncedSearch]
    );

    const handleInitiateQuestionSubmit = useCallback(() => {
        setIsQuestionSubmitInitiated(true);
    }, []);

    const handleCancelQuestionSubmit = useCallback(() => {
        setIsQuestionSubmitInitiated(false);
    }, []);

    const handleQuestionSubmit = useCallback(
        async ({ question }) => {
            try {
                setIsRequestInProgress(true);

                const response = await turnToApi.submitQuestion({
                    storeConfig,
                    sku,
                    text: question
                });

                setSavedContentToken(response.data.savedQuestionToken);
                toggleModal({
                    identifier: MODAL_NAMES.personalDataForm
                });
                setSearchQuery('');
            } catch (e) {
                console.error(e);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [sku, storeConfig, toggleModal]
    );

    const handleQuestionsPageChange = useCallback(
        async value => {
            setCurrentQuestionsPage(value);

            if (
                questionsListRef.current?.offsetTop - (isMobile ? 70 : 140) <
                window.scrollY
            ) {
                await smoothScroll({
                    container:
                        document.scrollingElement || document.documentElement,
                    to: {
                        y:
                            questionsListRef.current?.offsetTop -
                            (isMobile ? 90 : 155)
                    }
                });
            }
        },
        [isMobile]
    );

    const handleClosePersonalDataForm = useCallback(() => {
        toggleModal();
        setIsQuestionSubmitInitiated(false);
    }, [toggleModal]);

    const handleCloseSuccessMessage = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    const handlePersonalDataSubmit = useCallback(
        async ({ firstName, lastName, email, nickName }) => {
            try {
                setIsRequestInProgress(true);

                await turnToApi.submitPersonalDataForQuestion({
                    storeConfig,
                    sku,
                    email,
                    firstName,
                    lastName,
                    nickName,
                    savedContentToken
                });

                handleClosePersonalDataForm();
                toggleModal({
                    identifier: MODAL_NAMES.successMessage
                });
            } catch (e) {
                setFormErrors([new Error(e)]);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [
            storeConfig,
            sku,
            savedContentToken,
            handleClosePersonalDataForm,
            toggleModal
        ]
    );

    useEffect(() => {
        (async () => {
            setAreQuestionsLoading(true);

            const response = await turnToApi.getTurnToQuestions({
                storeConfig,
                sku,
                sortBy,
                offset:
                    currentQuestionsPage === 1
                        ? 0
                        : (currentQuestionsPage - 1) * QUESTIONS_PER_PAGE,
                questionsPerPage: QUESTIONS_PER_PAGE
            });

            setTurnToQuestionsData(response.data);

            setAreQuestionsLoading(false);
        })();
    }, [sku, storeConfig, currentQuestionsPage, sortBy]);

    const totalQuestionsPages = useMemo(() => {
        return (
            turnToQuestionsData &&
            Math.ceil(turnToQuestionsData.total / QUESTIONS_PER_PAGE)
        );
    }, [turnToQuestionsData]);

    return {
        // There is always 1 default question that is not counted into the total amount in response
        totalQuestionCount: turnToQuestionsData?.total + 1,
        questions: turnToQuestionsData?.questions || [],
        turnToQuestionsData,
        currentQuestionsPage,
        questionsListRef,
        totalQuestionsPages,
        areQuestionsLoading,
        areTipsExpanded,
        isQuestionSubmitInitiated,
        isRequestInProgress,
        formErrors,
        searchQuery,
        toggleTipsExpanded,
        handleSortChange,
        handleReactSelectSortChange,
        handleQuestionInputChange,
        handleQuestionsPageChange,
        handleQuestionSubmit,
        handlePersonalDataSubmit,
        handleInitiateQuestionSubmit,
        handleCancelQuestionSubmit,
        handleClosePersonalDataForm,
        handleCloseSuccessMessage
    };
};
