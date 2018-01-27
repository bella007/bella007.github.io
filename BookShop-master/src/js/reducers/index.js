import {combineReducers} from 'redux';
import data from './data';
import categories from './categories';
import history from './history';
import users from './users';
import authorization from './authorization';
import activeCategory from './activeCategory';
import slider from './slider'
import sideMenu from './sideMenu'

// Reducer - это обработчик события, мы можем создавать под определенные логически cвязаные
// действия свой редьюсер, например в случае с нашим репозиторием, я создал

// Собираем все редьюсеры в один большой, для того чтобы в
// дальнейшем передать его в store.
// Ложить его в store нужно для того чтобы при вызове какого-то события - это событие обработалось нужным нам редьюсером.

const reducers = combineReducers({
    data,
    categories,
    history,
    users,
    authorization, 
    activeCategory,
    slider,
    sideMenu
});

export default reducers;