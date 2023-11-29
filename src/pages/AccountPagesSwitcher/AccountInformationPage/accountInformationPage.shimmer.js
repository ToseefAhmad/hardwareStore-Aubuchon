import React from 'react';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import classes from './EditForm/editForm.module.css';

const AccountInformationPageShimmer = () => (
    <section>
        <div className={classes.fieldset}>
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
                <Shimmer height={3.5} width="100%" borderRadius={0.5} />
            </div>
        </div>
        <div className={classes.checkboxes}>
            <Shimmer height={1.5} width={10} borderRadius={0.5} />
            <Shimmer height={1.5} width={12} borderRadius={0.5} />
        </div>
        <div className={classes.buttons}>
            <div className={classes.buttonWrap}>
                <Shimmer height={3.5} width="100%" borderRadius={0.5} />
            </div>
        </div>
    </section>
);

export default AccountInformationPageShimmer;
