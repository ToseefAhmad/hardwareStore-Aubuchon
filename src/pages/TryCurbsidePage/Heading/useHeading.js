import { useEffect, useRef, useCallback, useState } from 'react';

const HEADLINES = [
    'Curbside = Easy',
    '🐕 on board — we’ll do the 🏋️',
    'Take your chores on a cakewalk',
    'Stay in your warm 🚗 on ❄️ days',
    '👶 on board — we’ll do the 🏋',
    'To-do, to Done',
    'Curbside + Errands = Easy',
    'Stay in your cool 🚗 on ☀️ days',
    'Make chores a piece-of-🎂',
    'Order ahead — we’ll do the 🏋️',
    'Save ⏱ with Curbside'
];

// This needed as emojis consist of more than one symbol
const REPLACEMENT_SYMBOL_CODES = [
    56438,
    56983,
    57291,
    57218,
    56341,
    55356,
    65039
];
const isCurrentSymbolAReplacementSymbol = symbol => {
    return !symbol
        ? false
        : REPLACEMENT_SYMBOL_CODES.includes(symbol.charCodeAt(0));
};

// Regulates a speed of typing
const PERIOD = 60;
const PAUSE = 1600;

export const useHeading = () => {
    const typewriterRef = useRef();
    const typewriterContainerRef = useRef();
    const delta = useRef(PERIOD);
    const [i, setI] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTypedText, setCurrentTypedText] = useState('');

    const typeText = useCallback(() => {
        const currentStringToType = HEADLINES[i];

        if (isDeleting) {
            setCurrentTypedText(prevText =>
                currentStringToType.substring(
                    0,
                    prevText.length -
                        (isCurrentSymbolAReplacementSymbol(
                            currentStringToType[prevText.length - 1]
                        )
                            ? 3
                            : 1)
                )
            );
        } else {
            setCurrentTypedText(prevText =>
                currentStringToType.substring(
                    0,
                    prevText.length +
                        (isCurrentSymbolAReplacementSymbol(
                            currentStringToType[prevText.length + 1]
                        )
                            ? 3
                            : 1)
                )
            );
        }

        typewriterRef.current.innerHTML = currentTypedText;

        // make a pause when a headline is fully typed
        if (!isDeleting && currentTypedText === currentStringToType) {
            delta.current = PAUSE;
            setIsDeleting(true);
        }

        if (isDeleting) {
            delta.current = PERIOD / 2;

            // when the headline got erased fully, increment index to proceed with the next headline
            if (currentTypedText === '') {
                setIsDeleting(false);
                delta.current = PERIOD;

                setI(prevValue =>
                    prevValue >= HEADLINES.length - 1 ? 0 : ++prevValue
                );
            }
        }
    }, [currentTypedText, isDeleting, i]);

    useEffect(() => {
        const timer = setTimeout(() => {
            typeText();
        }, delta.current);

        return () => {
            clearTimeout(timer);
        };
    }, [typeText]);

    // Scroll string if it's wider than the page
    useEffect(() => {
        if (
            typewriterRef.current?.offsetWidth >=
            typewriterContainerRef.current?.offsetWidth
        ) {
            typewriterContainerRef.current.scrollLeft =
                typewriterContainerRef.current.scrollWidth;
        }
    }, [
        typewriterContainerRef.current?.offsetWidth,
        typewriterRef.current?.offsetWidth
    ]);

    return {
        typewriterRef,
        typewriterContainerRef
    };
};
