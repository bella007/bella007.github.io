import React from 'react';

export function renderStars(book, size) {
    let rating = book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0;
    let full = Math.floor(rating);
    let half = rating - full;
    let empty = 5 - Math.ceil(rating);

    let stars = [];

    for (let i = 0; i < full; i++) {
        stars.push(<i key={stars.length} className={`fa fa-star ${size}`} aria-hidden="true"></i>);
    }
    if (half !== 0) stars.push(<i key={stars.length} className={`fa fa-star-half-o ${size}`} aria-hidden="true"></i>)
    for (let i = 0; i < empty; i++) {
        stars.push(<i key={stars.length} className={`fa fa-star-o ${size}`} aria-hidden="true"></i>)
    }

    return stars;
}