import axios from 'axios';

const getAxiosTurnToConfig = ({
    url,
    key,
    includeTurnToSiteKeyHeader = false
}) => {
    const turnToSiteKeyHeader = includeTurnToSiteKeyHeader
        ? { 'x-turnto-sitekey': key }
        : {};

    const config = {
        baseURL: url,
        timeout: 1000000,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...turnToSiteKeyHeader
        }
    };

    const client = axios.create(config);
    return client;
};

export default getAxiosTurnToConfig;
