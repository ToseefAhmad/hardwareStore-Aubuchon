import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import { SUBMIT_ANIMATION_TIMEOUTS } from '@app/components/SubmitAnimation';
import { useTailwindContext } from '@app/context/tailwind';

/**
 * A hook that allows run animation on mobile for any button
 */

const useSubmitAnimation = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const [
        ,
        {
            actions: { startSubmitAnimation }
        }
    ] = useAppContext();

    const runAnimation = (ref, afterAction) => {
        const successButtonRect = ref.current?.getBoundingClientRect();
        const redirectDelay = isMobile
            ? SUBMIT_ANIMATION_TIMEOUTS.redirectMobileDelay
            : SUBMIT_ANIMATION_TIMEOUTS.redirectDesktopDelay;

        if (isMobile) {
            startSubmitAnimation({
                width: successButtonRect.width,
                height: successButtonRect.height,
                top: successButtonRect.top,
                left: successButtonRect.left
            });
        }

        setTimeout(() => {
            afterAction();
        }, redirectDelay);
        // We need redirectDelay to unnoticeably change the content / reload the page when the animation is on full screen
    };
    return { runAnimation };
};

export default useSubmitAnimation;
