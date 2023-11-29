import { useFormState } from 'informed';
import { func, shape, bool, object } from 'prop-types';
import React from 'react';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import { Camera as CameraIcon } from '@app/components/Icons';

import classes from './addPhotoButton.module.css';

const AddPhotoButton = ({ fileInputRef, canAddMedia, saveBaseFormValues }) => {
    const formState = useFormState();
    return (
        <Button
            type="button"
            onClick={() => {
                saveBaseFormValues(formState.values);
                fileInputRef.current && fileInputRef.current.click();
            }}
            disabled={!canAddMedia}
        >
            <span className={classes.mediaIcon}>
                <Icon src={CameraIcon} />
            </span>
            Add photo
        </Button>
    );
};

AddPhotoButton.propTypes = {
    saveBaseFormValues: func,
    fileInputRef: shape({
        current: object
    }),
    canAddMedia: bool
};

AddPhotoButton.defaultProps = {
    canAddMedia: true
};

export default AddPhotoButton;
