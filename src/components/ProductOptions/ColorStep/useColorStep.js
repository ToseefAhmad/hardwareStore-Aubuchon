import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useWindowSize } from '@magento/peregrine';
import { useAppContext } from '@magento/peregrine/lib/context/app';

import { MODAL_NAMES } from '@app/components/SimpleModal';
import { useTailwindContext } from '@app/context/tailwind';

import operations from './colorStep.gql';

export const useColorStep = ({ setColor }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();
    const windowSize = useWindowSize();
    const tailwind = useTailwindContext();
    const [activeOption, setActiveOption] = useState({});
    const [selectedOption, setSelectedOption] = useState({});

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;
    const [selectResult, setSelectResult] = useState([]);

    const [getPaintColors, { data, loading }] = useLazyQuery(
        operations.queries.getProductPaintColorsQuery,
        {
            fetchPolicy: 'no-cache'
        }
    );

    const { paintColors } = useMemo(() => data || {}, [data]);

    const debouncedOnChange = useMemo(
        () =>
            debounce(val => {
                setSearchTerm(val);
            }, 350),
        [setSearchTerm]
    );

    const handleSearch = useCallback(value => debouncedOnChange(value), [
        debouncedOnChange
    ]);

    const handleOpenModal = useCallback(() => {
        getPaintColors();
        setActiveOption({});
        setSearchTerm('');
        toggleModal({
            identifier: MODAL_NAMES.color
        });
    }, [getPaintColors, toggleModal]);

    const handleChooseColor = useCallback(() => {
        setSelectedOption(activeOption);
        setColor(activeOption);

        toggleModal();
        handleSearch('');
    }, [activeOption, setColor, handleSearch, toggleModal]);

    const isColorChosen = useMemo(() => {
        return activeOption && Object.keys(activeOption).length;
    }, [activeOption]);

    const isVirtualize = useMemo(() => paintColors?.length > 70, [
        paintColors?.length
    ]);

    useEffect(() => {
        setSelectResult(paintColors || []);
    }, [paintColors]);

    return {
        toggleModal,
        modalName: MODAL_NAMES.color,
        searchTerm,
        selectResult,
        setSelectResult,
        isMobile,
        activeOption,
        setActiveOption,
        selectedOption,
        colors: paintColors || [],
        handleSearch,
        handleOpenModal,
        handleChooseColor,
        isColorChosen,
        isVirtualize,
        loading
    };
};
