import actions from './actions';

export const toggleDrawer = name => async dispatch =>
    dispatch(actions.toggleDrawer(name));

export const closeDrawer = () => async dispatch =>
    dispatch(actions.toggleDrawer(null));

export const setAppIsRendered = () => async dispatch =>
    dispatch(actions.setAppIsRendered());

/** @deprecated */
export const toggleSearch = () => async dispatch =>
    dispatch(actions.toggleSearch());
