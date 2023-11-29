import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppContext } from '@magento/peregrine/lib/context/app';

/**
 * The useNavigationHeader talon complements the NavigationHeader component.
 *
 * @param {Object}      props
 * @param {Boolean}     props.isTopLevel - Whether or not the user is seeing the top-most level in the view tree.
 * @param {Function}    props.onBack - A function to call when the user clicks the "back" button.
 * @param {Function}    props.onClose - A function to call when the user clicks the "close" button.
 * @param {String}      props.view - The current view in the navigation view tree.
 *
 * @returns {Object}    result
 * @returns {Function}  result.handleBack - A callback function to attach to the back button.
 * @returns {Function}  result.handleClose - A callback function to attach to the close button.
 * @returns {Boolean}   result.isTopLevelMenu - Whether the current view is the top-most in the view tree.
 */
export const useNavigationHeader = props => {
    const { onBack } = props;
    const [, { closeDrawer }] = useAppContext();

    const { pathname } = useLocation();

    useEffect(() => {
        closeDrawer();
    }, [pathname, closeDrawer]);

    const handleBack = useCallback(() => {
        onBack();
    }, [onBack]);

    const handleClose = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    return {
        handleBack,
        handleClose
    };
};
