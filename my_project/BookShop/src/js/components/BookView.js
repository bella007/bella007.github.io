import React from 'react';
import Categories from './Categories';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { renderStars } from '../functions/renderStars';

import { addToWishlist, addToHistory, addToCart, fetchBooks, changeActiveCategory } from '../actions';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { PATH, ENV_HREF } from '../config';

const mapStateToProps = (state, ownProps) => {

    let isInclude = '';
    for (let i = 0; i < state.data.length; i++) {
        if (!isInclude) {
            for (let key in state.data[i]) {
                isInclude = state.data[i][key].find((item) => { return item.id == ownProps.match.params.id })
            }
        }
    }
    return {
        book: isInclude,
        user: state.users.users.filter((item) => item.name === state.users.authorized)[0]
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addToCart, addToWishlist, addToHistory, fetchBooks, changeActiveCategory }, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class BookView extends React.Component {

    constructor(props) {
        super(props)
        this.renderStars = renderStars.bind(this);
        this.state = ({ heartFill: false });
    }

    handleBuy = () => {
        this.props.addToCart(this.props.book);
        this.context.val_fun(`You add "${this.props.book.volumeInfo.title}" to the cart`);
        this.context.notify();

    }
    static contextTypes = {
        notify: PropTypes.func.isRequired,
        val_fun: PropTypes.func.isRequired,
        val: PropTypes.string.isRequired
    };

    handleWish = () => {
        this.setState({ heartFill: !this.state.heartFill });
        this.props.addToWishlist(this.props.book)
        this.context.val_fun(`You add "${this.props.book.volumeInfo.title}" to your wish list in account`);
        // this.context.notify();
    }

    render() {
        let book = this.props.book;
        const url = { backgroundImage: `url(${this.props.book.volumeInfo.imageLinks.thumbnail})` }
        // const star = { backgroundImage: 'url(../../assets/img/icons8-star-filled.png)' }
        // const heart = { backgroundImage: 'url(../../assets/img/icons8-heart.png)' }
        let author = book.volumeInfo.authors[0];

        let isInWishList = false;
        if (this.props.user !== undefined && this.props.user.wishList.length > 0) {
            let temp = this.props.user.wishList.filter((item) => book.id === item.id);
            if (temp.length > 0) isInWishList = true;
        }

        return (
            <div className="book-view-wrapper row">
                <div className='col-md-3 col-sm-12'>
                    <Categories />
                </div>
                <div className='col-md-9 col-sm-12 desc'>
                    <div className="wrapper-for-books">
                        <div className="col-md-6 col-sm-12 book-image" style={url}>
                            <div className="star" onClick={this.handleWish}>
                                {!isInWishList ?
                                    <i className='fa fa-heart-o fa-2x' aria-hidden="true"></i> :
                                    <i className="fa fa-heart fa-2x" aria-hidden="true"></i>}
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 about">
                            <div><p><span>Title: </span> {book.volumeInfo.title}</p></div>
                            <div><p><span>Author: </span> {author}</p></div>
                            <div><p><span>Publishing date: </span> {book.volumeInfo.publishedDate}</p></div>
                            <div><p><span>Number of pages: </span> {book.volumeInfo.pageCount}</p></div>
                            <div className='cost'>
                                <p><span>Price: </span> {book.saleInfo.listPrice ? Math.round(book.saleInfo.listPrice.amount) : 0} UAH</p>
                                <button className='btn-default btn-bookView' onClick={this.handleBuy}>Buy</button>
                                {book.volumeInfo.previewLink ?
                                    <button className='btn-default btn-bookView' >
                                        <a target="blank" href={book.volumeInfo.previewLink}>Read pasage</a>
                                    </button> : null}
                            </div>
                            <div className='inline' >
                                {this.renderStars(book, 'fa-3x').map((star) => star)}
                            </div>
                            <p><span>Description: </span></p>
                            <p>{book.volumeInfo.description}...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}