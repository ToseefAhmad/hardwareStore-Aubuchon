import classnames from 'classnames';
import React, { Suspense, useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import SimpleModal, { MODAL_NAMES } from '@app/components/SimpleModal';

import { CONTENT_COMPONENTS, TYPES } from './config';
import classes from './warningDialog.module.css';

const WarningDialog = () => {
    const [{ modal }] = useAppContext();

    const Component = useMemo(
        () => CONTENT_COMPONENTS[(modal?.props?.type)]?.Component,
        [modal?.props?.type]
    );

    const ComponentShimmer = useMemo(
        () => CONTENT_COMPONENTS[modal?.props?.type || TYPES.warning].Shimmer,
        [modal?.props?.type]
    );

    return (
        <SimpleModal
            className={classnames(classes.modalContainer, {
                [classes.specialOrder]:
                    modal?.props?.type === TYPES.specialOrder
            })}
            modalName={MODAL_NAMES.warning}
        >
            <Suspense
                fallback={
                    <ComponentShimmer
                        isSpecialOrder={
                            modal?.props?.type === TYPES.specialOrder
                        }
                    />
                }
            >
                {Component ? <Component /> : null}
            </Suspense>
        </SimpleModal>
    );
};

export default WarningDialog;
