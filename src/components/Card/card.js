import { node, shape, string } from 'prop-types';
import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';

import CardActions from './Actions';
import CardBody from './Body';
import defaultClasses from './card.module.css';
import CardTitle from './Title';

const Card = props => {
    const { children, classes: propClasses } = props;

    const classes = useStyle(defaultClasses, propClasses);

    return <section className={classes.root}>{children}</section>;
};

Card.propTypes = {
    children: node,
    classes: shape({
        root: string
    })
};

Card.Body = CardBody;
Card.Title = CardTitle;
Card.Actions = CardActions;

export default Card;
