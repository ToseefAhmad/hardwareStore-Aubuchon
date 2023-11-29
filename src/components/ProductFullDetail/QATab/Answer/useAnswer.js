import { useState, useMemo, useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { turnToApi } from '@app/utils/TurnTo';

const MODAL_TYPE = 'answer';

export const useAnswer = ({ storeConfig, answer }) => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const [isLiked, setIsLiked] = useState(false);
    const [isReplyFormShown, setIsReplyFormShown] = useState(false);
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);
    const [stagedReplyToken, setStagedReplyToken] = useState(null);
    const [formErrors, setFormErrors] = useState([]);

    const handleOpenReplyForm = useCallback(() => {
        setIsReplyFormShown(true);
    }, []);

    const handleCloseReplyForm = useCallback(() => {
        setIsReplyFormShown(false);
        setStagedReplyToken(null);
    }, []);

    const handleCloseSuccessMessage = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    const handleSubmitReplyText = useCallback(
        async ({ replyText }) => {
            try {
                setIsRequestInProgress(true);

                const response = await turnToApi.submitReplyText({
                    storeConfig,
                    sku: answer.catItem.sku,
                    answerId: answer.id,
                    catItemId: answer.catItem.id,
                    text: replyText
                });

                setStagedReplyToken(response.data.stagedReplyToken);
                toggleModal({
                    identifier: `${
                        MODAL_NAMES.personalDataForm
                    }-${MODAL_TYPE}-${answer.id}`
                });
            } catch (e) {
                console.error(e);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [
            storeConfig,
            answer.catItem.sku,
            answer.catItem.id,
            answer.id,
            toggleModal
        ]
    );

    const handlePersonalDataSubmit = useCallback(
        async ({ firstName, lastName, email, nickName }) => {
            try {
                setIsRequestInProgress(true);

                await turnToApi.submitReply({
                    storeConfig,
                    sku: answer.catItem.sku,
                    email,
                    firstName,
                    lastName,
                    nickName,
                    stagedReplyToken
                });

                toggleModal();
                handleCloseReplyForm();
                if (answer?.id) {
                    toggleModal({
                        identifier: `${
                            MODAL_NAMES.successMessage
                        }-${MODAL_TYPE}-${answer.id}`
                    });
                }
            } catch (e) {
                setFormErrors([new Error(e)]);
            } finally {
                setIsRequestInProgress(false);
            }
        },
        [
            answer.catItem.sku,
            answer?.id,
            handleCloseReplyForm,
            stagedReplyToken,
            storeConfig,
            toggleModal
        ]
    );

    const handleMarkAnswerAsInaccurate = useCallback(async () => {
        try {
            await turnToApi.markAnswerAsInaccurate({
                storeConfig,
                id: answer.id,
                sku: answer.catItem.sku
            });
        } catch (e) {
            console.error(e);
        }
    }, [storeConfig, answer]);

    const toggleIsLiked = useCallback(async () => {
        try {
            const liked = !isLiked;

            await turnToApi.updateIsAnswerLiked({
                storeConfig,
                id: answer.id,
                sku: answer.catItem.sku,
                liked
            });

            setIsLiked(prevState => !prevState);
        } catch (e) {
            console.error(e);
        }
    }, [isLiked, storeConfig, answer]);

    const nickName = useMemo(() => {
        const lastNameInitial = answer?.user?.lastName[0]
            ? `${answer.user.lastName[0]}.`
            : '';
        return (
            answer?.user?.nickName ||
            `${answer?.user?.firstName} ${lastNameInitial}`
        );
    }, [answer]);

    const replies = useMemo(() => {
        return answer?.replies && answer.replies.length ? answer.replies : null;
    }, [answer]);

    return {
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
    };
};
