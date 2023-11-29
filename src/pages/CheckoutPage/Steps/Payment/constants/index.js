export const PAYMENT_FORM_PREFIX = 'payment';

export const BILLING_FORM_PREFIX = 'billing';

export const CUSTOMER_ADDRESSES_FIELD_DEFAULT_VALUE = 'none';

export const SHOW_CREDIT_CARD_FORM = 'new_credit_card';

export const STORE_CARD = 'storeCard';

export const PAYMENT_FORM_FIELDS = {
    paymentMethod: `${PAYMENT_FORM_PREFIX}_method`,
    billingFirstName: `${BILLING_FORM_PREFIX}_firstname`,
    billingLastName: `${BILLING_FORM_PREFIX}_lastname`,
    billingCompany: `${BILLING_FORM_PREFIX}_company`,
    billingTelephone: `${BILLING_FORM_PREFIX}_telephone`,
    billingStreet: `${BILLING_FORM_PREFIX}_street`,
    billingCity: `${BILLING_FORM_PREFIX}_city`,
    billingRegionCode: `${BILLING_FORM_PREFIX}_region_code`,
    billingRegionName: `${BILLING_FORM_PREFIX}_region_name`,
    billingPostCode: `${BILLING_FORM_PREFIX}_postcode`,
    billingCountryCode: `${BILLING_FORM_PREFIX}_country_code`,
    billingCountryName: `${BILLING_FORM_PREFIX}_country_name`,
    billingCustomerAddresses: `${BILLING_FORM_PREFIX}_customer_addresses`,
    billingSaveAddress: `${BILLING_FORM_PREFIX}_save_address`,
    selectedPaymentMethod: `selected_${PAYMENT_FORM_PREFIX}_method`
};
