import { string } from 'prop-types';
import React from 'react';

import classes from './video.module.css';

const Video = ({ embedId }) => {
    return (
        <div className={classes.root}>
            <iframe
                className={classes.video}
                src={`https://www.youtube.com/embed/${embedId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
            />
        </div>
    );
};

Video.propTypes = {
    embedId: string.isRequired
};

export default Video;
