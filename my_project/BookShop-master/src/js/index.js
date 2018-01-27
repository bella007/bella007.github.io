import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/common.scss';
import App from "./containers/App";


import Catalog from './components/Catalog';
import Book from './components/Book';
import BookView from './components/BookView';
import Cart from './components/Cart';
import Favourites from './components/Favourites';
import MainLayout from './components/MainLayout';
import Search from './components/Search';
import Registration from './components/Registration';
import Account from './components/Account';
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { addCategoriesToBookArray } from './actions';

import { ENV_HREF } from './config';
// BrowserRouter это основной компонент react-router'a который
// дает нашему приложению работать с url

import { BrowserRouter as Router } from 'react-router-dom';

// Provider - это обертка которая позволяет всем компонентам коннектится к store и получать все необходимые
// для работы с redux функции. Уровень вложености обязателно должен быть таким как в примере - самый корневой
// компонент - Provider, потом наш контейнер, а в нем уже все что нам  нужно.

import { Provider } from 'react-redux';

// Cобранный store redux, он здесь нужен чтобы передать его в Provider.

import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
    , document.getElementById('app'));

