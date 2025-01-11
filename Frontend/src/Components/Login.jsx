import React, { useEffect, useState } from 'react'
import './Login.css'
import { loginUser } from '../Api.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { setCookie } from '../Cookie/Cookie.js'
import { useMutation } from '@tanstack/react-query'
import SucessComp from './SucessComp.jsx'
import Loading from './Loading.jsx'
import ErrorComp from './ErrorComp.jsx'

const Login = ({ setLoginStatus, loginStatus, loginUserData }) => {

    useEffect(() => {

        if (loginStatus) {
            navigate('/blogs');
        }
    }, [loginUserData])

    const navigate = useNavigate();
    const [isCookie, setIsCookie] = useState(false);
    const [cookieError, setCookieError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUserMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: ()=>{
            setIsCookie(true);
        },
    });

    useEffect( () => {
        if (isCookie) {
            try {
                setCookie(loginUserMutation.data.data.jwtToken);
            } catch (error) {
                setCookieError(true);
                return 1;
            }
            setLoginStatus(true);
        }
    },[loginUserMutation.data])
    
    const settingCookie = () => {
        console.log(loginUserMutation.data);
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            "Email": email,
            "Password": password,
        }
        loginUserMutation.mutate(formData);
    }

    if(loginUserMutation.isSuccess){
        return(
            <SucessComp SucessMessage={loginUserMutation.data.data.Message} />
          )
    }

    if (loginUserMutation.isError ) {
        return (
            <ErrorComp errorMessage = {loginUserMutation.error?.response?.data.Message ?? "Something went wrong."} code = {loginUserMutation.error?.status ?? 404} />
        )
    }

    if (loginUserMutation.isPending ) {
        return(<Loading loadingMessage="User verifying"/>)
    }

    return (
        <>
            <div className="login-container" style={{ backgroundColor: "#1e1e1e" }}>
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password" name="password"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
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