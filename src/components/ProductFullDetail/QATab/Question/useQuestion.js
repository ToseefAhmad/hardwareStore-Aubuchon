import { useCallback, useState } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { turnToApi } from '@app/utils/TurnTo';

const MODAL_TYPE = 'question';

export const useQuestion = ({ storeConfig, question }) => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [isUpVoted, setIsUpVoted] = useState(false);
    const [areAllAnswersShown, setAreAllAnswersShown] = useState(false);
    const [isAnswerFormShown, setIsAnswerFormShown] = useState(false);
    const [stagedAnswerToken, setStagedAnswerToken] = useState(null);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const toggleAreAllAnswersShown = useCallback(() => {
        setAreAllAnswersShown(prevState => !prevState);
    }, []);

    const handleOpenAnswerForm = useCallback(() => {
        setIsAnswerFormShown(true);
    }, []);

    const toggleIsUpVoted = useCallback(async () => {
        try {
            const upVoted = !isUpVoted;

            await turnToApi.updateIsQuestionUpVoted({
                storeConfig,
                id: question.id,
                sku: question.catItem.sku,
                upVoted
            });

            setIsUpVoted(prevState => !prevState);
        } catch (e) {
            console.error(e);
        }
    }, [isUpVoted, storeConfig, question]);

    const handleCloseAnswerForm = useCallback(() => {
        setIsAnswerFormShown(false);
        setStagedAnswerToken(null);
    }, []);

    const handleSubmitAnswer = useCallback(
        async ({ answerText }) => {
            try {
                setIsRequestInProgress(true);

                const response = await turnToApi.submitAnswerText({
                    storeConfig,
                    sku: question.catItem.sku,
                    questionId: question.id,
                    catItemId: question.catItem.id,
                    text: answerText
                });

                setStagedAnswerToken(response.data.stagedAnswerToken);
                toggleModal({
                    identifier: `${
                        MODAL_NAMES.personalDataForm
                    }-${MODAL_TYPE}-${question.id}`
                });
            } catch (e) {
                console.error(e);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [
            storeConfig,
            question.catItem.sku,
            question.catItem.id,
            question.id,
            toggleModal
        ]
    );

    const handlePersonalDataSubmit = useCallback(
        async ({ firstName, lastName, email, nickName }) => {
            try {
                setIsRequestInProgress(true);

                await turnToApi.submitAnswer({
                    storeConfig,
                    sku: question.catItem.sku,
                    email,
                    firstName,
                    lastName,
                    nickName,
                    stagedAnswerToken
                });

                toggleModal();
                handleCloseAnswerForm();
                if (question?.id) {
                    toggleModal({
                        identifier: `${
                            MODAL_NAMES.successMessage
                        }-${MODAL_TYPE}-${question.id}`
                    });
                }
            } catch (e) {
                setFormErrors([new Error(e)]);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [
            storeConfig,
            question,
            stagedAnswerToken,
            handleCloseAnswerForm,
            toggleModal
        ]
    );

    const handleCloseSuccessMessage = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    return {
        isUpVoted,
        answers: question.answers || [],
        bestAnswer: question.answers[0],
        areAllAnswersShown,
        isRequestInProgress,
        isAnswerFormShown,
        formErrors,
        toggleIsUpVoted,
        toggleAreAllAnswersShown,
        handleOpenAnswerForm,
        handleSubmitAnswer,
        handleCloseAnswerForm,
        handlePersonalDataSubmit,
        handleCloseSuccessMessage,
        MODAL_TYPE
    };
};
