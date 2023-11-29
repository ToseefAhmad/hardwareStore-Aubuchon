import { useEffect } from 'react';

import { useUserContext } from '@app/context/user';

export const useAuthModal = ({ isOpen, onClose }) => {
    const [{ isSignedIn }] = useUserContext();

    useEffect(() => {
        if (isSignedIn && isOpen && onClose) {
            onClose();
        }
    }, [isOpen, isSignedIn, onClose]);
};
