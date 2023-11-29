import { uniqueId } from 'lodash';
import { useCallback, useMemo } from 'react';

/**
 * Provide unique ID for component. Redundant if upgrading to React 18
 *
 * @param {prefix}
 * @returns {{makeId: (function(*): string), id: (function(*, ...[*]): string)}}
 */
export const useId = ({ prefix = '' } = { prefix: 'uid' }) => {
    const baseId = useMemo(() => {
        const generatedId = parseInt(uniqueId(), 10).toString(32);
        return `${prefix}_${generatedId}`;
    }, [prefix]);

    /**
     * @type {function(*): string}
     */
    const makeId = useCallback(suffix => `${baseId}--${suffix}`, [baseId]);

    /**
     * @type {function(*, ...[*]): string}
     */
    const id = useCallback(
        (literals, ...args) => {
            if (typeof literals === 'string') {
                literals = [literals];
            }

            let result = literals[0];

            args.forEach((arg, i) => {
                result += arg;
                result += literals[i + 1];
            });

            return `${baseId}--${result}`;
        },
        [baseId]
    );

    return {
        id,
        makeId
    };
};
