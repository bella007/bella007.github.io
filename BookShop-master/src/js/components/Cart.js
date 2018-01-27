import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {delFromCart, changeQuantity, addToOrderHistory} from '../actions';
import Checkout from './Checkout'
import { withRouter } from 'react-router-dom';
import { PATH, ENV_HREF } from '../config';


const mapStateToProps = (state, ownProps) => {
    return {user: state.users.users.find((item,i)=> (item.name == state.users.authorized))} 
 }

 const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({delFromCart, changeQuantity, addToOrderHistory}, dispatch);
}


@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Cart extends React.Component {
    
    

    componentWillMount(){
        this.props.cart;
    }

    componentDidUpdate() {
        this.props.cart;
    }

    componentDidMount(){
        this.sum()
    }

    handleDel(id_book){
        this.props.delFromCart(id_book)
    }
    handleCheckout = () => {
        this.props.history.push(`${ENV_HREF}account/checkout`)
        let summ = this.sum()
        this.props.addToOrderHistory({books: this.props.user.cart, sum: summ})
        this.props.user.cart.map((item,i) => (this.props.delFromCart(item.book.id)))
    }
    sum() {
        let sum = 0
        this.props.user.cart.map((item, index) => { 
            let before_sum = (item.book.saleInfo.listPrice ? Math.round(item.book.saleInfo.listPrice.amount):0)*item.quantity
            sum += before_sum        
            
        })
        return (Math.round(sum))
        sum=0
    }

    // home() { console.log(this); this.props.history.push(`/`);}
    renderBuys(item,index) {
        let src = item.book.volumeInfo.imageLinks && item.book.volumeInfo.imageLinks.smallThumbnail ?
        item.book.volumeInfo.imageLinks.smallThumbnail :
        `${PATH}book_default.jpg`;

        const url = {backgroundImage: `url(${item.book.volumeInfo.imageLinks.smallThumbnail})`};
        const trash = `${PATH}if_icon-ios7-trash-outline_211835.png`;
        // <div style={url} className='col-md-3 col-sm-12 book-image'></div>
        
        
        
        return (
                <div className="row goods-line" key={index}>
                    <div className="col-md-7 col-sm-12">    
                        <h4>{index}</h4>
                        <img className="card-img-top" src={src} />
                        <h4>{item.book.volumeInfo.title}</h4>
                    </div>
                    <div className="col-md-1 col-sm-12 price">
                        <h4>{(item.book.saleInfo.listPrice ? Math.round(item.book.saleInfo.listPrice.amount):0)} UAH</h4>
                    </div>
                    <div className="col-md-1 col-sm-12 quantity">
                        <button className="btn" onClick={this.props.changeQuantity.bind(null, '+', item)}>+</button>
                            <p>{ item.quantity }</p>
                        <button className="btn" onClick={this.props.changeQuantity.bind(null, '-', item)}>-</button>
                    </div>
                    <div className="col-md-1 col-sm-12 price">
                        <h4>
                            {(item.book.saleInfo.listPrice ? Math.round(item.book.saleInfo.listPrice.amount):0)*item.quantity}{item.book.saleInfo.listPrice ? item.book.saleInfo.listPrice.currencyCode : ' UAH' }
                        </h4>
                    </div>
                    
                    <div className="col-md-1 col-sm-12 trash">
                    <img className="trash-img" src={trash} onClick={this.handleDel.bind(this, item.book.id)} />
                    </div>
                
                
            </div>
        
    )}

    render() {
        return (
            <div className="cart-wrapper">
                <div className="cart-goods">{this.props.user.cart.map((item, index) => { return this.renderBuys(item, index+1)})}</div>
                {this.props.user.cart.length !=0 ? ( <div className="row">
                    <div className="col-md-9 col-sm-12"></div>
                    <div className='col-md-3 col-sm-12'>
                        <h4 className="sum">{this.sum()} UAH</h4>
                        <button className="btn-success btn-default btn-checkout" onClick={this.handleCheckout}>Checkout</button>
                    </div>
                </div>): false}
            </div>
            
        )
    }
}