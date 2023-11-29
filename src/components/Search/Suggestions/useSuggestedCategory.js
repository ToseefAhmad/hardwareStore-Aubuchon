import { useCallback } from 'react';

/**
 * Return props necessary to render a SuggestedCategory component.
 *
 * @param {Object} props
 * @param {String} props.path - category path
 * @param {Function} props.onNavigate - callback to fire on link click
 */
export const useSuggestedCategory = props => {
    const { onNavigate, path } = props;
    const destination = `${path}`;

    const handleClick = useCallback(() => {
        if (typeof onNavigate === 'function') {
            onNavigate();
        }
    }, [onNavigate]);

    return {
        destination,
        handleClick
    };
};
