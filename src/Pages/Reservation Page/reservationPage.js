import React, { useEffect, useState } from 'react';
import Carousel from 'react-grid-carousel'
import { FaLocationDot } from 'react-icons/fa6'
import { MdLocationCity } from 'react-icons/md'
import { BiSwim } from 'react-icons/bi'
import { BiWifi } from 'react-icons/bi'
import { PiChair } from 'react-icons/pi'
import { MdOutlineBalcony } from 'react-icons/md'
import { BsSnow3 } from 'react-icons/bs'
import { Tb24Hours } from 'react-icons/tb'
import { AiOutlineCheck } from 'react-icons/ai'
import { TbIroningSteam } from 'react-icons/tb'
import { LuBath } from 'react-icons/lu'

import { FaSpa } from 'react-icons/fa'
import { FaHotTub } from 'react-icons/fa'
import { MdFitnessCenter } from 'react-icons/md'
import { TbMassage } from 'react-icons/tb'
import { LuConciergeBell } from 'react-icons/lu'
import { MdFamilyRestroom } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'

import './reservationPage.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Carousel as ReviewSlider } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useAuth } from '../../Components/Authorization/auth';
import { Store } from 'react-notifications-component';
import SuccessPopup from '../../Components/Success_Popup/successPopup';
import { useRef } from 'react';
import CancelPopup from '../../Components/Cancel_Popup/cancelPopup';


const ReservationPage = () => {

    const user = useAuth().user // user data
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const { id } = useParams()

    let popupRef = useRef(null)
    let CancelpopupRef = useRef(null)

    const [reservation, setReservation] = useState({})
    const [reviewBody, setReviewBody] = useState('')
    const [isFavourite, setIsFavourite] = useState(false)
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    const notification = {
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

    const responsiveLayout = [
        {
            breakpoint: 1200,
            cols: 2,
            rows: 1,
        },
        {
            breakpoint: 2200,
            cols: 3,
            rows: 1,
        }
    ]

    const propertyHighlightsIcons = [
        <MdLocationCity />,
        <BiSwim />,
        <BiWifi />,
        <PiChair />,
        <MdOutlineBalcony />,
        <LuBath />,
        <BsSnow3 />,
        <Tb24Hours />,
        <AiOutlineCheck />,
        <TbIroningSteam />
    ]

    const facilitiesIcons = [
        <BiSwim />,
        <FaSpa />,
        <LuBath />,
        <FaHotTub />,
        <MdFitnessCenter />,
        <TbMassage />,
        <LuConciergeBell />,
        <BsSnow3 />,
        <MdFamilyRestroom />,
        <PiChair />
    ]

    const MyDot = ({ isActive }) => (
        <span
            style={{
                display: 'inline-block',
                height: isActive ? '8px' : '8px',
                width: isActive ? '16px' : '8px',
                borderRadius: isActive ? '10px' : '50%',
                background: '#1890ff',
                marginTop: '16px'
            }}
        ></span>
    )

    const handleAddReview = () => {
        if (!localStorage.getItem("token")) {
            navigate('/login', { state: { path: location.pathname } })
            return
        }

        if (reviewBody == '') {
            Store.addNotification({
                ...notification,
                message: "Please enter a review"
            });

            return
        }

        axios.defaults.withCredentials = true
        axios.post(`http://localhost:3000/addreview/${reservation._id}`, { reviewBody: reviewBody }, { headers: { "auth-token": localStorage.getItem("token") } })
            .then(response => {
                setReservation(response.data)
                setReviewBody('')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const addToFavourite = () => {
        if (!localStorage.getItem("token")) {
            navigate('/login', { state: { path: location.pathname } })
            return
        }

        axios.defaults.withCredentials = true

        axios.post(`http://localhost:3000/addtofavorite/${reservation._id}`, {}, { headers: { "auth-token": localStorage.getItem("token") } })
            .catch(error => {
                console.log(error)
            })
    }

    const removeFromFavourite = () => {

        axios.defaults.withCredentials = true

        axios.post(`http://localhost:3000/removefromfavorite/${reservation._id}`, {}, { headers: { "auth-token": localStorage.getItem("token") } })
            .then(response => {
                auth.updateUserData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const checkDates = () => {
        let from = new Date(fromDate).getTime()
        let to = new Date(toDate).getTime()

        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        let date = year + "-" + month + "-" + day

        let current = new Date(date).getTime()

        if (from < current || to < current) return "Please enter a date in the future"
        else if (to < from) return "Start date must be before End date"
        else {
            return "success"
        }
    }
    const handleUserReserve = () => {

        if (!localStorage.getItem("token")) {
            navigate('/login', { state: { path: location.pathname } })
            return
        }

        if (fromDate === '' || toDate === '') {
            Store.addNotification({
                ...notification,
                message: "Please enter a date"
            });

            return;
        }

        let message = checkDates()
        if (message !== 'success') {
            Store.addNotification({
                ...notification,
                message: message
            });

            return;
        }

        axios.defaults.withCredentials = true
        axios.post(`http://localhost:3000/userreservation/${id}`, { from: fromDate, to: toDate }, { headers: { "auth-token": localStorage.getItem("token") } })
            .then(response => {
                openClosePopup()
                auth.updateUserData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleCancelReservation = ()=>{
        axios.defaults.withCredentials = true
        axios.post(`http://localhost:3000/cancelresrvation/${id}`, {}, { headers: { "auth-token": localStorage.getItem("token") } })
            .then(response => {
                auth.updateUserData(response.data)
                openCloseCancelPopup()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const openCloseCancelPopup = () => {
        CancelpopupRef.current.openClosePopup()
    }

    const checkIsFavorite = (id) => {
        let favorite = user.favorite.filter(reservation => reservation._id == id)

        setIsFavourite(favorite.length > 0)
    }

    const bookBtn = (fromDate, toDate) => {
        let from = new Date(fromDate).getTime()
        let to = new Date(toDate).getTime()

        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        month = month < 10 ? '0' + month : month
        let day = dateObj.getUTCDate();
        day = day < 10 ? '0' + day : day
        let year = dateObj.getUTCFullYear();

        let date = year + "-" + month + "-" + day

        let current = new Date(date).getTime()

        if (current < from)
            return <button onClick={openCloseCancelPopup} className="btn-contain book-btn cancel">Cancel</button>
        else if (current < to)
            return <button className="btn-contain book-btn in-progress">In Progress</button>
        else
            return <button onClick={handleUserReserve} className='btn-contain'>Reserve</button>
    }

    // check if user has this reservation
    const isUserHasReservation = () => {
        let userReservation = user ? user.reservations.filter(reservation => reservation.reservationId._id === id) : []

        let size = userReservation.length

        if (size > 0) {
            return bookBtn(userReservation[size - 1].from, userReservation[size - 1].to)
        }
        else {
            return <button onClick={handleUserReserve} className='btn-contain'>Reserve</button>
        }
    }

    const openClosePopup = () => {
        popupRef.current.openClosePopup()
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/getreservationdetails/${id}`)
            .then(response => {
                setReservation(response.data[0])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        if (user != null) checkIsFavorite(id)
    }, [user])

    return (

        <div className='reservation-page'>

            {/* Popup */}
            <SuccessPopup ref={popupRef} />
            <CancelPopup ref={CancelpopupRef} handleCancelReservation = {handleCancelReservation} />

            {/* Title & Location */}
            <h2 className="title">{reservation.title}</h2>

            <div className="location">
                <FaLocationDot />
                <p>{reservation.location}</p>
            </div>

            {/* Rating & Number of reviews & price */}
            <div className='price-review-container'>
                <div className="review">
                    <p className="rate">{reservation.rating}</p>
                    {reservation.reviews && <p className="no-reviews">{reservation.reviews.length} reviews</p>}
                </div>

                <p className='price'>{reservation.price} $ / day</p>
            </div>



            {/* Images Slider */}
            {reservation.images &&
                <div className="img-slider">
                    <Carousel responsiveLayout={responsiveLayout} dot={MyDot} showDots={true} cols={3} rows={1} gap={10}>
                        {
                            reservation.images.map((img, index) => (
                                <Carousel.Item key={index} >
                                    <img src={img} alt="" />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </div>}

            {/* Property Highlights Section */}
            {reservation.propertyHighlights &&
                <div className="property-highlights">
                    <h2 className="section-title">Property Highlights</h2>
                    <div className="property-container">
                        {
                            reservation.propertyHighlights.map((property, index) => (
                                <div className="property-item" key={index} >
                                    {propertyHighlightsIcons[index]}
                                    <p>{property}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>}

            {/* Description Section */}
            {reservation.description &&
                <div className="description">
                    {
                        reservation.description[0] && <h3 className='desc-title'>{reservation.description[0]}</h3>
                    }
                    <div>
                        <p className='desc-content'>
                            {reservation.description[1]}
                        </p>
                    </div>
                </div>
            }

            {/* Facilities Section */}
            {reservation.facilities &&
                <div className="facilities">
                    <h3 className='facilities-title'>Most popular facilities</h3>
                    <div className="facilities-container">
                        {
                            reservation.facilities.map((facility, index) => (
                                <div className="facilities-item" key={index} >
                                    {facilitiesIcons[index]}
                                    <p>{facility}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>}

            {/* Reservation Period */}
            <div className="reserveation-period">
                <h3 className="period-title">Booking period</h3>
                <div className='date-group'>
                    <div className="input-container">
                        <label htmlFor="from-date">From</label>
                        <input onChange={e => setFromDate(e.target.value)} type="date" name="from-date" id="from-date" value={fromDate} placeholder='from' />
                    </div>
                    <div className="input-container">
                        <label htmlFor="to-date">To</label>
                        <input onChange={e => setToDate(e.target.value)} type="date" name="to-date" id="to-date" value={toDate} placeholder='to' />
                    </div>
                </div>
            </div>

            {/* Reserve & Save to favorite Buttons */}
            <div className="btns-container">
                {isUserHasReservation()}
                {!isFavourite && <button onClick={() => { setIsFavourite(!isFavourite); addToFavourite() }} className='btn-contain save-btn'>Save to favourite</button>}
                {isFavourite && <button onClick={() => { setIsFavourite(!isFavourite); removeFromFavourite() }} className='btn-contain save-btn'>Remove from favourite</button>}
            </div>

            {/* Review Sections */}
            <div className="reviews">
                <h2 className="section-title">Reviews</h2>

                {reservation.reviews && <div className="reviews-container">
                    <ReviewSlider
                        showIndicators={false}
                        showStatus={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        showThumbs={false}
                    >
                        {reservation.reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <p className='review-date'>{new Date(review.datePost).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <RxAvatar className='avatar' />
                                <p className='user-name'>{review.userId.firstName} {review.userId.lastName}</p>

                                <p className='review-content'><BiSolidQuoteAltLeft /> {review.reviewBody} <BiSolidQuoteAltRight /></p>

                            </div>
                        ))}
                    </ReviewSlider>
                </div>}

                <textarea onChange={(e) => { setReviewBody(e.target.value) }} name="review-body" id="review-body" cols="45" rows="5" placeholder='Write your review here' value={reviewBody}></textarea>
                <button onClick={handleAddReview} className='btn-contain btn-add-review'>Add Review</button>
            </div>
        </div >

    );
}

export default ReservationPage;