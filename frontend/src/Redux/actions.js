import { ADD, SUB, ADD_TO_CART, REMOVE_ITEM_FROM_CART, EMPTY_CART, LOGIN, LOGOUT, SET_ID, SET_CART, PURGE_CART } from './actionTypes';
import _ from 'lodash';

export const add = (item) => ({
    type: ADD,
    payload: item
})

export const sub = (item) => ({
    type: SUB,
    payload: item
})

export const subWithRequest = (item) => {
    return (dispatch, getState) => {
        //make call
        const { cart } = getState();
        const isLoggedIn = getState().login.login;
        const {login} = getState();

        let correctItem = {
            ...item,
            amount: item.amount - 1
        }
        if (isLoggedIn) {
            fetch('/api/Basket', {
                method: 'PATCH',
                headers: {
                    'email': login.email, //ide kell majd az email ha be van jelentkezve meg a token
                    'Authorization': login.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cart.id,
                    product: correctItem
                })

            });
        }
        let success = true;
        if (success)
            dispatch(sub(item))
    }
}

export const addWithRequest = (item) => {
    return (dispatch, getState) => {
        //make call
        const { cart } = getState();
        const isLoggedIn = getState().login.login;
        const {login} = getState();
        let correctItem = {
            ...item,
            amount: item.amount + 1
        }
        if (isLoggedIn) {
            fetch('/api/Basket', {
                method: 'PATCH',
                headers: {
                    'email': login.email, //ide kell majd az email ha be van jelentkezve meg a token
                    'Authorization': login.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cart.id,
                    product: correctItem
                })

            });
        }
        let success = true;
        if (success)
            dispatch(add(item))
    }
}

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
})

export const addToCartWithRequest = (item) => {
    return (dispatch, getState) => {
        const { cart } = getState();
        const isLoggedIn = getState().login.login;
        const {login} = getState();

        let itemInCartIdx = _.findIndex(cart.cart, (i) => i.id === item.id);
        let itemToSend = { ...item }
        if (itemInCartIdx === -1) {
            itemToSend.amount = 1
        } else {
            itemToSend.amount = cart.cart[itemInCartIdx].amount + 1;
        }
        if (isLoggedIn) {
            fetch('/api/Basket', {
                method: 'PATCH',
                headers: {
                    'email': login.email, //ide kell majd az email ha be van jelentkezve meg a token
                    'Authorization': login.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cart.id,
                    product: itemToSend
                })

            });
        }
        dispatch(addToCart(item))
    }
}

export const removeItemFromCart = (item) => ({
    type: REMOVE_ITEM_FROM_CART,
    payload: item
})

export const removeItemFromCartWithRequest = (item) => {
    return (dispatch, getState) => {
        const { cart } = getState();
        const isLoggedIn = getState().login.login;
        const {login} = getState();

        let correctItem = {
            ...item,
            amount: 0
        }
        if (isLoggedIn) {
            fetch('/api/Basket', {
                method: 'PATCH',
                headers: {
                    'email': login.email, //ide kell majd az email ha be van jelentkezve meg a token
                    'Authorization': login.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: cart.id,
                    product: correctItem
                })

            });
        }
        let success = true;
        if (success)
            dispatch(removeItemFromCart(item.id))
    }
}

export const emptyCart = () => ({
    type: EMPTY_CART,
})

export const login = (token, email) => {
    return{type: LOGIN,
    payload: {token, email}}
}

export const setCartId = (id) => {
    return {
        type: SET_ID,
        payload: id
    }
}

export const setCart = (payload) => {
    return {
        type: SET_CART,
        payload
    }
}

export const logInWithCartRequest = (token, email) => {
    return async (dispatch, getState) => {

        const { cart } = getState();
        //ha üres az itt lévő akkor megnézzük van-e a szerveren és letöltjük ha van. Ha itt van, akkor felülírjuk a szerveren
        let cartOnServerIxists = false;
        //const {loginState} = getState();

        let cartOnServer = await fetch("/api/Basket", {
                method: 'GET',
                headers: {
                    'email': email, //ide kell majd az email ha be van jelentkezve meg a token
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
                
            });
        cartOnServer = await cartOnServer.json();
        //dispatch(login(token, email));
        dispatch(setCart(cartOnServer))
        
        
         if (cart.cart.length > 0) {
            const response = await fetch("/api/Basket", {
                method: 'POST',
                headers: {
                    'email': email, //ide kell majd az email ha be van jelentkezve meg a token
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                    cart: cart.cart,
                })
            });
            const result = await response.json();
            dispatch(setCart(result))
        } 



        dispatch(login(token, email));
    }
}

export const signUpWithRequest = (payload) => {
    return (dispatch, getState)=>{

    }
}

export const logout = () => ({
    type: LOGOUT
})

export const purgeCart = () => {
    return {
        type: PURGE_CART
    }
}



