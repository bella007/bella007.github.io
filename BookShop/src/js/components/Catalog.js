import React from 'react';
import Categories from './Categories';
import Book from './Book';
import Slider from './Slider';
import { fetchBooks, changeActiveCategory } from '../actions';
import { connect } from 'react-redux';
import { PATH, ENV_HREF } from '../config';

import { bindActionCreators } from 'redux';
// import {fetchData} from '../functions/fetchData';

const mapStateToProps = (state) => {
    return {watchedBooks: state.slider}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchBooks, changeActiveCategory }, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class Catalog extends React.Component {


    render() {

        return (
            <div className="row">
                <div className="row slider-container">
                    <div className='col-md-3 com-sm-12'>
                    <Categories />
                    </div>
                    <div className='col-md-9 com-sm-12'>
                        <Slider>
                            <img src={`${PATH}slider5.png`}/>
                            <img src={`${PATH}slider7.png`}/>
                            <img src={`${PATH}slider4.png`}/>
                            <img src={`${PATH}slider6.png`}/>
                        </Slider>
                           
                <Book />
                    </div>
                </div>
                <div className='col-md-3 col-sm-12 categories'>
                  
                </div>
             
            </div>
        )
    }
}