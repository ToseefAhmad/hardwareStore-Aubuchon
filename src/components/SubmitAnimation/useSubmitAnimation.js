import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useRef } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import { SUBMIT_ANIMATION_TIMEOUTS } from './constants';

const tl = gsap.timeline();

export const useSubmitAnimation = () => {
    const [
        {
            submitAnimation: { isOpen, config }
        },
        {
            actions: { closeSubmitAnimation }
        }
    ] = useAppContext();
    const boxRef = useRef(null);
    const contentRef = useRef(null);
    const iconRef = useRef(null);

    useLayoutEffect(() => {
        if (isOpen) {
            closeSubmitAnimation();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (boxRef.current) {
            const top = config.top + config.height / 2 + 'px';

            tl.to(boxRef.current, {
                top,
                left: '50%',
                xPercent: -50,
                duration: SUBMIT_ANIMATION_TIMEOUTS.animationStart
            })
                .to(boxRef.current, {
                    top: '50%',
                    yPercent: -50,
                    width: '1440px',
                    height: '1440px',
                    duration: SUBMIT_ANIMATION_TIMEOUTS.animationShowBackground
                })
                .to(contentRef.current, {
                    display: 'block',
                    duration: SUBMIT_ANIMATION_TIMEOUTS.animationShowText
                })
                .to(iconRef.current, {
                    width: '60px',
                    duration: SUBMIT_ANIMATION_TIMEOUTS.animationShowCheckmark
                })
                .to(boxRef.current, {
                    delay: 1,
                    width: config.width,
                    height: config.width,
                    top: '300%',
                    duration: SUBMIT_ANIMATION_TIMEOUTS.animationStop,
                    onComplete: closeSubmitAnimation
                });
        }
    }, [config, contentRef, iconRef, boxRef, closeSubmitAnimation]);

    return {
        boxRef,
        contentRef,
        iconRef,
        isOpen
    };
};
