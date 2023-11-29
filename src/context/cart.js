import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { bool, func, array, node, shape } from 'prop-types';
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useRef
} from 'react';
import { connect } from 'react-redux';

import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useEventListener } from '@magento/peregrine/lib/hooks/useEventListener';
import bindActionCreators from '@magento/peregrine/lib/util/bindActionCreators';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

import { MiniCartFragment } from '@app/components/MiniCart/miniCartFragment.gql';
import actions from '@app/store/actions/cart';
import * as asyncActions from '@app/store/actions/cart/asyncAction';

const CartContext = createContext();

const storage = new BrowserPersistence();

const isCartEmpty = cart =>
    !cart || !cart.details.items || cart.details.items.length === 0;

const getTotalQuantity = items =>
    items.reduce((total, item) => total + item.quantity, 0);

const CartContextProvider = props => {
    const { actions, asyncActions, cartState, children } = props;
    const scheduledProducts = useRef(storage.getItem('cartItems'));

    // Make deeply nested details easier to retrieve and provide empty defaults
    const derivedDetails = useMemo(() => {
        if (isCartEmpty(cartState)) {
            return {
                currencyCode: 'USD',
                numItems: 0,
                subtotal: 0
            };
        } else {
            return {
                currencyCode: cartState.details.prices.grand_total.currency,
                numItems: getTotalQuantity(cartState.details.items),
                subtotal: cartState.details.prices.grand_total.value
            };
        }
    }, [cartState]);

    const cartApi = useMemo(
        () => ({
            actions,
            ...asyncActions
        }),
        [actions, asyncActions]
    );

    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const fetchCartDetails = useAwaitQuery(CART_DETAILS_QUERY);
    const [addToCartSkuList] = useMutation(ADD_TO_CART_SKU_LIST);

    // Storage listener to force a state update if cartId changes from another browser tab.
    const storageListener = useCallback(() => {
        const currentCartId = storage.getItem('cartId');
        const { cartId } = cartState;
        if (cartId && currentCartId && cartId !== currentCartId) {
            globalThis.location && globalThis.location.reload();
        }
    }, [cartState]);

    useEventListener(globalThis, 'storage', storageListener);

    const createCart = useCallback(() => {
        return cartApi.createCart({
            fetchCartId
        });
    }, [cartApi, fetchCartId]);

    useEffect(() => {
        // cartApi.getCartDetails initializes the cart if there isn't one.
        cartApi.getCartDetails({
            fetchCartId,
            fetchCartDetails
        });
    }, [cartApi, fetchCartDetails, fetchCartId]);

    /* If customer have items after store switching we need to add this items to cart */
    useEffect(() => {
        const items = scheduledProducts.current;

        if (items?.length && cartState?.cartId) {
            storage.removeItem('cartItems');
            scheduledProducts.current = null;

            addToCartSkuList({
                variables: {
                    cartId: cartState.cartId,
                    cartItems: items
                }
            });
        }
    }, [addToCartSkuList, cartApi, cartState, fetchCartDetails, fetchCartId]);

    const contextValue = useMemo(() => {
        const derivedCartState = {
            ...cartState,
            isEmpty: isCartEmpty(cartState),
            derivedDetails,
            createCart
        };

        return [derivedCartState, cartApi];
    }, [cartApi, cartState, derivedDetails, createCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

CartContextProvider.propTypes = {
    actions: shape({
        addItem: shape({
            request: func,
            receive: func
        }),
        beginEditItem: func,
        endEditItem: func,
        getCart: shape({
            request: func,
            receive: func
        }),
        getDetails: shape({
            request: func,
            receive: func
        }),
        removeItem: shape({
            request: func,
            receive: func
        }),
        reset: func,
        updateItem: shape({
            request: func,
            receive: func
        })
    }),
    asyncActions: shape({
        addItemToCart: func,
        clearCartId: func,
        createCart: func,
        getCartDetails: func,
        removeCart: func,
        removeItemFromCart: func,
        retrieveCartId: func,
        saveCartId: func,
        updateItemInCart: func,
        writeImageToCache: func
    }),
    children: node,
    cartState: shape({
        addItemError: null,
        cartId: null,
        details: shape({}),
        detailsError: null,
        getCartError: null,
        isLoading: bool,
        isUpdatingItem: bool,
        isAddingItem: bool,
        removeItemError: null,
        shippingMethods: array,
        updateItemError: null
    })
};

const mapStateToProps = ({ cart }) => ({ cartState: cart });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartContextProvider);

export const useCartContext = () => useContext(CartContext);

/**
 * We normally do not keep GQL queries in Peregrine. All components should pass
 * queries to talons/hooks. This is an exception to the rule because it would
 * be unecessarily complex to pass these queries to the context provider.
 */
const CREATE_CART_MUTATION = gql`
    mutation createCart {
        cartId: createEmptyCart
    }
`;

const CART_DETAILS_QUERY = gql`
    query checkUserIsAuthed($cartId: String!) {
        cart(cart_id: $cartId) {
            # The purpose of this query is to check that the user is authorized
            # to query on the current cart. Just fetch "id" to keep it small.
            id
        }
    }
`;

const ADD_TO_CART_SKU_LIST = gql`
    mutation addToCartSkuList($cartId: String!, $cartItems: [CartItemInput!]!) {
        addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
            cart {
                id
                ...MiniCartFragment
            }
        }
    }
    ${MiniCartFragment}
`;
