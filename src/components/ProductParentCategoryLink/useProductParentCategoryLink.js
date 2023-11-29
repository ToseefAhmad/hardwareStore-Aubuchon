import { useMemo } from 'react';

export const useProductParentCategoryLink = ({ categories }) => {
    const parentCategory = useMemo(
        () =>
            categories.reduce(
                (prev, current) =>
                    prev.level > current.level ? prev : current,
                { level: 0, url_path: '', url_suffix: '' }
            ),
        [categories]
    );

    const url = useMemo(() => {
        return parentCategory.url_path + (parentCategory.url_suffix || '');
    }, [parentCategory.url_path, parentCategory.url_suffix]);

    return {
        url
    };
};
