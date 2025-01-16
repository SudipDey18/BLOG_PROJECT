import React from 'react'
import './SucessComp.css'
import { Link } from 'react-router-dom'

const SucessComp = ({SucessMessage}) => {
    return (
        <>
            <div className="success-container">
                <div className="icon">
                    ✓
                </div>
                <h1>Success!</h1>
                <p>{SucessMessage}</p>
                <Link to="/blogs" className="home-button">Go Back to Home</Link>
            </div>
        </>
    )
}

export default SucessComp