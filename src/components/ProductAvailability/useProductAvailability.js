export const useProductAvailability = ({ data }) => {
    const {
        qty,
        location,
        store_name,
        boss_available,
        bopis_available,
        show_check_nearby
    } = data;

    return {
        qty,
        location,
        store_name,
        boss_available,
        bopis_available,
        show_check_nearby
    };
};
