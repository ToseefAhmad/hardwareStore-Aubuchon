import { array, arrayOf, shape, string } from 'prop-types';
import React, { useMemo, useCallback, useState, Suspense } from 'react';
import { useIntl } from 'react-intl';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useDropdown } from '@magento/peregrine/lib/hooks/useDropdown';

import Button from '@app/components/Button';
import Icon from '@app/components/Icon';
import {
    ChevronDown,
    ArrowDown,
    Close as CloseIcon
} from '@app/components/Icons';
import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';
import { useTailwindContext } from '@app/context/tailwind';

import { FilterModalShimmer } from '../FilterModal';
import classes from './sortButton.module.css';
import SortItem from './sortItem';

const excludeSortLabels = {
    turnto_rating: 'Top Rated',
    price: 'Price',
    position: 'Position'
};

const SortButton = ({ availableSortMethods, sortProps }) => {
    const [currentSort, setSort] = sortProps;
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const [selectedSortOption, setSelectedSortOption] = useState({});
    const { elementRef, expanded, setExpanded } = useDropdown();
    const { locale } = useIntl();

    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    const orderSortingList = useCallback(
        list => {
            return list.sort((a, b) => {
                return a.text.localeCompare(b.text, locale, {
                    sensitivity: 'base'
                });
            });
        },
        [locale]
    );

    const sortMethodsFromConfig = useMemo(() => {
        return availableSortMethods
            ? availableSortMethods
                  .map(method => {
                      const { value, label } = method;
                      if (!Object.keys(excludeSortLabels).includes(value)) {
                          return {
                              id: `sortItem.${value}`,
                              text: label,
                              attribute: value,
                              sortDirection:
                                  value === 'relevance' ? 'DESC' : 'ASC'
                          };
                      }
                  })
                  .filter(method => !!method)
            : null;
    }, [availableSortMethods]);

    // click event for menu items
    const handleItemClick = useCallback(
        sortAttribute => {
            const currentOption = {
                sortText:
                    excludeSortLabels[sortAttribute.attribute] ||
                    sortAttribute.text,
                sortId: sortAttribute.id,
                sortAttribute: sortAttribute.attribute,
                sortDirection: sortAttribute.sortDirection
            };

            if (isMobile) {
                setSelectedSortOption({
                    ...currentOption,
                    sortFromSearch: currentSort.sortFromSearch
                });
            } else {
                setSort(prevSort => {
                    return {
                        ...currentOption,
                        sortFromSearch: prevSort.sortFromSearch
                    };
                });
                setExpanded(false);
            }
        },
        [currentSort, isMobile, setExpanded, setSelectedSortOption, setSort]
    );

    const sortElements = useMemo(() => {
        // should be not render item in collapsed mode.
        if (!expanded && !isMobile) {
            return null;
        }

        const defaultSortMethods = [
            {
                id: 'sortItem.priceAsc',
                text: 'Price - Low to High',
                attribute: 'price',
                sortDirection: 'ASC'
            },
            {
                id: 'sortItem.priceDesc',
                text: 'Price - High to Low',
                attribute: 'price',
                sortDirection: 'DESC'
            },
            {
                id: 'sortItem.turnto_rating',
                text: 'Top Rated',
                attribute: 'turnto_rating',
                sortDirection: 'DESC'
            }
        ];

        const allSortingMethods = sortMethodsFromConfig
            ? orderSortingList(
                  [sortMethodsFromConfig, defaultSortMethods].flat()
              )
            : defaultSortMethods;

        const itemElements = Array.from(allSortingMethods, sortItem => {
            const { attribute, sortDirection } = sortItem;
            const isActive =
                (currentSort.sortAttribute === attribute &&
                    currentSort.sortDirection === sortDirection &&
                    !selectedSortOption.sortAttribute) ||
                (selectedSortOption.sortAttribute === attribute &&
                    selectedSortOption.sortDirection === sortDirection);

            const key = `${attribute}--${sortDirection}`;
            return (
                <li key={key} className={classes.menuItem}>
                    <SortItem
                        sortItem={sortItem}
                        active={isActive}
                        onClick={handleItemClick}
                    />
                </li>
            );
        });

        return (
            <div className={classes.menu}>
                <ul>{itemElements}</ul>
            </div>
        );
    }, [
        currentSort.sortAttribute,
        currentSort.sortDirection,
        expanded,
        isMobile,
        handleItemClick,
        orderSortingList,
        selectedSortOption.sortAttribute,
        selectedSortOption.sortDirection,
        sortMethodsFromConfig
    ]);

    const handleSortClick = useCallback(() => {
        if (isMobile) {
            toggleModal({
                identifier: MODAL_NAMES.sort
            });
            setSelectedSortOption(currentSort);
        } else {
            setExpanded(!expanded);
        }
    }, [currentSort, expanded, isMobile, setExpanded, toggleModal]);

    const handleClose = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    const applySort = useCallback(() => {
        setSort(selectedSortOption);
        toggleModal();
    }, [selectedSortOption, toggleModal, setSort]);

    const directionIcon =
        currentSort.sortDirection === 'DESC' ? (
            <span className={classes.desc}>
                <Icon src={ArrowDown} />
            </span>
        ) : (
            <span className={classes.asc}>
                <Icon src={ArrowDown} />
            </span>
        );

    const showDirectionIcon = currentSort.sortAttribute === 'price';

    return (
        <div ref={elementRef} className={classes.root}>
            <div className={classes.sortByBlock}>
                <p className={classes.sortByText}>Sort by:</p>
            </div>
            <Button
                classes={{
                    secondary: classes.sortButton,
                    content: classes.sortButtonContent
                }}
                onClick={handleSortClick}
            >
                <span className={classes.mobileText}>Sort:</span>
                <span className={classes.desktopText}>
                    <span className={classes.sortText}>
                        {currentSort.sortText}
                        {showDirectionIcon && directionIcon}
                    </span>
                    <span className={classes.icon}>
                        <Icon src={ChevronDown} />
                    </span>
                </span>
            </Button>
            {!isMobile && sortElements}
            {isMobile && (
                <SimpleModal fullHeight={false} modalName={MODAL_NAMES.sort}>
                    <Suspense fallback={<FilterModalShimmer itemsNumber={4} />}>
                        <>
                            <div className={classes.header}>
                                <h2 className={classes.headerTitle}>Sort By</h2>

                                <button
                                    onClick={handleClose}
                                    className={classes.mobileButton}
                                >
                                    <Icon src={CloseIcon} />
                                </button>
                            </div>
                            {sortElements}
                            <div className={classes.footer}>
                                <Button
                                    onPress={applySort}
                                    aria-label="Apply Sort"
                                    priority="high"
                                >
                                    Sort By
                                </Button>
                            </div>
                        </>
                    </Suspense>
                </SimpleModal>
            )}
        </div>
    );
};

SortButton.propTypes = {
    availableSortMethods: arrayOf(
        shape({
            label: string,
            value: string
        })
    ),
    sortProps: array
};

export default SortButton;
