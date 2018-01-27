import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';
import initialState from '../constants/initialState';
import { fetchBooks, changeActiveCategory, clearSearch, logout } from '../actions';
import { bindActionCreators } from 'redux';
import fetchData from '../functions/fetchData';
import PropTypes from 'prop-types';
import { PATH, ENV_HREF } from '../config';
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchBooks, changeActiveCategory, clearSearch, logout }, dispatch);
}
const logo = {
  backgroundImage: `url(${PATH}logo.png)`
}
let cartEmptyCart = {
  backgroundImage: `url(${PATH}shopping_cart_empty.png)`
}
const cartWithGoods = {
  backgroundImage: `url(${PATH}shopping_cart.png)`
}
const user = {
  backgroundImage: `url(${PATH}User.png)`
}
const mapStateToProps = (state) => {
  return ({User: state.users.authorized, 
          users: state.users.users})
}
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.fetchData = fetchData.bind(this);
  }
  state = {
    visibleLogin: false,
    visibleReg: false,
  }
  handleInputChange = (e) => {
    if (e.key === 'Enter') {
      this.props.clearSearch();
      this.context.changeCategory("search", this.refs.search.value, true);
      this.refs.search.value = '';
    }
    if (this.refs.search.value != ''){
      this.refs.search.style.transition = '1s'
      this.refs.search.style.marginLeft = '25%'
      this.refs.search.style.width = '40%' 
    } else {
      this.refs.search.style.marginLeft = '37%'
      this.refs.search.style.width = ''
    }
  }
  static contextTypes = {
      changeCategory: PropTypes.func.isRequired
  }
    handleOnClickCart =()=>{
    this.props.history.push(`${ENV_HREF}account/Cart`);
    }
  componentWillReceiveProps(nextProps) {
    if(nextProps.User == 'Please login'){
      cartEmptyCart = {
        backgroundImage: `url(${PATH}shopping_cart_empty.png)`
      }
    }
    nextProps.users.map((item) => {
      if(item.name === nextProps.User){
        if (item.cart.length > 0){
          cartEmptyCart = {
            backgroundImage: `url(${PATH}shopping_cart.png)` 
          }
        } else {
            cartEmptyCart = {
                backgroundImage: `url(${PATH}shopping_cart_empty.png)`
            }
          }
        }
      }
    )
  }
    handleOnClickUser =()=>{
    if (this.props.User == 'Anonim') {
      if (this.state.visibleReg == true){
        this.setState({visibleLogin: false})
        // this.refs.userMenuHover   ---------Michael block menu for Please login
      } else {
        this.setState({visibleLogin: !this.state.visibleLogin})
      }
    }
      
    }
  handleonClickLogo = () => {
    // this.fetchData('books for developers');
    this.props.changeActiveCategory('React');
    this.props.history.push(`${ENV_HREF}`);
    // this.forceUpdate();
  }
  closeLogin = () => {
    this.setState({ visibleLogin: false })
  }
  closeReg = () => {
    this.setState({ visibleReg: !this.state.visibleReg });
  }
  handleLogout = () => {
    this.props.logout()
    this.props.history.push(`${ENV_HREF}`)
  }
    render() {
        return (
            <div className="header">
                <div className="col-md-2 col-sm-12">
                    <img className="logo" src={`${PATH}books.svg`} onClick={this.handleonClickLogo} />
                </div>
                <div className="col-md-8 col-sm-12 search">
                  <h2>Dream Team Book Store</h2>
                    <input type ="text" ref="search" onKeyPress={this.handleInputChange} placeholder="Search..." />
                </div>
                <div className="col-md-1 col-sm-12 accoundBlock">
                  <div className="cart" onClick={this.handleOnClickCart} style={cartEmptyCart}>
                  </div>
                </div>
                <div className="col-md-1 col-sm-12 accoundBlock">
                  <div className="account" onClick={this.handleOnClickUser} style={user}></div>
                  {this.state.visibleLogin? <Login closeLogin={this.closeLogin} closeReg={this.closeReg} /> :null}
                    <div className="accountStatus"></div>
                  <p className="pUserName" onClick={this.handleOnClickUser}>{this.props.User}</p>
                  <div ref="userMenuHover"id="user-hover"></div>
                  {this.state.visibleReg? <Registration closeReg={this.closeReg} /> :null}
                  <ul className="menuUser">
                  {initialState.userMenu.map((item,i) =>  
                    <li key={i} 
                     onClick={() => this.props.history.push(`${ENV_HREF}account/${item}`)}>
                      {item}
                    </li> )}
                    <li onClick={this.handleLogout}>Exit</li>
                  </ul>
                </div>
            </div>
        )
    }
}