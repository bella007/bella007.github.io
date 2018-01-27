import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';


export default function activeCategory(state = {active: initialState.activeCategory,
                                                categories: initialState.categories}, action) {
    let { type, payload } = action;

    switch (type) {
        case types.CHANGE_ACTIVE_CATEGORY:
            if (state.categories.includes(payload)) {
                return {...state, active: payload};
            }
            return {...state, active: "search"};    
        
        default:
            return state;
    }
};