import React, { useEffect, useState } from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import Carousel from 'react-grid-carousel'
import ReactLoading from 'react-loading';
import './user_profile.css'
import avatar from '../../Imgs/user.png'
import ReservationCard from '../../Components/Reservation_Card/reservationCard';
import { useAuth } from '../../Components/Authorization/auth';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserProfile = () => {

    const user = useAuth().user //  user data 
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

    const [recommended, setRecommended] = useState([])

    useEffect(() => {
        axios.defaults.withCredentials = true
        axios.get("https://hotel-app-backend-zztv.onrender.com/hotels", { params: { len: 4 } })
            .then(response => {
                setRecommended(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const checkIsFavorite = (id) => {
        let favorite = user.favorite.filter(reservation => reservation._id === id)

        return favorite.length > 0;
    }

    const checkBookStatus =(fromDate , toDate)=>{
        let from = new Date(fromDate).getTime()
        let to = new Date(toDate).getTime()
        
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        month = month < 10 ? '0'+month : month
        let day = dateObj.getUTCDate();
        day = day < 10 ? '0'+day : day
        let year = dateObj.getUTCFullYear();

        let date = year + "-" + month + "-" + day

        let current = new Date(date).getTime()

        if(current < from) return "Cancel"
        else if(current > to) return "Book Again"
        else{
            return "In Progress"
        }
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
                                                        <Link to={`/reservationPage/${reservation.reservationId._id}`} key={reservation.reservationId._id} >
                                                            <ReservationCard reservation={reservation.reservationId} Isfavourite={checkIsFavorite(reservation._id)} bookStatus={checkBookStatus(reservation.from , reservation.to)} />
                                                        </Link>
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
                                                        <Link to={`/reservationPage/${reservation._id}`} key={reservation._id}>
                                                            <ReservationCard reservation={reservation} Isfavourite={checkIsFavorite(reservation._id)} />
                                                        </Link>
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
                                    <Link to={'/allReservations'}>
                                        <p className='view-all-btn'>view all</p>
                                    </Link>
                                </div>
                                <div className="reservations-container">
                                    <Carousel responsiveLayout={responsiveLayout} cols={3} rows={1} gap={0}>
                                        {recommended.map(item => (
                                            <Carousel.Item>
                                                <Link to={`/reservationPage/${item._id}`} >
                                                    <ReservationCard reservation={item} Isfavourite={checkIsFavorite(item._id)} />
                                                </Link>
                                            </Carousel.Item>
                                        ))}
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