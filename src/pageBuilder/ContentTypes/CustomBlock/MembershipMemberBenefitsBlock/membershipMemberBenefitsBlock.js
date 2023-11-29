import parse from 'html-react-parser';
import { string } from 'prop-types';
import React, { useMemo } from 'react';

import {
    StarEmpty,
    ShoppingBag,
    Mail,
    Gift,
    Percentage
} from '@app/components/Icons';

import classes from './membershipMemberBenefitsBlock.module.css';

const MembershipMemberBenefitsBlock = ({ richContent }) => {
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
            StarEmpty,
            ShoppingBag,
            Mail,
            Gift,
            Percentage
        };

        // It will be used as dynamic name for component name in JSX.
        const DynamicComponent = [];

        imageNames.forEach((item, index) => {
            DynamicComponent.push(
                React.createElement(componentsMap[item], {
                    key: index
                })
            );
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

MembershipMemberBenefitsBlock.propTypes = {
    richContent: string.isRequired
};

export default MembershipMemberBenefitsBlock;
