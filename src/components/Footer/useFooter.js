import { useWindowSize } from '@magento/peregrine';

import { useTailwindContext } from '@app/context/tailwind';
import { useUserContext } from '@app/context/user';

export const useFooter = () => {
    const [{ isSignedIn }] = useUserContext();
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.xl;

    return {
        isSignedIn,
        isMobile
    };
};
