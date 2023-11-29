import { useFormState } from 'informed';
import { bool, func } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { VideoCamera as VideoCameraIcon } from '@app/components/Icons';

import classes from './addVideoButton.module.css';

const AddVideoButton = ({
    handleGoToAddVideoForm,
    canAddMedia,
    saveBaseFormValues
}) => {
    const formState = useFormState();
    return (
        <Button
            type="button"
            onClick={() => {
                saveBaseFormValues(formState.values);
                handleGoToAddVideoForm();
            }}
            disabled={!canAddMedia}
        >
            <span className={classes.mediaIcon}>
                <Icon src={VideoCameraIcon} />
            </span>
            Add video
        </Button>
    );
};

AddVideoButton.propTypes = {
    saveBaseFormValues: func,
    canAddMedia: bool,
    handleGoToAddVideoForm: func
};

AddVideoButton.defaultProps = {
    canAddMedia: true
};

export default AddVideoButton;
