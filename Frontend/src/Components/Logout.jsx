import React, { useEffect } from 'react'
import './Logout.css'
import { clearCookie } from '../Cookie/Cookie'
import { useNavigate } from 'react-router-dom'

const Logout = ( {setLoginStatus, setLoginUser, loginStatus } ) => {
    useEffect( ()=> {
        
        if (!loginStatus) {
            // alert('Invalid request');
            navigate('/');
            
        }
    },[])
    const navigate = useNavigate();
    const confirmLogout = () => {
        try {
            clearCookie();
        } catch (error) {
            return alert("Something went wrong");
        }
        setLoginStatus(false);
        setLoginUser({
            Name: '',
            Email: '',
            Role: ''
        });
        navigate('/');
    }

    const cancelLogout = () => {
        navigate('/blogs');
    }

  return (
    <div className="logout-container">
        <h1 className="logout-title">Confirm Logout</h1>
        <p className="logout-message">Are you sure you want to log out?</p>
        <div className="button-container">
            <button className="btn confirm" onClick={confirmLogout}>Yes, Logout</button>
            <button className="btn cancel" onClick={cancelLogout}>Cancel</button>
        </div>
    </div>
  )
}

export default Logout