import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useBrandContext } from '@app/context/Brand';

export const useCheckoutHeader = () => {
    const history = useHistory();
    const [{ brand }] = useBrandContext();

    const handleBackButtonClick = useCallback(() => {
        history.goBack();
    }, [history]);

    return {
        brand,
        handleBackButtonClick
    };
};
