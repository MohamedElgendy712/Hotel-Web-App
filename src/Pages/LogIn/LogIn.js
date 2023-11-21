import React, { useState } from 'react';
import { Store } from 'react-notifications-component';
import axios from 'axios';

import './login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Components/Authorization/auth';

const LogIn = () => {

    const auth = useAuth() // control user data & login & logout

    const[email , setEmail] = useState('')
    const[password , setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const redirectionPath = location.state?.path || '/'

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

    const onLogIn = ()=>{
        validateForm()

        axios.post("https://hotel-app-backend-zztv.onrender.com/user/login" , {email : email , password : password})
        .then(response =>{
            auth.login(response.data)
            navigate(redirectionPath , {replace : true})
        })
        .catch(error => {
            Store.addNotification({
                ...notification,
                message: error.response.data.errorMsg
            });
        })
    }

    const validateForm = ()=>{

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            Store.addNotification({
                ...notification,
                message: "Invalid Email Format"
            });
        }
    }
  
    return (
         <div className='log-in'>

            <div className='form'>
                <div className='form-container'>
                    {/* User Email & Phone */}

                    <div className="input-container">
                        <label htmlFor="email">
                            Email
                            <span className='required-flag'>*</span>
                        </label>
                        <input onChange={ e => setEmail(e.target.value)} type="email" name="email" id="email" value={email} required/>
                    </div>

                    {/* User Password */}
                    <div className="input-container">
                        <label htmlFor="password">
                            Password
                            <span className='required-flag'>*</span>
                        </label>
                        <input onChange={ e => setPassword(e.target.value)} type="password" name="password" id="password" value={password} required/>
                    </div>
                    
                    {/* Sign In Button */}

                    <button onClick={onLogIn} className='btn-contain'>LogIn</button>
                </div>
            </div>

            <div className='login-bg'>
                {/* <p>Book &#128221;</p>
                <p>Travel &#128747;</p>
                <p>Enjoy &#129304;</p> */}
            </div>

        </div>
    );
}

export default LogIn;
