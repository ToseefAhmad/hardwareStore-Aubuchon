import { Form } from 'informed';
import React from 'react';

import FormError from '@magento/venia-ui/lib/components/FormError';
import Image from '@magento/venia-ui/lib/components/Image';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import Icon from '@app/components/Icon';
import { Remove as SmallCloseIcon } from '@app/components/Icons';
import TextArea from '@app/components/TextArea';
import { hasLengthAtMost } from '@app/overrides/venia-ui/util/formValidators';

import classes from './mediaAddForm.module.css';
import { useMediaAddForm } from './useMediaAddForm';

const MediaAddForm = () => {
    const {
        isAddingImage,
        handleAddMediaToGallery,
        isRequestInProgress,
        mediaItemToAdd,
        handleCancelAddMedia,
        formErrors
    } = useMediaAddForm();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h3>Add a caption</h3>
            </div>
            <div className={classes.shortFormWrapper}>
                <Form
                    className={classes.shortForm}
                    onSubmit={handleAddMediaToGallery}
                >
                    <div>
                        <div className={classes.mediaItemPreview}>
                            <div className={classes.imageContainer}>
                                {mediaItemToAdd?.thumbnailUrl && (
                                    <Image
                                        classes={{
                                            root: classes.imageRoot,
                                            image: classes.image
                                        }}
                                        alt="media item to add"
                                        src={mediaItemToAdd.thumbnailUrl}
                                        width={60}
                                        height={60}
                                        ratio={1}
                                    />
                                )}
                                <button
                                    className={classes.removeMediaItemButton}
                                    type="button"
                                    onClick={handleCancelAddMedia}
                                >
                                    <Icon src={SmallCloseIcon} />
                                </button>
                            </div>
                            {isAddingImage && (
                                <div
                                    className={
                                        classes.mediaItemPreviewLoadingBarContainer
                                    }
                                >
                                    <div
                                        className={
                                            classes.mediaItemPreviewLoadingBar
                                        }
                                    >
                                        <p>{mediaItemToAdd?.name || ' '}</p>
                                        <div className={classes.progressBar}>
                                            <span className={classes.bar}>
                                                <span
                                                    className={classes.progress}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Field
                            classes={{ root: classes.fieldRoot }}
                            label={
                                <>
                                    Caption{' '}
                                    <span
                                        className={classes.captionTextInBraces}
                                    >
                                        (optional)
                                    </span>
                                </>
                            }
                            id="captionText"
                        >
                            <TextArea
                                field="captionText"
                                placeholder="Write caption"
                                validate={value =>
                                    hasLengthAtMost(value, value, 100)
                                }
                                classes={{ input: classes.textArea }}
                            />
                        </Field>
                        <p className={classes.inputNote}>
                            Please describe this media in 100 characters or less
                        </p>
                    </div>
                    <div className={classes.shortFormFooter}>
                        <FormError errors={formErrors} />
                        <div className={classes.mediaFormButtonsWrapper}>
                            <Button
                                priority="high"
                                type="submit"
                                disabled={isAddingImage}
                                isLoading={isRequestInProgress}
                            >
                                Next
                            </Button>
                            <Button
                                type="button"
                                onClick={handleCancelAddMedia}
                            >
                                Cancel
                            </Button>
                        </div>
                        <p className={classes.formNote}>
                            By choosing &ldquo;Next&rdquo; your visuals will be
                            submitted to our product gallery, even if you decide
                            not to submit your review. Your submission is
                            subject to our terms of use. Do not link or upload
                            copyrighted material without the copyright owner’s
                            permission.
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default MediaAddForm;
