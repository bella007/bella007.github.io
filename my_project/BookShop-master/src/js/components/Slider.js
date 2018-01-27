// import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom';
// // import './App.css';

// export default class Slider extends React.Component {
//     state = {
//         left : this.props.left
//     };

//     componentDidUpdate() {
//         setTimeout(this.handleClickLeft, 1000)

//         // setTimeout(this.handleClickRight, 35) 
//     }

//     sliderInitialize=(someBooks, width, amount)=>{
//         width = parseInt(width,10);
//         amount = parseInt(amount,10);
//         if (someBooks.length-amount<2){
//             amount=someBooks.length-2
//         }

//         let x = width/amount - 10;
//         let y = width/amount;
//         let h = 1.5*x;
//         let iStateLeft = this.props.left;

//         this.handleClickRight = () =>{
//             console.log('work')
//             if(this.state.left < (iStateLeft)){
//                 this.setState({left: this.state.left+y})
//             }
//         };
//         this.handleClickLeft = () =>{
//             if(this.state.left >= -(someBooks.length-1-amount)*y){
//                 this.setState({left: this.state.left-100})
//                 if (this.state.left <= -3000){
//                     console.log('hey')
//                     this.setState({left: this.state.left+y*10})
//                 }
//                 console.log(someBooks)
//                 // setTimeout(this.setState({left: this.state.left+y}), 1000) 
                
//             }
//         };
//         return (
//             <div className="footer-slider-wrapper">
//                     <div className='slider-block'  style={{width: width+2*iStateLeft +'px', height: h + 'px', left:'20px'}}>
//                         <div className='slider-inline' style={{left: this.state.left+'px'}}>
//                             {someBooks.map((item, index) => {
//                                 return(
//                                     <div className='link' key={index}><img src={item.img}  style={{width: x +'px', height: h + 'px'}} /></div>
//                                 )
//                             } )}
//                         </div>
//                     </div>
//             </div>)
//     };
//     render () {
//         return(
//             this.sliderInitialize.call(this,this.props.watchedBooks, this.props.widthCarts, this.props.visibleAmount)
//         )
//     }
// }


import React, {PureComponent, Children} from 'react';
import Particles from 'react-particles-js';
import { PATH, ENV_HREF } from '../config';

export default class Slider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.currentIndex !== nextState.currentIndex) {
            return true
        } else {
            return false;
        }
    }

    updateCurrentIndex() {
        let self = this;
        this.timer = setTimeout(() => {
            self.setState({
                currentIndex: self.state.currentIndex < Children.count(this.props.children)-1
                    ? self.state.currentIndex+1
                    : 0})
        }, 2000)
    }

    componentDidMount() {
        this.updateCurrentIndex();
    }

    componentDidUpdate() {
        this.updateCurrentIndex();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
                <div className="slider">
                    {Children.toArray(this.props.children)[this.state.currentIndex]}
                </div>
        )
    }
} 