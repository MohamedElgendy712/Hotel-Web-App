import React, { useState } from 'react';
import { Store } from 'react-notifications-component';
import axios from 'axios';
import { User } from '../../Models/user';

import './signIn.css'
import { useNavigate } from 'react-router-dom';



const SignIn = () => {

    const navigate = useNavigate()
    
    const[firstName , setFirstName] = useState('')
    const[lastName , setLastName] = useState('')
    const[email , setEmail] = useState('')
    const[phoneNumber , setphoneNumber] = useState('')
    const[birthDate , setBirthDate] = useState('')
    const[password , setPassword] = useState('')
    const[confirmPassword , setConfirmPassword] = useState('')
    
    const notification ={
        title: "Error",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          pauseOnHover: true,
          showIcon: true
        }
    }

    const onSignIn = ()=>{
        if(!validateForm()) return

        const user = new User(firstName , lastName , email , phoneNumber , birthDate , password)

        axios.post("http://localhost:3000/user/register" , user)
        .then(response =>{
            navigate("/login")
        })
        .catch(error => {
            error.response.data.map(err =>{
                Store.addNotification({
                    ...notification,
                    message: err
                });
            })
        })
    }

    const validateForm = ()=>{

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            Store.addNotification({
                ...notification,
                message: "Invalid Email Format"
            });

            return false
        }

        if(password.length < 8){
            Store.addNotification({
                ...notification,
                message: "password length must be at least 8 character"
            })

            return false
        }

        if(password !== confirmPassword){
            Store.addNotification({
                ...notification,
                message: "Password and Confirmed Password are not same"
            })

            return false
        }

        return true
    }

    return (
        <div className='sign-in'>

            <div className='form'>
                <div className='form-container'>
                    {/* User Name Inputs */}

                    <div>
                        <div className="input-container">
                            <label htmlFor="firstName">
                                First Name
                                <span className='required-flag'>*</span>
                            </label>
                            <input onChange={ e => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" value={firstName} required/>
                        </div>

                        <div className="input-container">
                            <label htmlFor="lastName">
                                Last Name
                                <span className='required-flag'>*</span>
                            </label>
                            <input onChange={ e => setLastName(e.target.value)} type="text" name="lastName" id="lastName" value={lastName} required/>
                        </div>
                    </div>

                    {/* User Email & Phone */}

                    <div className="input-container">
                        <label htmlFor="email">
                            Email
                            <span className='required-flag'>*</span>
                        </label>
                        <input onChange={ e => setEmail(e.target.value)} type="email" name="email" id="email" value={email} required/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="phone">
                            Phone
                            <span className='required-flag'>*</span>
                        </label>
                        <input onChange={ e => setphoneNumber(e.target.value)} type="tel" name="phone" id="phone" value={phoneNumber} required/>
                    </div>

                    {/* User Birth Date */}

                    <div className="input-container">
                        <label htmlFor="birth-date">
                            Birth Date
                            
                        </label>
                        <input onChange={ e => setBirthDate(e.target.value)} type="date" name="birth-date" id="birth-date" value={birthDate} />
                    </div>

                    {/* User Password */}
                    <div className="input-container">
                        <label htmlFor="password">
                            Password
                            <span className='required-flag'>*</span>
                        </label>
                        <input onChange={ e => setPassword(e.target.value)} type="password" name="password" id="password" value={password} required/>
                    </div>
                    
                    <div className="input-container">
                        <label htmlFor="confirm-password">
                            Confirm Password
                            <span className='required-flag'>*</span>
                        </label>
                        <input onChange={ e => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" value={confirmPassword} required/>
                    </div>
                    {/* Sign In Button */}

                    <button onClick={onSignIn} className='btn-contain'>Sign In</button>
                </div>
            </div>

            <div className='signin-bg'>
                {/* <p>Book &#128221;</p>
                <p>Travel &#128747;</p>
                <p>Enjoy &#129304;</p> */}
            </div>

        </div>
    );
}

export default SignIn;