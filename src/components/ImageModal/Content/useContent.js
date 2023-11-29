import { useRef, useCallback } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

export const useContent = () => {
    const [
        { modal },
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const { current: props } = useRef(modal.props);
    const { imageProps, description } = props;

    const handleCloseModal = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    return {
        imageProps,
        description,
        handleCloseModal
    };
};
