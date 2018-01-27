import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { PATH, ENV_HREF } from '../config';

export default class Notify extends Component {
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    componentDidMount() {
        this.timer = setTimeout(this.context.notify, 500);
    }

    static contextTypes = {
        notify: PropTypes.func.isRequired,
        val_fun: PropTypes.func.isRequired,
        val: PropTypes.string.isRequired
     };

     close = () => {
        this.context.notify()
     }

    render() {
        return (
        <div>            
            <div className="modalDialog">
                <div>
                    <a className="close" onClick={this.close}>X</a>
                    <div>{this.context.val}</div>
                </div>
            </div>
            
        </div>
        )
    }

}