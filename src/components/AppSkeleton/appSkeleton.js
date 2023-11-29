import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import cartTriggerClasses from '@app/components/Header/CartTrigger/cartTrigger.module.css';
import headerClasses from '@app/components/Header/header.module.css';
import membershipTriggerClasses from '@app/components/Header/MembershipTrigger/membershipTrigger.module.css';
import topBarClasses from '@app/components/Header/TopBar/topBar.module.css';
import mainClasses from '@app/components/Main/main.module.css';
import { useTailwindContext } from '@app/context/tailwind';

const AppSkeleton = () => {
    const { screens } = useTailwindContext();
    const { innerWidth } = useWindowSize();
    const isMobile = innerWidth < screens.lg;

    return (
        <main
            className={mainClasses.root}
            style={{
                '--brand-primary-color': '#D7D8D9'
            }}
        >
            <header className={headerClasses.root}>
                {!isMobile && <div className={topBarClasses.root} />}
                <div className={headerClasses.toolbar}>
                    <div className={headerClasses.primaryActions}>
                        <Shimmer
                            width={isMobile ? 1 : 1.25}
                            height={isMobile ? 1 : 1.25}
                        />
                    </div>
                    <div className={headerClasses.logoContainer}>
                        <Shimmer
                            width={isMobile ? '118px' : '157px'}
                            height={isMobile ? 1.5 : 2}
                        />
                    </div>
                    {!isMobile && (
                        <>
                            <div className={headerClasses.switchersContainer}>
                                <div className={headerClasses.switchers}>
                                    <Shimmer
                                        width="100%"
                                        height="100%"
                                        style={{ verticalAlign: 'top' }}
                                    />
                                </div>
                            </div>
                            <div className={headerClasses.secondaryActions}>
                                <Shimmer
                                    width="100%"
                                    height="50px"
                                    style={{ verticalAlign: 'top' }}
                                />
                            </div>
                        </>
                    )}
                    <div
                        className={membershipTriggerClasses.root}
                        style={{ minHeight: '45px' }}
                    >
                        <Shimmer
                            width={isMobile ? '124px' : '129px'}
                            height={isMobile ? '40px' : '44px'}
                            style={{ verticalAlign: 'top' }}
                        />
                    </div>
                    {!isMobile && (
                        <div className={cartTriggerClasses.root}>
                            <Shimmer
                                width={'127px'}
                                height={'44px'}
                                style={{ verticalAlign: 'top' }}
                            />
                        </div>
                    )}
                </div>
            </header>
            {isMobile && (
                <div className={headerClasses.mobileSearch}>
                    <Shimmer width="100%" height="40px" />
                </div>
            )}
            <Shimmer
                width="100%"
                height="calc(100vh - 140px)"
                style={{
                    verticalAlign: 'top'
                }}
            />
        </main>
    );
};

export default AppSkeleton;
