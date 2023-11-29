import { useCallback } from 'react';

import { smoothScroll } from '@app/utils/smooth-scroll';

export const useTile = props => {
    const {
        onClick,
        value_index,
        optionContainerRef,
        isOpen,
        setIsOpen
    } = props;

    const handleClick = useCallback(async () => {
        if (!isOpen) {
            await smoothScroll({
                to: {
                    y: optionContainerRef.current?.offsetTop - 26
                },
                duration: 500
            });

            setIsOpen(true);
        }

        onClick(value_index);
    }, [value_index, onClick, optionContainerRef, isOpen, setIsOpen]);

    return {
        handleClick
    };
};
