import { useEffect, useState, useRef, useCallback } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

const INITIAL_TABS_STATE = {};

export const useTabs = ({ children, initialTabKey, name }) => {
    const [tabsState, setTabsState] = useState(INITIAL_TABS_STATE);
    const [activeTab, setActiveTab] = useState(initialTabKey);
    const [activeTabElementLeft, setActiveTabElementLeft] = useState();
    const [activeTabElementWidth, setActiveTabElementWidth] = useState();
    const [tabsContainerWidth, setTabsContainerWidth] = useState();
    const [tabsContainerOffset, setTabsContainerOffset] = useState();
    const activeTabElementRef = useRef();
    const underlineRef = useRef();
    const tabsContainerRef = useRef();
    const tabsRef = useRef();
    const [, { dispatch }] = useEventingContext();

    const { innerWidth: windowWidth } = useWindowSize();

    const currentTabContent = children.find(
        tab => tab.props.tabKey === activeTab
    )?.props?.children;

    const updateActiveTabElementLeft = useCallback(() => {
        setActiveTabElementLeft(
            activeTabElementRef.current?.getBoundingClientRect().left
        );
    }, []);

    const goToTab = useCallback(
        ({ tabKey, state }) => {
            const updatedTabsState = state ? { ...state } : INITIAL_TABS_STATE;

            setTabsState(updatedTabsState);
            setActiveTab(tabKey);

            dispatch({
                type: `SWITCH_TABS${name ? `__${name}` : ''}`,
                payload: {
                    tabKey
                }
            });
        },
        [name, dispatch]
    );

    // Set initial active tab
    useEffect(() => {
        setActiveTab(initialTabKey);
    }, [initialTabKey]);

    // Update underline width when active tab or screen size changes
    useEffect(() => {
        setActiveTabElementWidth(activeTabElementRef.current?.offsetWidth);
    }, [activeTab, tabsContainerWidth]);

    // Update underline left position when active tab or screen size changes
    useEffect(() => {
        updateActiveTabElementLeft();
    }, [
        activeTab,
        tabsContainerWidth,
        updateActiveTabElementLeft,
        windowWidth
    ]);

    // On mobile, adjusts the position of underline on tabs vertical scroll
    useEffect(() => {
        const tabsElement = tabsRef.current;
        tabsElement.addEventListener('scroll', updateActiveTabElementLeft);

        return () => {
            tabsElement.removeEventListener(
                'scroll',
                updateActiveTabElementLeft
            );
        };
    }, [updateActiveTabElementLeft]);

    // Updates size and position of underline
    useEffect(() => {
        underlineRef.current.style.width = `${activeTabElementWidth}px`;
        underlineRef.current.style.left = `${activeTabElementLeft -
            tabsContainerOffset}px`;
    }, [
        activeTab,
        activeTabElementWidth,
        activeTabElementLeft,
        tabsContainerOffset,
        tabsContainerWidth
    ]);

    // Scrolls active tab into view if it was not fully visible when selected
    useEffect(() => {
        const left = activeTabElementRef.current?.getBoundingClientRect().left;
        const right = activeTabElementRef.current?.getBoundingClientRect()
            .right;

        if (left < 0 || right > tabsContainerWidth) {
            tabsRef.current.scrollTo({
                left,
                behavior: 'smooth'
            });
        }
    }, [activeTab, tabsContainerWidth]);

    useEffect(() => {
        setTabsContainerWidth(tabsContainerRef.current?.offsetWidth);
        setTabsContainerOffset(
            tabsContainerRef.current?.getBoundingClientRect().left
        );
    }, [windowWidth]);

    return {
        currentTabContent,
        underlineRef,
        tabsContainerRef,
        tabsRef,
        tabsState,
        activeTab,
        goToTab,
        activeTabElementRef
    };
};
