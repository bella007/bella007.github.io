import React from 'react';
import { PATH } from '../config';

export function renderBooks(item, index) {
    // console.log('item.volumeInfo.imageLinks.smallThumbnail', item.volumeInfo.imageLinks.smallThumbnail);
    let src = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail ?
        item.volumeInfo.imageLinks.smallThumbnail :
        `${PATH}book_default.jpg`;

    let price = item.saleInfo.listPrice ?
        `${Math.round(item.saleInfo.listPrice.amount)} UAH` :
        'FREE';

    let author = item.volumeInfo.authors ? item.volumeInfo.authors.length > 1 ? item.volumeInfo.authors[0] + ' ...' : item.volumeInfo.authors[0] : "-";

    let authorDisplay = author.substring(0, 15);
    let title = item.volumeInfo.title.substring(0, 30);

    let stars = item.volumeInfo.averageRating ? item.volumeInfo.averageRating : 0;
    let isInWishList = false;

    if (this.props.user !== undefined && this.props.user.wishList.length > 0) {
        let temp = this.props.user.wishList.filter((book) => book.id === item.id);
        if (temp.length > 0) isInWishList = true;
    }

    return (
        <div key={index} className="col-lg-3 col-md-6 mb-4">
            <div className="card" onClick={this.handleClick.bind(null, item.id, item)}>
                <div className="book-top-part">
                    <img className="card-img-top" src={src} />
                    <div className='row' >
                        {this.renderStars(item, '').map((star) => star)}
                    </div>
                </div>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">Author: <span>{authorDisplay}</span></p>
                    <p className="card-text">Categorie: <span>{item.volumeInfo.categories}</span></p>
                    <div className="wrapper-for-rate-stars">
                        {<p className="card-text">Rating: <span>{stars}</span></p>}

                    </div>

                </div>
            </div>
            <div className="price-block">
                <div className="heart" onClick={(event) => this.handleWish(item, event)}>
                    {!isInWishList ?
                        <i className='fa fa-heart-o fa-2x' aria-hidden="true"></i> :
                        <i className="fa fa-heart fa-2x" aria-hidden="true"></i>}
                </div>
                <p className="card-text price">{price}</p>
                <button className="btn-default btn-success" onClick={this.handleBuy.bind(null, item)}>BUY</button>
            </div>
        </div>
    )
}