import PropTypes, { array, shape, string, number } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './tabs.module.css';
import { TabsContext } from './tabsContext';
import { useTabs } from './useTabs';

const Tabs = props => {
    const { children, name, initialTabKey, contentRef } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const {
        currentTabContent,
        underlineRef,
        tabsContainerRef,
        tabsRef,
        tabsState,
        activeTab,
        goToTab,
        activeTabElementRef
    } = useTabs({
        children,
        initialTabKey,
        name
    });

    const contextValue = [
        { tabsState, activeTab, activeTabElementRef },
        { goToTab }
    ];

    return (
        <TabsContext.Provider value={contextValue}>
            <div className={classes.tabsContainer} ref={tabsContainerRef}>
                <ul className={classes.tabs} ref={tabsRef}>
                    {children}
                </ul>
                <div
                    className={classes.tabUnderline}
                    role="presentation"
                    ref={underlineRef}
                />
            </div>
            <div ref={contentRef} className={classes.tabContent}>
                {currentTabContent}
            </div>
        </TabsContext.Provider>
    );
};

Tabs.propTypes = {
    classes: shape({
        tabsContainer: string,
        tabs: string,
        tabUnderline: string,
        tabContent: string
    }),
    children: array.isRequired,
    name: string,
    initialTabKey: number.isRequired,
    contentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};

export default Tabs;
