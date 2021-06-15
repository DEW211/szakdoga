import {combineReducers} from 'redux';
import decrement from './decrement';
import cart from './cartReducer';
import login from "./login";

export default combineReducers({cart, decrement, login})