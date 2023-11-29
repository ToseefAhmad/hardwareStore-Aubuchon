import { useMemo } from 'react';

export const useReply = ({ reply }) => {
    const nickName = useMemo(() => {
        const lastNameInitial = reply?.user?.lastName[0]
            ? `${reply.user.lastName[0]}.`
            : '';
        return (
            reply?.user?.nickName ||
            `${reply?.user?.firstName} ${lastNameInitial}`
        );
    }, [reply]);

    return {
        nickName
    };
};
