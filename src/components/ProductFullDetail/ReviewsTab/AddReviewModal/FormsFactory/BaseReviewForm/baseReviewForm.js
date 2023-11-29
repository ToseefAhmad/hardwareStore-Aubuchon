import { Form } from 'informed';
import React from 'react';

import FormError from '@magento/venia-ui/lib/components/FormError';
import Image from '@magento/venia-ui/lib/components/Image';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import Icon from '@app/components/Icon';
import { Remove as SmallCloseIcon } from '@app/components/Icons';
import Region from '@app/components/Region2';
import Select from '@app/components/Select';
import TextArea from '@app/components/TextArea';
import TextInput from '@app/components/TextInput';
import {
    hasLengthAtLeast,
    hasLengthAtMost
} from '@app/overrides/venia-ui/util/formValidators';

import AddPhotoButton from './AddPhotoButton/addPhotoButton';
import AddVideoButton from './AddVideoButton/addVideoButton';
import classes from './baseReviewForm.module.css';
import RatingRadioButtonsGroup from './RatingRadioButtonsGroup/ratingRadioButtonsGroup';
import { useBaseReviewForm } from './useBaseReviewForm';

const BaseReviewForm = () => {
    const {
        countries,
        areGuidelinesExpanded,
        toggleGuidelinesExpanded,
        rating,
        setRating,
        isRequestInProgress,
        isInitialDataLoading,
        productName,
        productSmallImage,
        saveBaseFormValues,
        baseFormValues,
        reviewMediaThumbnails,
        handleImageUpload,
        handleRemoveMediaItemFromSubmitting,
        handleSubmitReviewData,
        handleFormStateChange,
        handleGoToAddVideoForm,
        canAddMedia,
        formErrors,
        fileInputRef,
        isMobile
    } = useBaseReviewForm();

    const countryListItems = countries.map(country => ({
        key: country.id,
        value: country.two_letter_abbreviation,
        label: country.full_name_english
    }));

    const guidelines = (
        <div className={classes.guidelinesText}>
            <p className={classes.guidelinesTextItem}>
                We value your input and invite you to rate and review your
                purchases. Be sure to explain why you like or dislike the
                product and focus on the product&rsquo;s features and your own
                experience using it. If you wish to comment about product
                selection, pricing, ordering, delivery or other issues, please
                contact our customer support.
            </p>
            <p className={classes.guidelinesTextItem}>
                Please refrain from including any of the following in your
                review:
            </p>
            <ul className={classes.guidelinesList}>
                <li>Obscene or discriminatory language</li>
                <li>
                    Critical or inappropriate comments about other reviews and
                    shoppers
                </li>
                <li>
                    Advertising, spam, references to other websites or retailers
                </li>
                <li>
                    Personal information such as email addresses, phone numbers
                    or physical addresses
                </li>
                <li>
                    All reviews are subject to our store&rsquo;s Terms of Use.
                </li>
            </ul>
        </div>
    );

    const header = (
        <>
            <h3>Please share your experience</h3>{' '}
            <div className={classes.guidelinesNotice}>
                <p>
                    Your feedback will help other shoppers make good choices,
                    and we&rsquo;ll use it to improve our products.{' '}
                    <button
                        className={classes.guidelinesButton}
                        onClick={toggleGuidelinesExpanded}
                    >
                        {areGuidelinesExpanded
                            ? 'Hide guidelines'
                            : 'Review guidelines'}
                    </button>
                </p>
                {areGuidelinesExpanded && guidelines}
            </div>
            <div className={classes.productInfo}>
                <div className={classes.imageContainer}>
                    <Image
                        classes={{
                            root: classes.imageRoot,
                            image: classes.image
                        }}
                        alt={productName}
                        src={productSmallImage}
                        width={60}
                        height={60}
                        ratio={1}
                    />
                </div>
                <div className={classes.productAboutContainer}>
                    {isMobile && <h5 className={classes.aboutTitle}>About</h5>}
                    <p className={classes.productName}>{productName}</p>
                </div>
            </div>
        </>
    );

    return (
        <>
            <div className={classes.header}>{header}</div>
            <Form
                onSubmit={handleSubmitReviewData}
                onChange={handleFormStateChange}
                initialValues={baseFormValues}
            >
                <Field
                    classes={{ root: classes.overallRatingFieldRoot }}
                    id="rating"
                    label="Overall rating"
                    required
                >
                    <RatingRadioButtonsGroup
                        rating={rating}
                        setRating={setRating}
                    />
                </Field>
                <Field
                    classes={{ root: classes.fieldRoot }}
                    id="text"
                    label="Review"
                    required
                >
                    <TextArea
                        field="text"
                        placeholder="Write your review"
                        validate={value => hasLengthAtLeast(value, value, 10)}
                        classes={{ input: classes.textArea }}
                    />
                </Field>
                <p className={classes.reviewFieldNote}>
                    Make your review great: Describe what you liked, what you
                    didn’t like, and other key things shoppers should know
                    (minimum 10 characters)
                </p>
                <Field
                    classes={{ root: classes.fieldRoot }}
                    id="reviewTitle"
                    label="Review title"
                >
                    <TextInput
                        field="reviewTitle"
                        placeholder="Enter review title"
                        validate={value => hasLengthAtMost(value, value, 150)}
                    />
                </Field>
                <p className={classes.reviewTitleFieldNote}>
                    Your overall impression (150 characters or less)
                </p>
                <h5 className={classes.photosOrVideos}>Photos or videos</h5>
                <div className={classes.mediaButtons}>
                    <input
                        ref={fileInputRef}
                        className={classes.fileUploadInput}
                        name="imageUpload"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageUpload}
                    />
                    <AddPhotoButton
                        saveBaseFormValues={saveBaseFormValues}
                        fileInputRef={fileInputRef}
                        canAddMedia={canAddMedia}
                    />
                    <AddVideoButton
                        saveBaseFormValues={saveBaseFormValues}
                        handleGoToAddVideoForm={handleGoToAddVideoForm}
                        canAddMedia={canAddMedia}
                    />
                </div>
                <p className={classes.mediaButtonsNote}>
                    You may add up to five photos or videos
                </p>
                {!!reviewMediaThumbnails.length && (
                    <div className={classes.reviewMediaContainer}>
                        {reviewMediaThumbnails.map(item => (
                            <div
                                key={item.id}
                                className={classes.imageContainer}
                            >
                                {item.thumbnailUrl && (
                                    <Image
                                        classes={{
                                            root: classes.imageRoot,
                                            image: classes.image
                                        }}
                                        alt="media item to submit"
                                        src={item.thumbnailUrl}
                                        width={60}
                                        height={60}
                                        ratio={1}
                                    />
                                )}
                                <button
                                    type="button"
                                    className={classes.removeMediaItemButton}
                                    onClick={
                                        handleRemoveMediaItemFromSubmitting
                                    }
                                >
                                    <Icon src={SmallCloseIcon} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <Field
                    classes={{ root: classes.fieldRoot }}
                    id="country"
                    label="Country"
                >
                    <Select
                        field="country"
                        items={[...countryListItems]}
                        placeholder="Select Country"
                    />
                </Field>
                <Field
                    classes={{ root: classes.fieldRoot }}
                    id="region"
                    label="State / Province / Region"
                >
                    <Region
                        field="region"
                        countyField="country"
                        countries={countries}
                        isValueNumber={false}
                    />
                </Field>
                <Field
                    classes={{ root: classes.fieldRoot }}
                    id="city"
                    label="City"
                >
                    <TextInput field="city" placeholder="Enter City" />
                </Field>
                <FormError errors={formErrors} />
                <div className={classes.submitButtonContainer}>
                    <Button
                        priority="high"
                        type="submit"
                        disabled={isInitialDataLoading}
                        isLoading={isRequestInProgress}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default BaseReviewForm;
