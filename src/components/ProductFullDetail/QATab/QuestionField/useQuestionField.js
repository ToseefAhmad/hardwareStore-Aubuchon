import { useFormApi } from 'informed';
import { useEffect } from 'react';

export const useQuestionField = ({ searchQuery }) => {
    const formApi = useFormApi();
    useEffect(() => {
        if (!searchQuery) {
            formApi.setValue('question', '');
        }
    }, [searchQuery, formApi]);
};
