import React, { useState } from 'react'
import './Login.css'
import {loginUser} from '../Api.jsx'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginSubmit = (e)=>{
        e.preventDefault();
        const formData = {
            "Email" : email,
            "Password" : password,
        }
        loginUser(formData).then((data)=> console.log(data.data))
    }

  return (
    <>
     <div className="login-container" style={{backgroundColor: "#1e1e1e"}}>
        <form className="login-form" onSubmit={loginSubmit}>
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
        <p className="create-account">Create account</p>
     </div>
    </>
  )
}

export default Login