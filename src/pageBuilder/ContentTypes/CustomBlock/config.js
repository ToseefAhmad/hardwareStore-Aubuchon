import { lazy } from 'react';

import { detectFAQBlock } from './FAQBlock';
import { detectMembershipCreateAccountBlock } from './MembershipCreateAccountBlock';
import MembershipMemberBenefitsBlock, {
    detectMembershipMemberBenefitsBlock
} from './MembershipMemberBenefitsBlock';
import MembershipOnlinePerksBlock, {
    detectMembershipOnlinePerksBlock
} from './MembershipOnlinePerksBlock';

export const CUSTOM_BLOCKS_CONFIG = [
    {
        detectFn: detectFAQBlock,
        component: lazy(() => import('./FAQBlock'))
    },
    {
        detectFn: detectMembershipCreateAccountBlock,
        component: lazy(() => import('./MembershipCreateAccountBlock'))
    },
    {
        detectFn: detectMembershipMemberBenefitsBlock,
        component: MembershipMemberBenefitsBlock
    },
    {
        detectFn: detectMembershipOnlinePerksBlock,
        component: MembershipOnlinePerksBlock
    }
];
