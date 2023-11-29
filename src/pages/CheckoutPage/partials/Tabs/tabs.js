import React from 'react';

import { useCheckoutPageContext } from '../../context';

import Tab from './Tab';
import classes from './tabs.module.css';

const Tabs = () => {
    const [
        { tabs, activeTabKey, allowedTabKeys },
        { changeActiveTab }
    ] = useCheckoutPageContext();

    return (
        <ul className={classes.root}>
            {tabs.map(({ key, label }, idx) => (
                <Tab
                    key={key}
                    idx={idx + 1}
                    label={label}
                    isAllowed={allowedTabKeys.includes(key)}
                    isActive={activeTabKey === key}
                    onTabClick={() => changeActiveTab(key)}
                />
            ))}
        </ul>
    );
};

export default Tabs;
