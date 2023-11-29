import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import { useTailwindContext } from '@app/context/tailwind';

export const useSimpleModal = ({ fullHeight, modal, modalName }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const [isFullHeight, setIsFullHeight] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    const handleKeyUp = useCallback(
        e => {
            if (e.code === 'Escape') {
                toggleModal();
            }
        },
        [toggleModal]
    );

    const handleOverlayClick = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    useEffect(() => {
        setIsOpen(modal.identifier === modalName);
    }, [modal.identifier, modalName]);

    useEffect(() => {
        if (isOpen) {
            const overlay = overlayRef.current;
            overlay.addEventListener('click', handleOverlayClick);
            globalThis.addEventListener('keyup', handleKeyUp);

            return () => {
                overlay.removeEventListener('click', handleOverlayClick);
                globalThis.removeEventListener('keyup', handleKeyUp);
            };
        }
    }, [handleOverlayClick, handleKeyUp, isOpen]);

    useEffect(() => {
        if (fullHeight || (!isOpen && !isMobile)) return;

        const observerCallback = ([modalEntry]) => {
            const { contentRect } = modalEntry;

            setIsFullHeight(contentRect.height === windowSize.innerHeight);
        };
        const debounced = debounce(observerCallback, 300);
        const observer = new ResizeObserver(debounced);

        if (modalRef.current) {
            observer.observe(modalRef.current);
        }

        return () => {
            debounced.cancel();
            observer.disconnect();
        };
    }, [isMobile, fullHeight, isOpen, windowSize.innerHeight]);

    return {
        modalRef,
        overlayRef,
        isFullHeight,
        isOpen
    };
};
