import { lazy } from 'react';

import { CREATE_ACCOUNT_SCREENS } from '../context/createAccount.consts';
import InitialScreen from './Initial';
import RegFormShimmer from './RegForm/regForm.shimmer';
import ThatIsMeShimmer from './ThatIsMe/thatIsMe.shimmer';

const { INITIAL, THAT_IS_ME, REG_FORM } = CREATE_ACCOUNT_SCREENS;

export const SCREEN_COMPONENTS = {
    [INITIAL]: {
        Component: InitialScreen,
        Shimmer: null
    },
    [THAT_IS_ME]: {
        Component: lazy(() => import('./ThatIsMe')),
        Shimmer: ThatIsMeShimmer
    },
    [REG_FORM]: {
        Component: lazy(() => import('./RegForm')),
        Shimmer: RegFormShimmer
    }
};
