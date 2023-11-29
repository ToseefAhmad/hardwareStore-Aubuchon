import React, { useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Trigger from '@magento/venia-ui/lib/components/Trigger';

import Icon from '@app/components/Icon';
import { Close as CloseIcon, ChevronLeftSmall } from '@app/components/Icons';

import Filter from '../Filter';
import { useProductLayeredListingContext } from '../ProductLayeredListingContext';
import classes from './content.module.css';
import FilterList from './filterList';
import Footer from './footer';

const Content = () => {
    const {
        filterApi,
        filterState,
        handleClose,
        handleReset,
        handleApply,
        activeFilter,
        setActiveFilter,
        handleBack,
        filterItems,
        filterNames
    } = useProductLayeredListingContext();

    const filtersList = useMemo(
        () =>
            Array.from(filterItems, ([group]) => (
                <FilterList
                    key={group}
                    name={filterNames.get(group)}
                    activeAmount={filterState.get(group)?.size || 0}
                    handleClick={() => {
                        setActiveFilter(group);
                    }}
                />
            )),
        [filterItems, filterNames, filterState, setActiveFilter]
    );

    const content = useMemo(() => {
        if (!filterNames.get(activeFilter)) {
            return null;
        }

        return (
            <Filter
                filterApi={filterApi}
                filterState={filterState.get(activeFilter)}
                group={activeFilter}
                items={filterItems.get(activeFilter)}
                name={filterNames.get(activeFilter)}
            />
        );
    }, [filterApi, filterState, activeFilter, filterItems, filterNames]);

    return (
        <>
            <div
                className={!activeFilter ? classes.headerRoot : classes.header}
            >
                {activeFilter && (
                    <Trigger key="backButton" action={handleBack}>
                        <span className={classes.buttonBack}>
                            <Icon src={ChevronLeftSmall} />
                        </span>
                    </Trigger>
                )}
                <h2 className={classes.headerTitle}>
                    {!activeFilter ? 'Filters' : filterNames?.get(activeFilter)}
                </h2>
                <button
                    onClick={handleClose}
                    aria-disabled={false}
                    aria-label="Close filters popup."
                    className={classes.mobileButton}
                >
                    <Icon src={CloseIcon} />
                </button>
            </div>
            <div className={classes.contentContainer}>
                <TransitionGroup>
                    {!activeFilter && (
                        <CSSTransition
                            classNames="navTransitionLeft"
                            timeout={300}
                            key="rootFilters"
                        >
                            <ul aria-label="Filters">{filtersList}</ul>
                        </CSSTransition>
                    )}
                    {activeFilter && (
                        <CSSTransition
                            classNames="navTransition"
                            timeout={300}
                            key={activeFilter}
                        >
                            {content}
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
            <Footer
                applyFilters={handleApply}
                hasFilters={!!filterState.size}
                handleBack={handleBack}
                handleReset={handleReset}
                number={filterState.size}
                activeFilter={activeFilter}
            />
        </>
    );
};

export default Content;
