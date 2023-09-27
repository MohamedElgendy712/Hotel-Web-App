import React, { useContext, useRef } from 'react';
import UseAnimations from "react-useanimations";
import menu2 from 'react-useanimations/lib/menu2';
import { IoNotificationsOutline } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa6'
import { RxAvatar } from 'react-icons/rx'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

// import logo from '../../Imgs/logo.png'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Authorization/auth';

const Navbar = () => {

    const auth = useAuth()    // Get user's data

    const navigate = useNavigate()

    const menuRef = useRef(null)        // Refernce for main menu
    const logoutProfileMenuRef = useRef(null)   // Refernce for logout & profile menu

    const openCloaseMenu = () => {
        menuRef.current.classList.toggle('open')
    }

    const openCloseLogoutProfileMenu = () => {
        logoutProfileMenuRef.current.classList.toggle('open')
    }

    const handleLogOut = () => {
        auth.logout()
    }

    return (

        <div className='navbar'>

            {/* Logo */}
            <div className="logo-container">
                {/* <img className='logo' src={logo} alt="logo" /> */}
                <p className="logo">Logo</p>
            </div>

            {/* Menu Button */}
            <UseAnimations onClick={openCloaseMenu} className='menu-icon' animation={menu2} strokeColor='white' size={32} />

            <div ref={menuRef} className="navbar-content">

                {/* Close Menu Button */}
                <AiOutlineCloseCircle className='close-btn' onClick={openCloaseMenu} />

                {/* Menu Items */}
                <ul className="navbar-list">
                    <li className="navbar-list-item">
                        <Link to={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="navbar-list-item">
                        <Link>
                            Hotels
                        </Link>
                    </li>
                    <li className="navbar-list-item">
                        <Link>
                            Apartments
                        </Link>
                    </li>
                    <li className="navbar-list-item">
                        <Link>
                            Contact Us
                        </Link>
                    </li>
                </ul>

                {/* Login & Registeration Buttons */}
                {!auth.user &&
                    <div className='navbar-btns'>
                        <Link to={'/login'}><button className='login-btn'>Log In</button></Link>
                        <Link to={'/signin'}><button className='register-btn'>Register</button></Link>
                    </div>
                }

                {/* Notification & Favorites & Profile & Logout Buttons */}
                {auth.user &&
                    <div className="control-section">

                        <IoNotificationsOutline className='notification' />

                        <div className="favorite-container">
                            <FaRegHeart className='favorites' />
                            { auth.user.favorite.length > 0 && <span className='no-favourite'>{auth.user.favorite.length}</span>}
                        </div>

                        <div className="user" onClick={openCloseLogoutProfileMenu}>
                            <RxAvatar className='user-picture' />
                            <p className='user-name'>{auth.user.firstName} {auth.user.lastName}</p>

                            <div ref={logoutProfileMenuRef} className="profile-logout-menu">
                                <Link to='/userProfile'>
                                    <div className="profile">
                                        <BsFillPersonFill />
                                        <p>My Profile</p>
                                    </div>
                                </Link>
                                <div onClick={handleLogOut} className="logout">
                                    <BiLogOut />
                                    <p>Logout</p>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;
