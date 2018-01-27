import initialState from '../constants/initialState';
import * as types from '../constants/actionTypes';

/*
*
* Это reducer, он обрабатывает наши actions. Можно создать несколько редьюсеров для разных
* по смыслу событий.
*
* Reducer это функция (всегда), которая принимает на вход два параметра,
*
* первый - state, это или кусочек данных из всего приложения который мы можем с помощью
* этого редьюсера изменять.
*
* второй - action, это событие которое мы вызвали. Событием в redux служит объект, который по
* договоренности должен содержать в себе тип события, и определенные данные которые
* опять же по договоренности называются payload, этим payload может быть что угодно.
*
* Есть еще одно правило - функция reducer должна являться чистой функцией.
*
* Чистая функция — это функция, которая при одинаковых аргументах всегда
* возвращает одни и те же значения и не имеет видимых побочных эффектов.
*
*/
const initial = JSON.parse(localStorage.getItem('books')) || initialState.books;

export default function data(state = initial, action) {
    // console.log('state', state);
    let { type, payload, category } = action;

    switch (type) {
        case types.CLEAR_SEARCH: 
            return state.map((item, i) => {
                console.log();
                if(Object.keys(item)[0] === "search") return ({ search: [] });
                return item;
            })
        case types.FETCH_BOOKS:
            
            // console.log("FETCH_BOOKS: >>>> ", payload);

            let check = 0;
            state.map((item) => {
                if (Object.keys(item)[0] === category) {
                    check = 1;
                }
            })
            
            if (check) {
                return state.map((item, index) => {
                    // console.log("DATA REDUCER: ", item)
                    let key = Object.keys(item)[0];
                    if (key === category) {
                        return { [key]: [...item[key], ...payload] };

                    } else return item;
                })
            } else {
                return state.map((item, index) => {
                    let key = Object.keys(item)[0];
                    if ( key === 'search') {
                        return { [key]: [ ...item[key], ...payload] };

                    } else return item;
                })
            }


        case types.ADD_CATEGORIES_TO_BOOK_ARRAY:
            if (JSON.parse(localStorage.getItem('books'))) {
                return state;
            } else {
                return [...payload.map((item, i) => {
                    return { [item]: [] };
                })]
            }


        default:
            return state;
    }
};