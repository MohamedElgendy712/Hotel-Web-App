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
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const Navbar = () => {

    const user = useContext(userContext)

    const menuRef = useRef(null)
    const logoutProfileMenuRef = useRef(null)

    const openCloaseMenu = () => {
        menuRef.current.classList.toggle('open')
    }

    const openCloseLogoutProfileMenu = ()=>{
        logoutProfileMenuRef.current.classList.toggle('open')
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
                {user == null &&
                    <div className='navbar-btns'>
                        <Link to={'/login'}><button className='login-btn'>Log In</button></Link>
                        <Link to={'/signin'}><button className='register-btn'>Register</button></Link>
                    </div>
                }

                {/* Notification & Favourites & Profile & Logout Buttons */}
                {user != null &&
                    <div className="control-section">

                        <IoNotificationsOutline className='notification' />

                        <FaRegHeart className='favourites' />

                        <div className="user" onClick={openCloseLogoutProfileMenu}>
                            <RxAvatar className='user-picture' />
                            <p className='user-name'>Marwan Tarek</p>

                            <div ref={logoutProfileMenuRef} className="profile-logout-menu">
                                <div className="profile">
                                    <BsFillPersonFill />
                                    <p>My Profile</p>
                                </div>
                                <div className="logout">
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
