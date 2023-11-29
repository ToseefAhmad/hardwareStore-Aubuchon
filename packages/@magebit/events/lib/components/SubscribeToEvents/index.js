import { useSubscribeToEvents } from "../../talons/useSubscribeToEvents";

/**
 * This Component exists purely to hook into EventingContext event observer
 *
 * @returns {null}
 * @constructor
 */
const SubscribeToEvents = () => {
    useSubscribeToEvents();

    return null;
};

export default SubscribeToEvents;
