import { string, shape, number } from 'prop-types';
import React, { forwardRef } from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './tab.module.css';
import { useTabsContext } from './tabsContext';

const Tab = forwardRef((props, ref) => {
    const { tab, tabKey } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const [{ activeTab, activeTabElementRef }, { goToTab }] = useTabsContext();

    return (
        <li
            className={classes.root}
            ref={activeTab === tabKey ? activeTabElementRef : null}
        >
            <button
                ref={ref}
                className={classes.tabButton}
                type="button"
                onClick={() => goToTab({ tabKey })}
            >
                {tab}
            </button>
        </li>
    );
});

Tab.propTypes = {
    classes: shape({
        root: string,
        tabButton: string
    }),
    tab: string.isRequired,
    tabKey: number.isRequired
};

Tab.displayName = 'Tab';

export default Tab;
