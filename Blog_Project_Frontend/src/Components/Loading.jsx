import React from 'react'
import './Loding.css'

const Loading = ({loadingMessage}) => {
    const Message = loadingMessage;
    return (
        <>
            <div className="loading-container">
                <div className="logo">
                    <h1>My Blog</h1>
                </div>
                <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
                <p>{Message}, please wait...</p>
            </div>
        </>
    )
}

export default Loading