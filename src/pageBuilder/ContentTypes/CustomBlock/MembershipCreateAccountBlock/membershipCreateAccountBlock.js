import { APP_AUTH_MODAL_SIGN_UP_TAB_KEY } from '@app-constants';
import parse from 'html-react-parser';
import { string } from 'prop-types';
import React, { useMemo } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';

import Button from '@app/components/Button';
import RichContent from '@app/components/RichContent';
import { MODAL_NAMES } from '@app/components/SimpleModal';

import classes from './membershipCreateAccountBlock.module.css';

const MembershipCreateAccountBlock = ({ richContent }) => {
    const [
        ,
        {
            actions: { toggleModal }
        }
    ] = useAppContext();

    // Elements which come from CMS page or block content.
    const container = useMemo(() => {
        let resultStrOfButton = '';

        const buttonTextContainer = document.createElement('div');

        buttonTextContainer.innerHTML = richContent;

        const buttonArray = buttonTextContainer.getElementsByClassName(
            'createAccountButton'
        );

        buttonArray.length &&
            Array.from(buttonArray).forEach(({ outerHTML }) => {
                resultStrOfButton += outerHTML;
            });

        return {
            buttonText: resultStrOfButton.length ? parse(resultStrOfButton) : []
        };
    }, [richContent]);

    const { buttonText } = container;

    return (
        <div className={classes.root}>
            <RichContent html={richContent} />
            <Button
                onClick={() =>
                    toggleModal({
                        identifier: MODAL_NAMES.auth,
                        props: {
                            initialTabKey: APP_AUTH_MODAL_SIGN_UP_TAB_KEY
                        }
                    })
                }
                classes={{ secondary: classes.createAccountButton }}
            >
                {buttonText}
            </Button>
        </div>
    );
};

MembershipCreateAccountBlock.propTypes = {
    richContent: string.isRequired
};

export default MembershipCreateAccountBlock;
