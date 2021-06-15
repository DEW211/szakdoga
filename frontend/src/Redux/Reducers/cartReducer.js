import { ADD, SUB, ADD_TO_CART, REMOVE_ITEM_FROM_CART, EMPTY_CART, SET_CART, SET_ID, PURGE_CART } from '../actionTypes';
import _ from 'lodash';

const initialState = {
    sum: 0,
    id: 6,
    cart: [],
}

export default function cart(state = initialState, action) {
    switch (action.type) {
        case ADD: {
            let itemInCartIdx = _.findIndex(state.cart, (item) => item.id === action.payload.id);
            let cart = state.cart;
            cart[itemInCartIdx].amount++;
            return {
                ...state,
                cart
            }
        }
        case SUB: {
            let itemInCartIdx = _.findIndex(state.cart, (item) => item.id === action.payload.id);
            let cart = state.cart;
            if (cart[itemInCartIdx].amount > 0)
                cart[itemInCartIdx].amount--;
            return {
                ...state,
                cart
            }
        }
        case ADD_TO_CART:
            // let itemInCart = _.find(state.cart, (item) => item.id === action.payload.item.id);
            let itemInCartIdx = _.findIndex(state.cart, (item) => item.id === action.payload.id);
            let newCart = state.cart;
            //console.log(itemInCartIdx)
            if (itemInCartIdx !== -1) {
                if (newCart[itemInCartIdx].amount !== undefined) {
                    newCart[itemInCartIdx].amount++
                } else {
                    newCart[itemInCartIdx].amount = 1;
                }
            } else {
                newCart.push({ ...action.payload, amount: 1 })
            }
            return {
                ...state,
                cart: newCart
            }
        case REMOVE_ITEM_FROM_CART: {
            let cart = state.cart;
            _.remove(cart, (item) => item.id === action.payload);
            return {
                ...state,
                cart,
            }
        }
        case EMPTY_CART: {
            return {
                ...state,
                cart: [],
            }
        }
        case SET_ID: {
            return {
                ...state,
                id: action.payload
            }
        }
        case SET_CART: {
            return {
                ...state,
                ...action.payload
            }
        }
        case PURGE_CART:
            return {
                ...state,
                cart: [],
                i: 0
            }
        default:
            return state;
    }
}