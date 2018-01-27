import React from 'react';
import Book from '../components/Book'
import { withRouter } from 'react-router-dom';
import { fetchBooks, changeActiveCategory } from '../actions';
import { connect } from 'react-redux';
import { PATH, ENV_HREF } from '../config';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks, changeActiveCategory }, dispatch);
}


@withRouter
@connect(null, mapDispatchToProps)
export default class Search extends React.Component {

    constructor(props) {
        super(props)
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    fetchData = (keyword) => {
        console.log(this.props)
        keyword = keyword ? keyword : this.props.match.params.category ? this.props.match.params.category : 'books for developer';
        console.log('keyword from fetch data', keyword);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=10&startIndex=1&key=AIzaSyA4JIoWhviEmDzk2ArCPSnrgvdyF_bgcEU`)
            .then(res => res.json())
            .then(res => {
                console.log('res.items from fetchbooks', res.items)
                this.props.fetchBooks(res.items, keyword);
                this.props.changeActiveCategory(keyword);
            })
            .catch(err => console.log(err))
    }
    
    handleChangeCategory(cat) {
        this.forceUpdate();
        console.log('Change category?', cat, this.props);
        this.props.changeActiveCategory(cat);
        this.props.fetch(cat);
        this.props.history.push(`${ENV_HREF}category/${cat}`);
    }


    render() {
    	// console.log('i am search')
        return (
            <div className="row">
            <div className='col-md-3 col-sm-12'><Categories _push={this.handleChangeCategory} fetch={this.fetchData}/></div>
               <div className='col-md-9 col-sm-12 left-part-wrapper'>
               
               <Book />
           </div>

           
       </div>
        )
    }
}