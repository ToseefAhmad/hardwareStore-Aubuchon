import { fbqPush } from '@app/utils/fbqPush';

const getDefaultAddress = customer => {
    if (!customer) return {};

    const {
        default_billing: defaultBilling,
        default_shipping: defaultShipping,
        addresses = []
    } = customer;
    const addressId = defaultBilling || defaultShipping;
    const addressEntry = addresses.find(
        address => '' + address.id === '' + addressId
    );

    if (addressEntry) {
        return {
            ct: addressEntry.city.toLowerCase(),
            country: addressEntry.country_code,
            ph: addressEntry.telephone,
            st: addressEntry.region.region_code.toLowerCase(),
            zp: addressEntry.postcode
        };
    }
};

const fbPixel = async payload => {
    const { customer } = payload;
    const ids = (globalThis.UPWARD?.fbPixelId || '').split(',');

    ids.forEach(pixelId => {
        fbqPush({
            method: 'init',
            event: pixelId,
            data: customer?.uid
                ? {
                      external_id: customer.uid,
                      db: customer.date_of_birth?.replace(/-/g, ''),
                      em: customer.email,
                      fn: customer.firstname,
                      ln: customer.lastname,
                      ...getDefaultAddress(customer)
                  }
                : undefined
        });
    });
};

export const pageView = async () => {
    fbqPush({
        method: 'track',
        event: 'PageView'
    });
};

export default fbPixel;
