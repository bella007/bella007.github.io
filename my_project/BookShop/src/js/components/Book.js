import React from 'react';
import Categories from './Categories';
import { Link } from 'react-router-dom';

import fetchData from '../functions/fetchData';

import { withRouter } from 'react-router';
import Slider from './Slider';


import LoaderHOC from './HOC/LoaderHOC';
import { PATH, ENV_HREF } from '../config';

@withRouter
@LoaderHOC
export default class Book extends React.Component {

    constructor(props) {
        super(props)
        // this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleWish = this.handleWish.bind(this);
        this.fetchData = fetchData.bind(this);
        this.state = {
            dropdown: false,
            sortType: 'popularity'
        }
    }

    handleWish(item, event) {
        console.log(event.target);
        event.stopPropagation();
        console.log('book from hanlde Wish', item)

        this.props.addToWishlist(item)
        // this.context.val_fun(`You add "${this.props.book.volumeInfo.title}" to your wish list in account`);
        // this.context.notify();
    }



    cat = this.props.category;
    books = this.props.books[0];

    showMore = () => {
        let cat = this.props.category !== "search"
            ? this.props.category
            : this.props.match.params.category;


        let category = this.props.category;

        let startIndex = this.props.books[0][category].length;
        // console.log('startingIndex', startIndex, '\nthis.props', this.props);
        this.fetchData(cat, null, startIndex);
    }


    showDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown })
        console.log(this.state.dropdown)
    }

    handleSort = (e) => {
        console.log(e.target.getAttribute('data-sort'));
        this.setState({ sortType: e.target.getAttribute('data-sort') });
    }
    sortBooks = (a, b) => {
        let priceA = a.saleInfo.retailPrice ? Math.round(a.saleInfo.retailPrice.amount) : 0;
        let priceB = b.saleInfo.retailPrice ? Math.round(b.saleInfo.retailPrice.amount) : 0;
        let starsA = a.volumeInfo.averageRating ? a.volumeInfo.averageRating : 0;
        let starsB = b.volumeInfo.averageRating ? b.volumeInfo.averageRating : 0;
        let idA = a.id;
        let idB = b.id;
        switch (this.state.sortType) {
            case 'upPrice':
                if (priceA == priceB) {
                    return (idA > idB) ? -1 : 1;
                } else
                    return priceB - priceA;
            case 'downPrice':
                if (priceA == priceB) {
                    return (idA > idB) ? -1 : 1;
                } else
                    return priceA - priceB;
            case 'popularity':
                if (starsA == starsB) {
                    return (idA > idB) ? -1 : 1;
                } else
                    return starsB - starsA;
            default: return 0;
        }

    }
    render() {
        let cat = this.props.category;
        let books = this.props.books[0];
        return (
            <div className="row">
                <div className="central-wrapper">
                    {this.props.match.params.category ?


                        <div className='col-md-3 col-sm-12'>
                            <Categories />


                        </div>
                        : null}

                    <div className="wrapper-for-books">
                        <div className="dropdown">
                            <button onClick={this.showDropdown} className='btn btn-primary dropdown-toggle' type="button" data-toggle="dropdown">
                                Sort by <span className="caret"></span>
                            </button>
                            <ul id="myDropdown"
                                className={!this.state.dropdown ? 'dropdown-content' : 'dropdown-content show'}>
                                <li className="dropdown_li" data-sort="upPrice" onClick={this.handleSort}>price to lowest</li>
                                <li className="dropdown_li" data-sort="downPrice" onClick={this.handleSort}>price to highest</li>
                                <li className="dropdown_li" data-sort="popularity" onClick={this.handleSort}>popularity</li>
                            </ul>
                        </div>

                        {books[cat].sort(this.sortBooks).map((item, index) =>
                            this.props.renderBooks(item, index))}

                        <button onClick={this.showMore} type="button" className="col-sm-12 btn btn-default btn-lg">
                            Show more ...
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}


// export default LoaderHOC(Book);