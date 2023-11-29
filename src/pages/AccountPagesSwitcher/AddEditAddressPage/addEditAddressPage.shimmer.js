import React from 'react';

import { useWindowSize } from '@magento/peregrine';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import Section from '@app/components/Section';
import { useTailwindContext } from '@app/context/tailwind';

import classes from './EditForm/editForm.module.css';

const AddEditAddressPageShimmer = () => {
    const tailwind = useTailwindContext();
    const windowSize = useWindowSize();

    const isMobile = windowSize.innerWidth < tailwind.screens.lg;

    return (
        <div className={classes.root}>
            <fieldset className={classes.fieldset}>
                <div>
                    <Shimmer height={1} width={8} borderRadius={0.5} />
                    <Shimmer
                        height={3.5}
                        width="100%"
                        borderRadius={0.5}
                        style={{ marginBottom: 6 }}
                    />
                </div>
                <div>
                    <Shimmer height={1} width={8} borderRadius={0.5} />
                    <Shimmer
                        height={3.5}
                        width="100%"
                        borderRadius={0.5}
                        style={{ marginBottom: 6 }}
                    />
                </div>
                <div>
                    <Shimmer height={1} width={8} borderRadius={0.5} />
                    <Shimmer
                        height={3.5}
                        width="100%"
                        borderRadius={0.5}
                        style={{ marginBottom: 6 }}
                    />
                </div>
                <div>
                    <Shimmer height={1} width={8} borderRadius={0.5} />
                    <Shimmer
                        height={3.5}
                        width="100%"
                        borderRadius={0.5}
                        style={{ marginBottom: 6 }}
                    />
                </div>
            </fieldset>
            <Section>
                <Shimmer
                    height={isMobile ? '32px' : '44px'}
                    width={isMobile ? '100%' : '284px'}
                    borderRadius="5px"
                />
                <fieldset className={classes.fieldset}>
                    <div>
                        <Shimmer height={1} width={8} borderRadius={0.5} />
                        <Shimmer
                            height={3.5}
                            width="100%"
                            borderRadius={0.5}
                            style={{ marginBottom: 6 }}
                        />
                    </div>
                    <div>
                        <Shimmer height={1} width={8} borderRadius={0.5} />
                        <Shimmer
                            height={3.5}
                            width="100%"
                            borderRadius={0.5}
                            style={{ marginBottom: 6 }}
                        />
                    </div>
                    <div>
                        <Shimmer height={1} width={8} borderRadius={0.5} />
                        <Shimmer
                            height={3.5}
                            width="100%"
                            borderRadius={0.5}
                            style={{ marginBottom: 6 }}
                        />
                    </div>
                    <div>
                        <Shimmer height={1} width={8} borderRadius={0.5} />
                        <Shimmer
                            height={3.5}
                            width="100%"
                            borderRadius={0.5}
                            style={{ marginBottom: 6 }}
                        />
                    </div>
                </fieldset>
                <fieldset className={classes.checkboxes}>
                    <Shimmer height={1.5} width={18} borderRadius={0.5} />
                    <Shimmer height={1.5} width={18} borderRadius={0.5} />
                </fieldset>
            </Section>
            <fieldset className={classes.buttons}>
                <div className={classes.buttonWrap}>
                    <Shimmer height={3.5} width="100%" borderRadius={0.5} />
                </div>
                <div className={classes.buttonWrap}>
                    <Shimmer height={3.5} width="100%" borderRadius={0.5} />
                </div>
            </fieldset>
        </div>
    );
};

export default AddEditAddressPageShimmer;
