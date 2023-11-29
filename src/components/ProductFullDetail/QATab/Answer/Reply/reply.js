import { string, shape } from 'prop-types';
import React from 'react';

import classes from './reply.module.css';
import { useReply } from './useReply';

const Reply = ({ reply }) => {
    const { nickName } = useReply({ reply });
    return (
        <>
            <p>{reply.text}</p>
            <div className={classes.details}>
                <span>{nickName}</span>
                <span className={classes.date}>
                    {reply.dateCreatedFormatted}
                </span>
            </div>
        </>
    );
};

Reply.propTypes = {
    reply: shape({
        text: string.isRequired,
        dateCreatedFormatted: string.isRequired
    })
};

export default Reply;
