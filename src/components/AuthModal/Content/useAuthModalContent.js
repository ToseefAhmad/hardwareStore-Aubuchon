import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useWindowSize } from '@magento/peregrine';

import { useSimpleModalContext } from '@app/components/SimpleModal/simpleModal';

export const useAuthModalContent = () => {
    const [isShownForgotPassword, setIsShownForgotPassword] = useState(false);

    const toggleShownForgotPassword = useCallback(() => {
        setIsShownForgotPassword(prevState => !prevState);
    }, []);

    const contentRef = useRef();
    const [isScrolling, setScrolling] = useState(false);

    const { innerWidth: windowWidth } = useWindowSize();
    const isMobile = windowWidth < 1024;

    const [{ modalRef }] = useSimpleModalContext();

    // After scrollbar is appearing in the form (in modal window), padding right will be added between input field and scroll bar.
    useEffect(() => {
        const modalTabFormObserver = new ResizeObserver(
            debounce(entries => {
                entries.forEach(entry => {
                    if (entry && !isMobile && !!contentRef.current) {
                        setScrolling(
                            contentRef.current.clientHeight <
                                contentRef.current.scrollHeight
                        );
                    }
                });
            }, 50)
        );

        modalTabFormObserver.observe(modalRef.current);

        return () => {
            modalTabFormObserver.disconnect();
        };
    }, [modalRef, isMobile]);

    return {
        isShownForgotPassword,
        isScrolling,
        toggleShownForgotPassword,
        contentRef
    };
};
