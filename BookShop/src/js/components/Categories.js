import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { changeActiveCategory } from '../actions';
import { PATH, ENV_HREF } from '../config';

const mapStateToProps = (state) => {
    return ({
        sideMenu: state.sideMenu,
        categories: state.categories,
        category: state.activeCategory.active,
        data: state.data,
        books: state.data.filter((item) => { return Object.keys(item)[0] == state.activeCategory.active })
    })
};

@withRouter
@connect(mapStateToProps, { changeActiveCategory })
export default class Categories extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            ontop: 500,
        }

    }




    handleChangeCategory = (cat) => {
        let data = this.props.data.filter((item) => Object.keys(item)[0] == cat);
        // console.log(data);
        if (data[0][Object.keys(data[0])[0]].length == 0) {
            this.context.changeCategory("category", cat);
        } else {
            this.props.changeActiveCategory(cat);
            this.props.history.push(`${ENV_HREF}category/${cat}`);
        }

        // this.props._push(cat);
        // this.props.fetch(cat);
        // // console.log('books length', this.props.books[0][this.props.category])
        // // if (!this.props.books[0][this.props.category].length) {
        // //     console.log('111')
        // //     this.props.fetch(cat);
        // // }

        // this.forceUpdate();
    }


    static contextTypes = {
        changeCategory: PropTypes.func.isRequired,
        // historyPush: PropTypes.func.isRequired,
    }

    render() {
        window.onscroll = (e) => {
            // console.dir(document)
            // console.log(this.refs.bounding.getBoundingClientRect().top + this.refs.menu.clientHeight)
            if (this.refs.bounding.getBoundingClientRect().top <= 0){
                this.refs.menu.style.position = 'fixed';
                this.refs.menu.style.top = '50px';

                if (window.scrollY + this.refs.menu.clientHeight > this.props.sideMenu){
                    // console.log('this', this.props.sideMenu - this.refs.bounding.offsetTop - this.refs.menu.clientHeight)
                    this.refs.menu.style.position = 'relative';
                    this.refs.menu.style.top = `${this.props.sideMenu - this.refs.bounding.offsetTop - this.refs.menu.clientHeight - 400}px`;
                    // this.refs.menu.style.top = `${this.props.sideMenu - this.refs.bounding.offsetTop - this.refs.menu.clientHeight}px`;
                } 

            } else {
                this.refs.menu.style.position = 'relative';
                this.refs.menu.style.top = '';
            }
        }
            return (
                <div ref="bounding">
                    <ul className="menu" ref="menu">
                        {this.props.categories.map((item, i) => {
                            return <li className="categoryMenu" key={i}
                                onClick={this.handleChangeCategory.bind(null, item)}>{item}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }