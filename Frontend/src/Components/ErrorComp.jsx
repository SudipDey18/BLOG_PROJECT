import React from 'react'
import './ErrorComp.css'
import { Link } from 'react-router-dom'

const ErrorComp = ({errorMessage,code}) => {
    return (
        <div className="error-container">
            <h1>{code}</h1>
            <p>Oops! {errorMessage}</p>
            <Link to="/blogs" className="home-button">Go Back Home</Link>
        </div>
    )
}

export default ErrorComp