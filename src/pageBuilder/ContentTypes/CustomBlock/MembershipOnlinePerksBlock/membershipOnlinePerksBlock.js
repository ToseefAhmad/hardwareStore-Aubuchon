import parse from 'html-react-parser';
import { string } from 'prop-types';
import React, { useMemo } from 'react';

import {
    Bookmark,
    Percentage15,
    CreditCard,
    Coupon,
    Refresh,
    Car,
    Percentage30
} from '@app/components/Icons';

import classes from './membershipOnlinePerksBlock.module.css';

const MembershipOnlinePerksBlock = ({ richContent }) => {
    // Elements which come from CMS page or block content.
    const container = useMemo(() => {
        let resultStrOfImages = '';
        let resultStrOfText = '';

        const imagesContainer = document.createElement('div');
        const simpleTextContainer = document.createElement('div');

        imagesContainer.innerHTML = richContent;
        simpleTextContainer.innerHTML = richContent;

        const imageArray = imagesContainer.getElementsByClassName(
            'pagebuilder-mobile-hidden'
        );
        const textArray = simpleTextContainer.querySelectorAll('p');

        imageArray.length &&
            Array.from(imageArray).forEach(({ outerHTML }) => {
                resultStrOfImages += outerHTML;
            });
        textArray.length &&
            Array.from(textArray).forEach(({ outerHTML }) => {
                resultStrOfText += outerHTML;
            });

        const images = resultStrOfImages.length ? parse(resultStrOfImages) : [];
        const text = resultStrOfText.length ? parse(resultStrOfText) : '';

        // Formats file names to keep only first part of file name before dot.
        const imageNames = images.map(
            item =>
                item.props.src
                    .split('/')
                    .pop()
                    .split('.')[0]
        );

        // SVG icons to replace PNG (or other supported formats in Magento). Imported from @app/components/Icons.
        const componentsMap = {
            Bookmark,
            Percentage30,
            Percentage15,
            CreditCard,
            Coupon,
            Refresh,
            Car
        };

        // It will be used as dynamic name for component name in JSX.
        const DynamicComponent = [];

        imageNames.forEach((item, index) => {
            if (componentsMap[item]) {
                DynamicComponent.push(
                    React.createElement(componentsMap[item], {
                        key: index
                    })
                );
            } else {
                DynamicComponent.push(null);
            }
        });

        // An array to store all elements: icons and text.
        const textAndImageContainer = [];

        // One icon and one text are grouped together in one div.
        if (DynamicComponent.length === text.length) {
            DynamicComponent.forEach((item, index) => {
                textAndImageContainer.push(
                    <div key={index} className={classes.textAndImageContainer}>
                        <div className={classes.imgItem}>{item}</div>
                        <div className={classes.textItem}>{text[index]}</div>
                    </div>
                );
            });
        }

        return { textAndImageContainer: textAndImageContainer };
    }, [richContent]);

    const { textAndImageContainer } = container;

    return <div className={classes.root}>{textAndImageContainer}</div>;
};

MembershipOnlinePerksBlock.propTypes = {
    richContent: string.isRequired
};

export default MembershipOnlinePerksBlock;
