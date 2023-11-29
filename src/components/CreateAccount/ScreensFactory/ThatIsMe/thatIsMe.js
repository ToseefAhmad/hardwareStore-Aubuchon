import React from 'react';
import { FormattedMessage } from 'react-intl';

import ThatIsMeScreenForm from './Form';
import classes from './thatIsMe.module.css';
import { useThatIsMeScreen } from './useThatIsMeScreen';

const ThatIsMeScreen = () => {
    const {
        isLoading,
        radioListData,
        handleSubmit,
        handleCancel
    } = useThatIsMeScreen();

    return (
        <>
            <p className={classes.paragraph}>
                <FormattedMessage
                    id="thatIsMeScreen.descriptionText"
                    defaultMessage="Did we find you?"
                />
            </p>
            <ThatIsMeScreenForm
                radioListData={radioListData}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
            />
        </>
    );
};

export default ThatIsMeScreen;
