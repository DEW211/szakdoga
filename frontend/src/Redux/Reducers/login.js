import { CallToActionSharp } from '@material-ui/icons';
import { LOGIN, LOGOUT } from '../actionTypes';


export default function login(state = { login: false, token: '', email: '' }, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                login: true,
                token: action.payload.token,
                email: action.payload.email
            }
        }
        case LOGOUT: {
            return {
                ...state,
                login: false,
                token: ''
            }
        }
        
        default: return state;
    }
}