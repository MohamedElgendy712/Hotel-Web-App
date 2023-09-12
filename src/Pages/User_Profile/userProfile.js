import React from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import Carousel from 'react-grid-carousel'

import './user_profile.css'
import avatar from '../../Imgs/user.png'
import ReservationCard from '../../Components/Reservation_Card/reservationCard';


const UserProfile = () => {

    const responsiveLayout = [
        {
            breakpoint: 950,
            cols: 1,
            rows: 1,
        },
        {
            breakpoint: 1200,
            cols: 2,
            rows: 1,
        },
        {
            breakpoint: 2200,
            cols: 3,
            rows: 1,
        },
    ]

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

            <div className='user-reservations'>
                {/* User's reservations */}

                <div className="reservations">
                    <div className="confirmed-reservation">

                        <div className='section-header'>
                            <h2 className="title">Reservations</h2>
                            <p className='view-all-btn'>view all</p>
                        </div>
                        <div className="reservations-container">
                            <Carousel responsiveLayout={responsiveLayout} cols={3} rows={1} gap={0}>


                            </Carousel>
                        </div>
                    </div>
                </div>

                {/* User's favourites */}
                <div className="favourites">
                    <div className="confirmed-reservation">

                        <div className='section-header'>
                            <h2 className="title">Favourites</h2>
                            <p className='view-all-btn'>view all</p>
                        </div>
                        <div className="reservations-container">
                            <Carousel responsiveLayout={responsiveLayout} cols={3} rows={1} gap={0}>


                            </Carousel>
                        </div>
                    </div>
                </div>

                {/* User's recomnmended */}
                <div className="recommended">
                    <div className="confirmed-reservation">

                        <div className='section-header'>
                            <h2 className="title">Recommended For You</h2>
                            <p className='view-all-btn'>view all</p>
                        </div>
                        <div className="reservations-container">
                            <Carousel responsiveLayout={responsiveLayout} cols={3} rows={1} gap={0}>


                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default UserProfile;
