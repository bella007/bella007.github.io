import * as types from '../constants/actionTypes';

// Actions here

export const addCategoriesToBookArray = (payload) => ({type: types.ADD_CATEGORIES_TO_BOOK_ARRAY, payload});
export const fetchBooks = (payload, category) => ({type: types.FETCH_BOOKS, payload, category});
export const filter = (payload) => ({type: types.FILTER, payload});
export const sort = (payload) => ({type: types.SORT, payload});

export const checkUsers = (payload) => ({type: types.CHECK_USERS, payload});
export const addUser = (payload) => ({type: types.ADD_USER, payload});

export const addToHistory = (payload) => ({type: types.ADD_TO_HISTORY, payload});
export const addToCart = (payload) => ({type: types.ADD_TO_CART, payload});
export const delFromCart = (payload) => ({type: types.DEL_FROM_CART, payload});
export const addToWishlist = (payload) => ({type: types.ADD_TO_WISHLIST, payload});
export const addToOrderHistory = (payload) => ({type: types.ADD_TO_ORDER_HISTORY, payload});
export const changeQuantity = (payload, book) => ({type: types.CHANGE_QUANTITY, payload, book});
export const sideMenu = (payload) => ({type: types.SIDE_MENU, payload});


export const authorized = (payload) => ({type: types.AUTHORIZED, payload});
export const logout = (payload) => ({type: types.LOGUOT, payload});

export const changeActiveCategory = (payload) => ({type: types.CHANGE_ACTIVE_CATEGORY, payload});
export const clearSearch = () => ({type: types.CLEAR_SEARCH});



// store.dispatch({type: types.FETCH_BOOKS, payload, category});
// store.dispatch(fetchBooks("ddd", "bbb"));


// store.dispatch({ type: "FETCH_BOOKS", payload: "payload" })
