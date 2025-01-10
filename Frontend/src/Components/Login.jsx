import React, { useEffect, useState } from 'react'
import './Login.css'
import {loginUser} from '../Api.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { setCookie } from '../Cookie/Cookie.js'

const Login = ( { setLoginStatus, loginStatus , loginUserData } ) => {

    useEffect( ()=> {
        
            if (loginStatus) {
                navigate('/blogs');
            }
        },[loginUserData])

    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageState, setMessageState] = useState('hideBlogMessage');
    const [message2State, setMessage2State] =useState('hideBlogMessage');

    function redirect(path) {
        // console.log(path);
        setTimeout(() => {
            setMessage('');
            setMessageState("hideBlogMessage");
            setMessage2State("hideBlogMessage");
            
            navigate(`${path}`);
            setLoginStatus(true);
        },5000);
    }


    const loginSubmit = async (e)=>{
        e.preventDefault();
        const formData = {
            "Email" : email,
            "Password" : password,
        }
        const apiData = await loginUser(formData);
        console.log(apiData.data);
        
        if (apiData.data.errorMessage) {
            if (apiData.data.errorMessage == "User not found"){
                setMessage(apiData.data.errorMessage);
                setMessageState("errorBlogMessage");
                setMessage2State("errorBlogMessage");
                redirect('/createUser');
            }else{
                setMessage(apiData.data.errorMessage);
                setMessageState("errorBlogMessage");
                redirect('');
            }
        }else{
            const message = await setCookie(apiData.data.jwtToken);
            if (message.errorMessage){
                setMessage(message.errorMessage);
                setMessageState("errorBlogMessage");
                redirect('');
            }else{
                setMessage(message.sucessMessage);
                setMessageState("sucessBlogMessage");
                setMessage2State("sucessBlogMessage");
                redirect('/blogs');
            }
        }
    }

  return (
    <>
     <div className="login-container" style={{backgroundColor: "#1e1e1e"}}>
        <form className="login-form" onSubmit={loginSubmit}>
            <span id="statusMessage" className={messageState} >{message}</span>
            <span id="statusMessage" className={message2State} >Please wait, redirecting...</span> 
            <h2>Login</h2>
            <div className="input-group">
                <label htmlFor="email"> Email</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email" 
                required 
                onChange={(e)=> setEmail(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                id="password" name="password" 
                placeholder="Enter your password" 
                required 
                onChange={(e)=> setPassword(e.target.value)}
                />
            </div>

            <button type="submit">Login</button>
        </form>
        <p className="create-account"><Link id='linkTag' to="/createUser">Create Account</Link></p>
     </div>
    </>
  )
}

export default Login