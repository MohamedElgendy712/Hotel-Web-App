import React from 'react';
import {HiOutlineMail , HiOutlinePhone} from 'react-icons/hi'
import {LiaBirthdayCakeSolid} from 'react-icons/lia'

import './user_profile.css'
import avatar from '../../Imgs/user.png'


const UserProfile = () => {
    return (
        <div className='user-profile'>

            {/* User Information (Photo , name , email , etc..) */}

            <div className="user-info">
                <div className="profile-picture">
                    <img src={avatar} alt="avatar" />
                    <p className="name">Marwan Tarek</p>
                </div>
                <div className="info">
                    <div className="info-item">
                        <HiOutlineMail />
                        <p>marwantarek852@gmail.com</p>
                    </div>
                    <div className="info-item">
                        <HiOutlinePhone />
                        <p>(+02) 123456789</p>
                    </div>
                    <div className="info-item">
                        <LiaBirthdayCakeSolid />
                        <p>7 / 12 / 1998</p>
                    </div>
                </div>
            </div>

            {/* User's reservations */}

            <div className="reservations">
                <div className="confirmed-reservation">
                    <div>
                        <h2 className="title">Booked Travels</h2>
                        <p>view more</p>
                    </div>
                    <div className="reservations-container">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
