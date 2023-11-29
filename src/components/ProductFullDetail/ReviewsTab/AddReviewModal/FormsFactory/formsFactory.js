import React, { useMemo } from 'react';

import { useAddReviewModalContext } from '../context';
import { ADD_REVIEW_MODAL_CONTENT_COMPONENTS } from './config';

const FormsFactory = () => {
    const [{ currentForm }] = useAddReviewModalContext();

    const Component = useMemo(
        () => ADD_REVIEW_MODAL_CONTENT_COMPONENTS[currentForm].Component,
        [currentForm]
    );

    return <Component />;
};

export default FormsFactory;
