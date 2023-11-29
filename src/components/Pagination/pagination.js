import { func, number, shape, string } from 'prop-types';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { usePagination } from '@magento/peregrine/lib/talons/Pagination/usePagination';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { navButtons } from './constants';
import NavButton from './navButton';
import defaultClasses from './pagination.module.css';
import Tile from './tile';

const Pagination = props => {
    const { currentPage, setPage, totalPages } = props.pageControl;
    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, props.classes);

    const talonProps = usePagination({
        currentPage,
        setPage,
        totalPages
    });

    const {
        handleNavBack,
        handleNavForward,
        isActiveLeft,
        isActiveRight,
        tiles
    } = talonProps;

    const navigationTiles = useMemo(
        () =>
            tiles.map(tileNumber => {
                return (
                    <Tile
                        isActive={tileNumber === currentPage}
                        key={tileNumber}
                        number={tileNumber}
                        onClick={setPage}
                    />
                );
            }),
        [setPage, currentPage, tiles]
    );

    if (totalPages === 1) {
        return null;
    }

    return (
        <div className={classes.root} data-cy="Pagination-root">
            <NavButton
                name={navButtons.prevPage.name}
                active={isActiveLeft}
                onClick={handleNavBack}
                buttonLabel={formatMessage({
                    id: 'pagination.prevPage',
                    defaultMessage: navButtons.prevPage.buttonLabel
                })}
            />
            <div className={classes.tiles}>{navigationTiles}</div>
            <NavButton
                name={navButtons.nextPage.name}
                active={isActiveRight}
                onClick={handleNavForward}
                buttonLabel={formatMessage({
                    id: 'pagination.nextPage',
                    defaultMessage: navButtons.nextPage.buttonLabel
                })}
            />
        </div>
    );
};

Pagination.propTypes = {
    classes: shape({
        root: string,
        tiles: string
    }),
    pageControl: shape({
        currentPage: number,
        setPage: func,
        totalPages: number
    }).isRequired
};

export default Pagination;
