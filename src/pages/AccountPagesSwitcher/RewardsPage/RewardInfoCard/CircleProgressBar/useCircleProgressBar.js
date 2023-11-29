import { useEffect, useState, useMemo } from 'react';

const STROKE_WIDTH = 4;

export const useCircleProgressBar = ({
    size = 0,
    strokeWidth = STROKE_WIDTH,
    pointTotal = 0,
    maxPoints = 250
}) => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setPercentage((pointTotal * 100) / maxPoints);
        }, 300);
    }, [pointTotal, maxPoints]);

    const cx = size / 2;
    const cy = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2;
    const dash = (percentage * circumference) / 100;

    const pointsLeft = useMemo(() => {
        return maxPoints - Math.min(pointTotal, maxPoints);
    }, [maxPoints, pointTotal]);

    return {
        strokeWidth,
        cx,
        cy,
        radius,
        circumference,
        dash,
        pointsLeft
    };
};
