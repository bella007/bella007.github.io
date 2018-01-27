import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';


export default function slider(state = initialState.sideMenu, action) {
    let { type, payload } = action;

    	switch (type) {
        	case types.SIDE_MENU:
        		return payload;
        	default:
            	return state;
        }
    
};