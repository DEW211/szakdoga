import {SUB} from '../actionTypes';

const initialState = {
    sum : 0,
}

export default function(state = null, action){
    switch(action.type){
        case 'SUB2':{
            return {
                ...state,
                sum : state.sum-1
            }
        }
        default:
            return state;
    }
}