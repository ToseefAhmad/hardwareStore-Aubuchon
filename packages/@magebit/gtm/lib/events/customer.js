import { APP_AUTH_MODAL_SIGN_UP_TAB_KEY } from '@app-constants';

import { dataLayerPush } from "../utils";

export const createAccountClick = async () => {
    dataLayerPush({
        event: 'sign_up_click'
    });
};

export const createAccountForm = async () => {
    dataLayerPush({
        event: 'sign_up_form'
    });
};

export const createAccountSubmit = async () => {
    dataLayerPush({
        event: 'sign_up_done'
    });
};

export const findMyAccountSubmit = async (payload) => {
    dataLayerPush({
        event: 'find_my_account'
    });
};

export const signInSubmit = async () => {
    dataLayerPush({
        event: 'log_in'
    });
};

export const tryAgain = async (payload = {}) => {
    dataLayerPush({
        event: 'try_again'
    });
};

export const thatsMeSubmit = async (payload = {}) => {
    dataLayerPush({
        event: 'thats_me'
    });
};

export const authModalTabSwitch = async (payload = {}) => {
    if (payload.tabKey === APP_AUTH_MODAL_SIGN_UP_TAB_KEY) {
        dataLayerPush({
            event: 'sign_up_click'
        });
    } else {
        dataLayerPush({
            event: 'login_begin'
        });
    }
};
