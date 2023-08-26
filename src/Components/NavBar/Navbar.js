import React, { useRef } from 'react';
import UseAnimations from "react-useanimations";
import menu2 from 'react-useanimations/lib/menu2';
import './navbar.css'

const Navbar = () => {

    const menuRef = useRef(null) 

    const openCloaseMenu = () =>{
        menuRef.current.classList.toggle('open')
    }
    return (
        
        <div className='navbar'>
            <div className="logo-container">
                {/* <img className='logo' src="" alt="logo" /> */}
                <p className="logo">Logo</p>
            </div>

            <UseAnimations onClick={openCloaseMenu} className='menu-icon' animation={menu2} strokeColor='white' size={32} />

            <div ref={menuRef} className="navbar-content">
                <ul className="navbar-list">
                    <li className="navbar-list-item">
                        <a href="">
                            Home
                        </a>
                    </li>
                    <li className="navbar-list-item">
                        <a href="">
                            Services
                        </a>
                    </li>
                    <li className="navbar-list-item">
                        <a href="">
                            About Us
                        </a>
                    </li>
                    <li className="navbar-list-item">
                        <a href="">
                            Contact Us
                        </a>
                    </li>
                </ul>

                <div className='navbar-btns'>
                    <button className='login-btn'>Log In</button>
                    <button className='register-btn'>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
