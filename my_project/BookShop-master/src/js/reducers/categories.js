import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';



export default function categories(state = initialState.categories, action) {
    let { type, payload } = action;

    switch (type) {
        case types.FILTER:
            return state;
        case types.SORT:
            return state;
        default:
            return state;
    }
};