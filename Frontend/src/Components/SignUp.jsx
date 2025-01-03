import React, { useState } from 'react'
import './SignUp.css'
import {createUser} from '../Api.jsx'

const SignUp = () => {

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole] = useState('');
    const [gender, setGender] = useState('');

    const handelSubmit = (e)=> {
        e.preventDefault();
        const formData = {
            "Name" : name,
            "Email" : email,
            "Password" : password,
            "Role" : role,
            "Gender" : gender
        }
        createUser(formData).then((data)=> console.log(data.data))
        .catch((err)=> console.log(err))
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
            onChange={(e)=> setName(e.target.value)}
            />
            <label htmlFor="email" className='inputLabel'>Email:</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            className='signupInput' 
            required
            onChange={(e)=> setEmail(e.target.value)}
            />

            <label htmlFor="password" className='inputLabel'>Password:</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            className='signupInput' 
            required
            onChange={(e)=> setPassword(e.target.value)}
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
                    onClick={(e)=> setGender(e.target.value)}
                    /> Male
                </label>
                <label htmlFor="female" className='optionLabel'>
                    <input type="radio" 
                    id="female" 
                    name="gender" 
                    value="female"
                    onClick={(e)=> setGender(e.target.value)}
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
                    onClick={(e)=> setRole(e.target.value)}
                    /> Reader
                </label>
                <label htmlFor="writer" className='optionLabel'>
                    <input 
                    type="radio" 
                    id="writer" 
                    name="role" 
                    value="writer"
                    onClick={(e)=> setRole(e.target.value)}
                    /> Writer
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
        <div className="login-container">
        <p>Already have account?<span id="login"> Login</span></p>
        </div>
    </div>
  )
}

export default SignUp