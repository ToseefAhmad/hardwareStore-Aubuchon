import axios from 'axios';

const config = {
    baseURL: 'https://uscs8.ksearchnet.com',
    timeout: 1000000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

const trackingConfig = {
    baseURL: 'https://stats.ksearchnet.com/analytics',
    timeout: 1000000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

const dashboardConfig = {
    baseURL: 'https://js.klevu.com/klevu-js-v1/klevu-js-api',
    timeout: 1000000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

export const client = axios.create(config);
export const trackingClient = axios.create(trackingConfig);
export const dashboardClient = axios.create(dashboardConfig);
