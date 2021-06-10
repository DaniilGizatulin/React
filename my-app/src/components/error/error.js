import React from 'react';
import { Link } from 'react-router-dom'
import './error.sass';

const Error = ({ message }) => {

    return (
        <div className="error-message">
            <div>
                <button className='back-tag'>
                    <Link to={`/list/page${1}/?limit=10&skip=${0}`} >Back to main</Link>
                </button>😞
            </div>
            {message
                ? <p>{message}</p>
                : <p>Sorry, something went wrong...</p>
            }
        </div>
    )
}



export default Error;