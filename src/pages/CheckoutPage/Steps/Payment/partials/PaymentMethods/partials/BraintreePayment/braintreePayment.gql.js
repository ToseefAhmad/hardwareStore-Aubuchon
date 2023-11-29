import { gql } from '@apollo/client';

import { SelectedPaymentMethodFragment } from '../../../../paymentFragment.gql';

const SET_BRAINTREE_CREDIT_CARD_ON_CART = gql`
    mutation SetBraintreeCreditCardOnCart(
        $cartId: String!
        $paymentNonce: String!
        $saveCard: Boolean!
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: {
                    code: "braintree"
                    braintree: {
                        payment_method_nonce: $paymentNonce
                        is_active_payment_token_enabler: $saveCard
                    }
                }
            }
        ) {
            cart {
                id
                ...SelectedPaymentMethodFragment
            }
        }
    }
    ${SelectedPaymentMethodFragment}
`;

const SET_BRAINTREE_VAULT_CREDIT_CARD_ON_CART = gql`
    mutation SetBraintreeVaultCreditCardOnCart(
        $cartId: String!
        $publicHash: String!
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: {
                    code: "braintree_cc_vault"
                    braintree_cc_vault: { public_hash: $publicHash }
                }
            }
        ) {
            cart {
                id
                ...SelectedPaymentMethodFragment
            }
        }
    }
    ${SelectedPaymentMethodFragment}
`;

export default {
    mutations: {
        setBraintreeCreditCardOnCartMutation: SET_BRAINTREE_CREDIT_CARD_ON_CART,
        setBraintreeVaultCreditCardOnCartMutation: SET_BRAINTREE_VAULT_CREDIT_CARD_ON_CART
    }
};
