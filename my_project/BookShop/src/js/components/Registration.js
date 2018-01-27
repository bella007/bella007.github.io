import React from 'react';
import { addUser } from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PATH, ENV_HREF } from '../config';

const mapDispatchToProps = (dispatch)=> {
	return bindActionCreators({addUser}, dispatch);
}
@connect(null, mapDispatchToProps)
export default class Registration extends React.Component {

	handleOnClickLogin =()=>{
		if(this.refs.login.value != '' && this.refs.password.value == this.refs.passwordConfirm.value && this.refs.email.value != ''){
			let newUser = {
				name: this.refs.login.value,
				password: this.refs.password.value,
				email: this.refs.email.value
			}
			this.refs.login.value = '';
			this.refs.password.value = '';
			this.refs.passwordConfirm.value = '';
			this.refs.email.value = '';

			this.props.addUser(newUser);
		}
		this.props.closeReg();
	}
	handleOnClickClose =()=>{
		this.props.closeReg();
	}

    render() {
        return (
            <div className="registrationForm">
                <input type="text" ref="login" placeholder="Login" />
                <input type="password" ref="password" placeholder="Password" />
                <input type="password" ref="passwordConfirm" placeholder="Confirm Password" />
                <input type="email" ref="email" placeholder="E-mail" />
                <button className="btn-default" type="submit" onClick={this.handleOnClickLogin}>Sign in</button>
                <button className="btn-default" type="submit" onClick={this.handleOnClickClose}>Close</button>
            </div>
        )
    }
}