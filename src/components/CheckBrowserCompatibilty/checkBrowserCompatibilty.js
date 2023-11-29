import React from 'react';

import Icon from '@app/components/Icon';
import { Close as CloseIcon } from '@app/components/Icons';
import SimpleModal from '@app/components/SimpleModal';

import classes from './checkBrowserCompatibility.module.css';
import { useCheckBrowserCompatibilty } from './useCheckBrowserCompatibilty';

const CheckBrowserCompatibility = () => {
    const { handleCloseModal, handleUpdate } = useCheckBrowserCompatibilty();

    return (
        <>
            <SimpleModal
                fullHeight={false}
                modalName="browserUpdateModal"
                className={classes.modal}
            >
                <section className={classes.browser_compatibility_wrapper}>
                    <section className={classes.cancel_button_wrapper}>
                        <button
                            onClick={handleCloseModal}
                            className={classes.cancel_button}
                        >
                            <Icon src={CloseIcon} />
                        </button>
                    </section>
                    <header className={classes.button_wrapper}>
                        <div className={classes.content_wrapper}>
                            <p>Incompatible Browser Version</p>
                        </div>
                    </header>
                    <div className={classes.message}>
                        <p>
                            The version of your browser is outdated and no
                            longer supported.
                        </p>
                    </div>
                    <section className={classes.close_button_wrapper}>
                        <button
                            onClick={handleUpdate}
                            className={classes.close_btn}
                        >
                            Update Browser
                        </button>
                    </section>
                </section>
            </SimpleModal>
        </>
    );
};
export default CheckBrowserCompatibility;
