import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sideMenu } from '../actions';
import { PATH, ENV_HREF } from '../config';

const mapDispatchToProps = (dispatch)=> {
  return bindActionCreators({ sideMenu }, dispatch);
}

@connect (null, mapDispatchToProps)
export default class Footer extends React.Component {

  componentDidMount() {
    setTimeout (() => {
      // console.log('footer', this.refs.footer.offsetTop)
      this.props.sideMenu(this.refs.footer.offsetTop)
    }, 1000)
    
  }

    render() {
        return (
            <div className="footer" ref="footer">
            	<div className="col-md-2 col-sm-12 contact">
            		<p>&#9400; Dream Team</p>
            	</div>
            	<div className="col-md-3 col-sm-12"></div>
            	<div className="col-md-1 col-sm-12 contact">
            		<p>Contacts:</p>
            	</div>
            	<div className="col-md-2 col-sm-12 contacts">
            		<a href="tel:+38067000000000"><p>+38(067) 000 00 00</p></a>
            		<a href="tel:+38067000000000"><p>+38(067) 000 00 00</p></a>
            		<a href="mailto:123@dfg.dfg"><p>123@dfg.dfg</p></a>
            		
            	</div>
            	<div className="col-md-2 col-sm-12"></div>
              	<div className="col-lg-2 col-sm-12 social">
              		<a href="http://www.facebook.com"><img src={`${PATH}fb.png`} title="facebook" /></a>
              		<a href="https://www.instagram.com/"><img src={`${PATH}ig.png`} title="instagram" /></a>
              		<a href="https://plus.google.com"><img src={`${PATH}g+.png`} title="google+" /></a>
              		<a href="https://twitter.com"><img src={`${PATH}tw.png`} title="twitter" /></a>
              </div>
            </div>
        )
    }
}