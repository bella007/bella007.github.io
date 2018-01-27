import store from '../store';
import {fetchBooks} from '../actions';

export default function fetchData(category, keyword, startIndex = 0) {

    if(category != "search") {        
        return _fetch(category, startIndex);
    } else {
        return _fetch(keyword, startIndex);
    }
}

function _fetch(_search, _index) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${_search}&maxResults=21&startIndex=${_index}&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU&country=UA`)
        .then(res => res.json())
        .then(res => {
            store.dispatch(fetchBooks(res.items, _search));
        })
        .catch(err => console.log('ERROR: ', err));

}

