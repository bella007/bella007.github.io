import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Favicon from 'react-favicon';
import { PATH, ENV_HREF } from '../config';
// import pict from ''
// console.log(PATH)
// const x = `.${PATH}heart.png`;


import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';

export default class MainLayout extends React.Component {

    

    render() {
        // console.log(`${PATH}heart.png`)
        let url = `${PATH}books.svg`;
        return (
            <div className="container-fluid">
                <Favicon url={url}/>
                <div className="row">
                    <Header />
                </div>
                {/* <div className="row"> */}
                    {this.props.children}
                {/* </div> */}
                <div className="row">
                    <Footer />
                </div>
             

               


            </div>
        )
    }
}