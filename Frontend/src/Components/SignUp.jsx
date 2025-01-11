import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { createUser } from '../Api.jsx'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Loading from './Loading.jsx';
import ErrorComp from './ErrorComp.jsx';
import SucessComp from './SucessComp.jsx';


const SignUp = ({ loginStatus }) => {

    useEffect(() => {
        if (loginStatus) {
            navigate('/blogs');
        }
    }, [loginStatus]);

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');

    const createUserMutation = useMutation({
        mutationFn: createUser
    })

    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = {
            "Name": name,
            "Email": email,
            "Password": password,
            "Role": role,
            "Gender": gender
        }
        createUserMutation.mutate(formData);
    }

    if (createUserMutation.isPending) {
        return (<Loading loadingMessage="User Creating"/>)
    }

    if (createUserMutation.isSuccess) {
        return(
          <SucessComp SucessMessage={createUserMutation.data.data.Message} />
        )
    }

    if (createUserMutation.isError) {
        console.log(createUserMutation.error);
        
        return(<ErrorComp errorMessage= {createUserMutation.error?.response.data.Message ?? createUserMutation.error.message} code = {createUserMutation.error?.status ?? 404} /> )
    }

    return (
        <div className="form-container">
            <h2>SignUp</h2>
            <form onSubmit={handelSubmit}>
                <label htmlFor="name" className='inputLabel'>Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className='signupInput'
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email" className='inputLabel'>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className='signupInput'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password" className='inputLabel'>Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className='signupInput'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className='inputLabel'>Gender:</label>
                <div className="gender-options">
                    <label htmlFor="male" className='optionLabel'>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            required
                            onClick={(e) => setGender(e.target.value)}
                        /> Male
                    </label>
                    <label htmlFor="female" className='optionLabel'>
                        <input type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onClick={(e) => setGender(e.target.value)}
                        /> Female
                    </label>
                </div>

                <label className='inputLabel'>Role:</label>
                <div className="role-options">
                    <label htmlFor="reader" className='optionLabel'>
                        <input
                            type="radio"
                            id="reader"
                            name="role"
                            value="reader"
                            required
                            onClick={(e) => setRole(e.target.value)}
                        /> Reader
                    </label>
                    <label htmlFor="writer" className='optionLabel'>
                        <input
                            type="radio"
                            id="writer"
                            name="role"
                            value="writer"
                            onClick={(e) => setRole(e.target.value)}
                        /> Writer
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
            <div className="login-container">
                <p>Already have account?<Link id='linkTag' to='/'>Login</Link></p>
            </div>
        </div>
    )
}

export default SignUp