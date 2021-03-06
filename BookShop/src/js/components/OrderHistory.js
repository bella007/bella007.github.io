import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import initialState from '../constants/initialState';
import { renderBooks } from '../functions/renderBooks';
import { addToCart } from '../actions';
import { bindActionCreators } from 'redux';
import { renderStars } from '../functions/renderStars';
import { PATH, ENV_HREF } from '../config';

const mapStateToProps = (state) => {
	return ({ user: state.users.users.filter((item) => item.name === state.users.authorized)[0] })
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ addToCart }, dispatch);
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class OrderHistory extends React.Component {

	constructor(props) {
		super(props)
		this.renderBooks = renderBooks.bind(this);
		this.renderStars = renderStars.bind(this);
	}

	handleClick = (id) => {
		this.props.history.push(`${ENV_HREF}book/${id}`);
	}
	handleBuy = (item) => {
		this.context.notify();
		this.context.val_fun(`You add "${item.volumeInfo.title}" to the cart`)
		this.props.addToCart(item);
	}

	render() {
		console.log('this.props.user.orderHistory[0].buys', this.props.user.orderHistory[0].buys[0].book)
		return (
			<div>
				<h2>OrderHistory</h2>
				<div>{this.props.user.orderHistory[0].date}</div>

				<div className="wrapper-for-books">
			
				
					{this.props.user.orderHistory.map((item, index) => {
						{this.props.user.orderHistory[0].date}
						return item.buys.map((cartItem, i) => {
							return this.renderBooks(cartItem.book, i);
						})
					}
					)}
				
			</div>
			</div>
		);
	}
}
