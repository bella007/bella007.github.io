import React from 'react';
import "./LoaderHOC.scss";
import fetchData from '../../functions/fetchData';
import { renderBooks } from '../../functions/renderBooks';
import { renderStars } from '../../functions/renderStars';
import { PATH, ENV_HREF } from '../../config';

import PropTypes from 'prop-types';


import { connect } from 'react-redux';
import { fetchBooks, addToHistory, addToCart, changeActiveCategory, addToWishlist } from '../../actions';

import { bindActionCreators } from 'redux';

@connect(mapStateToProps, mapDispatchToProps)
export default function LoaderHOC(WrappedComponent) {
    return class LoaderHOC extends React.Component {

        constructor() {
            super()

            this.fetchData = fetchData.bind(this);
            this.renderBooks = renderBooks.bind(this);
            this.renderStars = renderStars.bind(this);
            
        }


        static contextTypes = {
            changeCategory: PropTypes.func.isRequired,
            fetchData: PropTypes.func.isRequired
        }

        static contextTypes = {
            notify: PropTypes.func.isRequired,
            val_fun: PropTypes.func.isRequired,
            val: PropTypes.string.isRequired
        };


        handleClick = (id, item) => {
            this.props.addToHistory(item);
            this.props.history.push(`${ENV_HREF}book/${id}`);
        }

        handleBuy = (item) => {
            this.context.notify();
            this.context.val_fun(`You add "${item.volumeInfo.title}" to the cart`)
            this.props.addToCart(item);
        }

        handleWish(item, event) {
            event.stopPropagation();

            this.props.addToWishlist(item)

        }

        componentWillMount() {
            let tempCategory = this.props.data.find((item, i) => Object.keys(item)[0] === "React");
            tempCategory = tempCategory[Object.keys(tempCategory)[0]]

            if (this.props.match.url === `${ENV_HREF}` && tempCategory.length === 0) this.fetchData("React");
            if (this.props.match.url !== `${ENV_HREF}` && tempCategory.length === 0) {
                this.props.changeActiveCategory(this.props.match.params.category);
                this.fetchData(this.props.match.params.category);
            }

        }

        render() {
            return this.props.books[0][Object.keys(this.props.books[0])[0]].length !== 0
                ? <WrappedComponent {...this.props} renderBooks={this.renderBooks} /> : <div className="loader"></div>;
        }
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        category: state.activeCategory.active,
        data: state.data,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active }),
        user: state.users.users.filter((item) => item.name === state.users.authorized)[0]
    }
}

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({ fetchBooks, addToHistory, addToCart, changeActiveCategory, addToWishlist }, dispatch);

}