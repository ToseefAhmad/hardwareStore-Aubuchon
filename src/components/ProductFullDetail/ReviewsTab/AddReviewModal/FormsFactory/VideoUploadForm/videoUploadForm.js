import { Form } from 'informed';
import React from 'react';

import FormError from '@magento/venia-ui/lib/components/FormError';

import Button from '@app/components/Button';
import Field from '@app/components/Field';
import TextInput from '@app/components/TextInput';
import { isYouTubeLink } from '@app/overrides/venia-ui/util/formValidators';

import { useVideoUploadForm } from './useVideoUploadForm';
import classes from './videoUploadForm.module.css';

const VideoUploadForm = () => {
    const {
        isRequestInProgress,
        handleVideoUpload,
        handleGoBack,
        formErrors
    } = useVideoUploadForm();

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h3>Add your video</h3>
            </div>
            <Form className={classes.shortForm} onSubmit={handleVideoUpload}>
                <div>
                    <Field
                        classes={{ root: classes.fieldRoot }}
                        id="youtubeLink"
                        label="YouTube link"
                    >
                        <TextInput
                            field="youtubeLink"
                            placeholder=""
                            validate={isYouTubeLink}
                        />
                    </Field>
                    <p className={classes.inputNote}>
                        Your video must be a public YouTube video
                    </p>
                </div>
                <div className={classes.shortFormFooter}>
                    <FormError errors={formErrors} />
                    <div className={classes.mediaFormButtonsWrapper}>
                        <Button
                            priority="high"
                            isLoading={isRequestInProgress}
                            type="submit"
                        >
                            Add
                        </Button>
                        <Button type="button" onClick={handleGoBack}>
                            Back
                        </Button>
                    </div>
                    <p className={classes.formNote}>
                        Your submission is subject to our terms of use. Do not
                        link or upload copyrighted material without the
                        copyright owner’s permission.
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default VideoUploadForm;
