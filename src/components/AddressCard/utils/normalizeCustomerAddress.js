export const normalizeCustomerAddress = data => {
    let result = {};

    if (data) {
        result = {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            street: data.street[0],
            city: data.city,
            region: data.region.region,
            postcode: data.postcode,
            country: data.country_code,
            telephone: data.telephone
        };
    }

    return result;
};
