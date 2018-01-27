import React, { Component } from 'react';
import { connect } from 'react-redux'
import initialState from '../constants/initialState';
import { logout } from '../actions';
import Cart from './Cart'
import WishList from './WishList'
import OrderHistory from './OrderHistory'
import ViewHistory from './ViewHistory';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { PATH, ENV_HREF } from '../config';

const mapDispatchToProps =(dispatch)=> {
    return bindActionCreators ({ logout }, dispatch)
}

@withRouter
@connect(null, mapDispatchToProps)
export default class Account extends React.Component {
    state = {
        Cart: false,
        WishList: false,
        OrderHistory: false,
		ViewHistory: false,
		// current: this
	}
	
	constructor(props) {
		super(props);
		this.menuDisplay = this.menuDisplay.bind(this);
	}

    menuDisplay(item) {
		// console.log(this, item)
		let menuAcc = item || this.props.match.params.category;
		// console.log("Menu Acc >>> ", menuAcc);
		
        if (menuAcc == 'Cart' && this.state.Cart == false){
			this.setState({Cart: true, WishList: false, OrderHistory: false, ViewHistory: false})
			this.props.history.push(`${ENV_HREF}account/${menuAcc}`)
        } if (menuAcc == 'Wish list' && this.state.WishList == false){
			this.setState({Cart: false, WishList: true, OrderHistory: false, ViewHistory: false})
			this.props.history.push(`${ENV_HREF}account/${menuAcc}`)
        } if (menuAcc == 'Order history' && this.state.OrderHistory == false){
			this.setState({Cart: false, WishList: false, OrderHistory: true, ViewHistory: false})
			this.props.history.push(`${ENV_HREF}account/${menuAcc}`)
        } if (menuAcc == 'View history' && this.state.ViewHistory == false){
			this.setState({Cart: false, WishList: false, OrderHistory: false, ViewHistory: true})
			this.props.history.push(`${ENV_HREF}account/${menuAcc}`)
        }
	}
	
    componentWillMount() {
        this.menuDisplay();
    }
    componentDidUpdate() {
		this.menuDisplay(null);
    }

    handleLogout = () => {
        this.props.logout()
        this.props.history.push(`${ENV_HREF}`)
    }

    render() {
		// console.log("Account render: >>> ", this.state);
        return (
            <div className="row">
                <div className="col-md-2 col-sm-12">
                    <ul className="account-menu">
                        {initialState.userMenu.map((item,i) => 
							<li key={i}
								onClick={this.menuDisplay.bind(null, item)}>
								{item}
							</li>
                        )}
                        <li onClick={this.handleLogout}>Exit</li>
                    </ul>
                </div>
                <div className="col-md-1 col-sm-1"></div>
                <div className="col-md-9 col-sm-12">
                    {this.state.Cart ? <Cart /> : null}
                    {this.state.WishList ? <WishList /> :null}
                    {this.state.OrderHistory? <OrderHistory /> :null}
                    {this.state.ViewHistory? <ViewHistory /> :null}
                </div>
            </div>
        );
    }
}
