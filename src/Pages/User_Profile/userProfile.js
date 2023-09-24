import React, { useContext } from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import Carousel from 'react-grid-carousel'
import ReactLoading from 'react-loading';
import './user_profile.css'
import avatar from '../../Imgs/user.png'
import ReservationCard from '../../Components/Reservation_Card/reservationCard';
import { userContext } from '../../App';


const UserProfile = () => {

    const user = useContext(userContext)

    const responsiveLayout = [
        {
            breakpoint: 950,
            cols: 1,
            rows: 1,
        },
        {
            breakpoint: 1300,
            cols: 1,
            rows: 1,
        },
        {
            breakpoint: 2200,
            cols: 2,
            rows: 1,
        },
    ]


    const checkIsFavorite = (id) => {
        let favorite = user.favorite.filter(reservation => reservation._id === id)

        return favorite.length > 0;
    }

    return (
        <>
            {
                user === null &&
                <ReactLoading type={'spin'} color='#003b95' width='100px' className='loading' />
            }
            {
                user !== null &&
                <div className='user-profile'>

                    {/* User Information (Photo , name , email , etc..) */}

                    <div className="user-info">
                        <div className="profile-picture">
                            <img src={avatar} alt="avatar" />
                            {user != null && <p className="name">{user.firstName} {user.lastName}</p>}
                        </div>
                        <div className="info">
                            <div className="info-item">
                                <HiOutlineMail />
                                {user != null && <p>{user.email}</p>}
                            </div>
                            <div className="info-item">
                                <HiOutlinePhone />
                                {user != null && <p>(+02) {user.phone}</p>}
                            </div>
                            <div className="info-item">
                                <LiaBirthdayCakeSolid />
                                {user != null && <p>{user.birthDate}</p>}
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
                                    {
                                        user.reservations.length === 0 &&
                                        <p className='clarification'>Go and book your next adventure</p>
                                    }
                                    {
                                        user.reservations.length > 0 &&

                                        <Carousel responsiveLayout={responsiveLayout} cols={3} rows={1} gap={0}>
                                            {
                                                user.reservations.map(reservation => (
                                                    <Carousel.Item>
                                                        <ReservationCard reservation={reservation} Isfavourite={checkIsFavorite(reservation._id)} />
                                                    </Carousel.Item>
                                                ))
                                            }
                                        </Carousel>
                                    }
                                </div>
                            </div>
                        </div>

                        {/* User's favorites */}
                        <div className="favorites">
                            <div className="confirmed-reservation">

                                <div className='section-header'>
                                    <h2 className="title">Favourites</h2>
                                    <p className='view-all-btn'>view all</p>
                                </div>
                                <div className="reservations-container">
                                    {
                                        user.favorite.length === 0 &&
                                        <p className='clarification'>Save your favorite adventure here</p>
                                    }
                                    {
                                        user.favorite.length > 0 &&

                                        <Carousel responsiveLayout={responsiveLayout} gap={0} >
                                            {
                                                user.favorite.map(reservation => (
                                                    <Carousel.Item>
                                                        <ReservationCard reservation={reservation} Isfavourite={checkIsFavorite(reservation._id)} />
                                                    </Carousel.Item>
                                                ))
                                            }

                                        </Carousel>
                                    }
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
            }
        </>
    );
}

export default UserProfile;
