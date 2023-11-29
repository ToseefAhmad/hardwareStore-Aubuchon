import { string, func } from 'prop-types';
import React from 'react';

import Link from '@app/components/Link';

const HelpfulLink = ({ link, name, onNavigate }) => {
    return (
        <Link to={link} onClick={onNavigate}>
            {name}
        </Link>
    );
};

HelpfulLink.propTypes = {
    link: string.isRequired,
    name: string.isRequired,
    onNavigate: func
};

HelpfulLink.defaultProps = {
    onNavigate: () => {}
};

export default HelpfulLink;
