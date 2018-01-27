import React from 'react';
import { PATH, ENV_HREF } from '../config';



export default class ErrorPage extends React.Component {

    render() {
        const url = `${PATH}Sad book.png`;

        return (

            <div className='error-wrapper'>
                <img src={`${PATH}Sad book.png`} />
                <h1>You just got 404'D</h1>
                <br /><br />
                <h2>The page you are looking for does not exist. Sorry :( </h2>
                <button onClick={() => (this.props.history.push(`${ENV_HREF}`))}>Back to shopping</button>
            </div>

        )
    }
}