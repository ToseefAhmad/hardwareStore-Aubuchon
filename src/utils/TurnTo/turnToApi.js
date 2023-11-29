import getAxiosTurnToConfig from './axiosConfig';
import { qaSortByOptions, reviewSortByOptions } from './consts';

export const SITE_KEY =
    window.location.hostname === 'hardwarestore.com' ? null : TEST_KEY;

export const imgBaseUrl = 'https://wac.edgecastcdn.net/001A39/prod/media';

const axiosUsingStoreConfigReviewUrl = storeConfig =>
    getAxiosTurnToConfig({
        url: storeConfig.turnto_review_url,
        key: SITE_KEY || storeConfig.turnto_site_key
    });

const axiosUsingNonCdnTurntoUrl = storeConfig =>
    getAxiosTurnToConfig({
        url: NON_CDN_TURNTO_URL,
        key: SITE_KEY || storeConfig.turnto_site_key,
        includeTurnToSiteKeyHeader: true
    });

// https://cdn-ws.turnto.com/v5/sitedata/yKNo24VQwghkFqOsite/sku/d/ugc/counts/en_US
const getTurnToQuestionsSummary = ({ storeConfig, sku }) => {
    return axiosUsingStoreConfigReviewUrl(storeConfig).get(
        `/${SITE_KEY || storeConfig.turnto_site_key}/${sku}/d/ugc/counts/en_US/`
    );
};

// https://cdn-ws.turnto.com/v5/sitedata/yKNo24VQwghkFqOsite/BM-RE-SL-IN/d/question/en_US/0/10/BEST/true?
const getTurnToQuestions = ({
    storeConfig,
    sku,
    sortBy = qaSortByOptions.BEST,
    offset = 0,
    questionsPerPage
}) => {
    return axiosUsingStoreConfigReviewUrl(storeConfig).get(
        `/${SITE_KEY ||
            storeConfig.turnto_site_key}/${sku}/d/question/en_US/${offset}/${questionsPerPage}/${sortBy}/${
            storeConfig.turnto_qa_enabled
        }/`
    );
};

// https://cdn-ws.turnto.com/v5/sitedata/yKNo24VQwghkFqOsite/chatter/665342/en_US/0/50/0/0/0/true/true/_ALL_
const getWhyDidYouChooseThisComments = ({ storeConfig, sku }) => {
    return axiosUsingStoreConfigReviewUrl(storeConfig).get(
        `/${SITE_KEY ||
            storeConfig.turnto_site_key}/chatter/${sku}/en_US/0/50/0/0/0/true/true/_ALL_`
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/answer/search?locale=en_US
const searchAnswers = ({
    storeConfig,
    searchTerm,
    brand,
    catalogItemId,
    categoryIds
}) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY || storeConfig.turnto_site_key}/answer/search`,
        {
            brand,
            catalogItemId,
            categoryIds,
            includeRelatedQuestions: true,
            includeRelatedReviews: true,
            searchTerm
        },
        {
            params: {
                locale: 'en_US'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/question/inline/anonymous?sku=195543&locale=en_US
// returns questionId and savedQuestionToken
const submitQuestion = ({ storeConfig, sku, text }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY || storeConfig.turnto_site_key}/question/inline/anonymous`,
        { questionType: 0, text },
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/user/register/anonymous/question?locale=en_US
const submitPersonalDataForQuestion = ({
    storeConfig,
    sku,
    email,
    firstName,
    lastName,
    nickName,
    savedContentToken
}) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY ||
            storeConfig.turnto_site_key}/user/register/anonymous/question`,
        {
            email,
            firstName,
            lastName,
            nickName,
            sku,
            savedContentToken
        },
        {
            params: {
                locale: 'en_US'
            }
        }
    );
};

const getTurnToReviewsSummary = ({ storeConfig, sku }) => {
    return axiosUsingStoreConfigReviewUrl(storeConfig).get(
        `/${SITE_KEY ||
            storeConfig.turnto_site_key}/${sku}/d/review/summary/en_US`
    );
};

const getTurnToReviews = ({
    storeConfig,
    sku,
    sortBy = reviewSortByOptions.RECENT,
    starFiltersInResponse = false,
    filter = '',
    offset = 0,
    reviewsPerPage,
    starRatingFilter
}) => {
    const starRatingEncoded = encodeURIComponent(
        starRatingFilter ? `{"cm":{"rt":[${starRatingFilter}]}}` : '{}'
    );

    return axiosUsingStoreConfigReviewUrl(storeConfig).get(
        `/${SITE_KEY ||
            storeConfig.turnto_site_key}/${sku}/d/review/en_US/${offset}/${reviewsPerPage}/${starRatingEncoded}/${
            filter ? 'NONE' : sortBy
        }/${
            storeConfig.turnto_reviews_enabled
        }/${starFiltersInResponse}/${filter}`,
        {
            headers: {
                Accept: '*/*'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/answer/7207492/vote?sku=126465&originSiteKey=&locale=en_US
const updateIsAnswerLiked = ({ storeConfig, sku, id, liked }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY || storeConfig.turnto_site_key}/answer/${id}/vote`,
        {
            up: liked ? 1 : -1
        },
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/question/5849719/vote?sku=665342&originSiteKey=&locale=en_US
const updateIsQuestionUpVoted = ({ storeConfig, sku, id, upVoted }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY || storeConfig.turnto_site_key}/question/${id}/vote`,
        {
            up: upVoted ? 1 : -1
        },
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/review/12793/en_US?
const getFullReviewData = ({ storeConfig, id }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).get(
        `${SITE_KEY || storeConfig.turnto_site_key}/review/${id}/en_US`
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/question/6834856/en_US?
const getFullQuestionData = ({ storeConfig, id }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).get(
        `${SITE_KEY || storeConfig.turnto_site_key}/question/${id}/en_US`
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/answer/7200098/flag
const markAnswerAsInaccurate = ({ storeConfig, sku, id }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY || storeConfig.turnto_site_key}/answer/${id}/flag`,
        {},
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

const updateTurnToReviewVotes = ({ storeConfig, sku, reviewId, newVotes }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY ||
            storeConfig.turnto_site_key}/review/${reviewId}/vote?sku=${sku}&checkoutSiteKey=&locale=en_US`,
        newVotes
    );
};

const flagReview = ({ storeConfig, sku, reviewId }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY ||
            storeConfig.turnto_site_key}/review/${reviewId}/flag?sku=${sku}&checkoutSiteKey=&locale=en_US`,
        {}
    );
};

const getInitDataForAddingReview = ({ storeConfig, sku }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).get(
        `/${SITE_KEY || storeConfig.turnto_site_key}/review/initData?`,
        { params: { sku, locale: 'en_US' } }
    );
};

const uploadVideo = ({ storeConfig, videoUrl }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY || storeConfig.turnto_site_key}/media/videoLink?`,
        null,
        {
            params: {
                url: videoUrl,
                locale: 'en_US'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/reply/inline/unconfirmed?sku=126465&originSiteKey=&locale=en_US
// will return stagedReplyToken
const submitReplyText = ({ storeConfig, sku, answerId, catItemId, text }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY || storeConfig.turnto_site_key}/reply/inline/unconfirmed`,
        {
            answerId,
            catItemId,
            parentReplyId: null,
            text
        },
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

const addMediaToProductGallery = ({ storeConfig, sku, catItemId, media }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY || storeConfig.turnto_site_key}/media/batch?`,
        {
            catItemId,
            media
        },
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/answer/inline/unconfirmed?sku=665342&originSiteKey=&locale=en_US
// will return stagedAnswerToken
const submitAnswerText = ({
    storeConfig,
    sku,
    questionId,
    catItemId,
    text
}) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY || storeConfig.turnto_site_key}/answer/inline/unconfirmed`,
        {
            questionId,
            catItemId,
            multiItemIds: [],
            sourceId: 2,
            text
        },
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

const uploadImage = ({ storeConfig, file }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadId', `${Date.now()}_0`);

    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY || storeConfig.turnto_site_key}/media/upload?`,
        formData,
        {
            params: {
                locale: 'en_US'
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};

// https://ws.turnto.com/v5/T9KShPnZD7PN9Lusite/user/register/optional/answer?locale=en_US
const submitAnswer = ({
    storeConfig,
    sku,
    email,
    firstName,
    lastName,
    nickName,
    stagedAnswerToken
}) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY ||
            storeConfig.turnto_site_key}/user/register/optional/answer`,
        {
            email,
            firstName,
            lastName,
            nickName,
            sku,
            stagedContentToken: stagedAnswerToken
        },
        {
            params: {
                locale: 'en_US'
            }
        }
    );
};

const submitReviewData = ({ storeConfig, sku, data }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY ||
            storeConfig.turnto_site_key}/review/inline/unconfirmed?`,
        data,
        {
            params: {
                sku,
                locale: 'en_US'
            }
        }
    );
};

// https://ws.turnto.com/v5/yKNo24VQwghkFqOsite/user/register/optional/reply?locale=en_US
const submitReply = ({
    storeConfig,
    sku,
    email,
    firstName,
    lastName,
    nickName,
    stagedReplyToken
}) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `${SITE_KEY ||
            storeConfig.turnto_site_key}/user/register/optional/reply`,
        {
            email,
            firstName,
            lastName,
            nickName,
            sku,
            stagedContentToken: stagedReplyToken
        },
        {
            params: {
                locale: 'en_US'
            }
        }
    );
};

const submitReview = ({ storeConfig, sku, data, stagedContentToken }) => {
    return axiosUsingNonCdnTurntoUrl(storeConfig).post(
        `/${SITE_KEY ||
            storeConfig.turnto_site_key}/user/register/optional/review?`,
        { ...data, sku, stagedContentToken },
        {
            params: {
                locale: 'en_US'
            }
        }
    );
};

export const turnToApi = {
    getTurnToQuestions,
    getTurnToQuestionsSummary,
    getWhyDidYouChooseThisComments,
    getFullQuestionData,
    getFullReviewData,
    getTurnToReviewsSummary,
    getTurnToReviews,
    getInitDataForAddingReview,
    searchAnswers,
    uploadImage,
    uploadVideo,
    addMediaToProductGallery,
    updateIsAnswerLiked,
    updateIsQuestionUpVoted,
    updateTurnToReviewVotes,
    markAnswerAsInaccurate,
    flagReview,
    submitQuestion,
    submitPersonalDataForQuestion,
    submitReplyText,
    submitReply,
    submitAnswerText,
    submitAnswer,
    submitReviewData,
    submitReview
};
