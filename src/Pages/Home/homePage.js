import React, { useEffect, useState } from 'react';
import './home.css'
import ReservationCard from '../../Components/Reservation_Card/reservationCard';
import ReactLoading from 'react-loading';
import plane from '../../Imgs/plane.png'
import places from '../../Imgs/places.png'
import dest1 from '../../Imgs/dest1.jpg'
import dest2 from '../../Imgs/dest2.jpg'
import dest3 from '../../Imgs/dest3.jpg'
import dest4 from '../../Imgs/dest4.jpeg'
import dest5 from '../../Imgs/dest5.jpg'
import saFlage from '../../Imgs/sa-flag.png'
import uaeFlage from '../../Imgs/uae-flag.png'
import engFlage from '../../Imgs/engFlag.png'
import frFlage from '../../Imgs/frFlag.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App';


const Home = () => {
    const [hotels, setHotels] = useState([])
    const [apartments, setApartments] = useState([])

    const user = useContext(userContext)

    //Fetch Data
    useEffect(() => {
        axios.defaults.withCredentials = true
        axios.get("http://localhost:3000/hotels", { params: { len: 4 } })
            .then(response => {
                setHotels(response.data)
            })
            .catch(error => {
                console.log(error)
            })

        axios.get("http://localhost:3000/appartments", { params: { len: 4 } })
            .then(response => {
                setApartments(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const checkIsFavorite = (id) => {
        let favorite = user.favorite.filter(reservation => reservation._id == id)

        return favorite.length > 0;
    }

    return (
        <>
            {user == null &&

                <ReactLoading type={'spin'} color='#003b95' width='100px' className='loading'/>
            }
            {user != null && <div className='home'>

                {/* Landing Section */}
                <div className="landing">
                    <div className='content'>
                        <h2>Discover The Best Of The World</h2>
                        <h3>Let’s Book Your Next Adventure</h3>
                        <div className='feature'>
                            <p>Esay</p>
                            <p>.</p>
                            <p>Fast</p>
                            <p>.</p>
                            <p>Comfortable</p>
                        </div>
                    </div>
                    <div className="photos">
                        <img className='plane-ph' src={plane} alt="plane" />
                        <img className='places-ph' src={places} alt="places" />
                    </div>
                </div>

                {/* Trending Destination */}
                <div className='trending-destination-section'>
                    <h2 className='title'>Trending Destinations</h2>
                    <div className="destinations-container">
                        <div className="destination-first-row">
                            <div className="destination-item">
                                <img src={dest1} alt="" className="destination-img" />
                                <div className="destination-name">
                                    <p>Riyadh</p>
                                    <img src={saFlage} alt="" />
                                </div>
                            </div>
                            <div className="destination-item">
                                <img src={dest2} alt="" className="destination-img" />
                                <div className="destination-name">
                                    <p>Dubai</p>
                                    <img src={uaeFlage} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="destination-second-row">
                            <div className="destination-item">
                                <img src={dest3} alt="" className="destination-img" />
                                <div className="destination-name">
                                    <p>Makkah</p>
                                    <img src={saFlage} alt="" />
                                </div>
                            </div>
                            <div className="destination-item">
                                <img src={dest4} alt="" className="destination-img" />
                                <div className="destination-name">
                                    <p>London</p>
                                    <img src={engFlage} width={24} height={16} alt="" />
                                </div>
                            </div>
                            <div className="destination-item">
                                <img src={dest5} alt="" className="destination-img" />
                                <div className="destination-name">
                                    <p>Paris</p>
                                    <img src={frFlage} width={24} height={16} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hotels Section */}
                <div className="hotels-section">
                    <h2 className="title">Hotels</h2>
                    <div className="hotels-container">
                        <Link to={'/allReservations'}><p className="view-all">View All</p></Link>
                        <div className="hotel-items">
                            {
                                hotels.map(hotel => (
                                    <Link to={`/reservationPage/${hotel._id}`} key={hotel._id}>
                                        <ReservationCard reservation={hotel} Isfavourite={checkIsFavorite(hotel._id)} />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Apartment Section */}
                <div className="apartments-section">
                    <h2 className="title">Apartments</h2>
                    <div className="apartments-container">
                        <Link to={'/allReservations'}><p className="view-all">View All</p></Link>
                        <div className="apartment-items">
                            {
                                apartments.map(apartment => (
                                    <Link to={`/reservationPage/${apartment._id}`} key={apartment._id}>
                                        <ReservationCard reservation={apartment} Isfavourite={checkIsFavorite(apartment._id)} />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Email Subscription Section */}
                <div className='email-sub-section'>
                    <h2>Save time, save money!</h2>
                    <p>Sign up and we'll send the best deals to you</p>
                    <div className="input-container">
                        <input type="email" name="email" id="email" placeholder='Your email address' />
                        <button className="btn-contain subscribe-btn">Subscribe</button>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Home;
