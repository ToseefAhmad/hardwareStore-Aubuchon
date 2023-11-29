import { APP_BRAND_LYNDONVILLE } from '@app/constants';
import { useBrandContext } from '@app/context/Brand';

export const useErrorView = () => {
    const [{ brand }] = useBrandContext();

    let image404Src;
    let number404Src;

    switch (brand?.identifier) {
        case APP_BRAND_LYNDONVILLE: {
            image404Src = 'assets/error-view/Image404-lyndonville.svg';
            number404Src = 'assets/error-view/404-lyndonville.svg';
            break;
        }
        default: {
            image404Src = '/assets/error-view/Image404.svg';
            number404Src = '/assets/error-view/404.svg';
        }
    }

    return {
        image404Src,
        number404Src
    };
};
