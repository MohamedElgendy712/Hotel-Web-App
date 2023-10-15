import React, { useState } from 'react';
import {AiOutlineHeart ,AiFillHeart} from 'react-icons/ai'
import {PiHeartDuotone} from 'react-icons/pi'
import './reservationCard.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../Authorization/auth';
import { useNavigate } from 'react-router-dom';

const ReservationCard = ({reservation , Isfavourite , bookStatus}) => {

    const auth = useAuth()
    const user = auth.user

    const navigate = useNavigate()

    const[viewMore , setViewMore] = useState(false)
    const[isFavourite , setIsFavourite] = useState(false)
    
    const shorterDescription = (description)=>{
        return description.substring(0,240) + "..."
    }

    const handelFavouriteItem = (event , favourite) =>{
        if(!user) navigate('/login')

        // to disabel the event from propagating to the parent element
        event.preventDefault()
        event.stopPropagation()

        setIsFavourite(favourite)
    }

    const addToFavourite = (event)=>{
        if(!localStorage.getItem("token")) navigate('/login')
        
        // to disabel the event from propagating to the parent element
        event.preventDefault()
        event.stopPropagation()

        console.log("in")

        axios.defaults.withCredentials = true

        axios.post(`http://localhost:3000/addtofavorite/${reservation._id}`,{},{headers : {"auth-token": localStorage.getItem("token")}})
        .then(response =>{
            auth.updateUserData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const removeFromFavourite = (event)=>{

        // to disabel the event from propagating to the parent element
        event.preventDefault()
        event.stopPropagation()

        axios.defaults.withCredentials = true

        axios.post(`http://localhost:3000/removefromfavorite/${reservation._id}`,{},{headers : {"auth-token": localStorage.getItem("token")}})
        .then(response => {
            auth.updateUserData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        setIsFavourite(Isfavourite)
    }, [])

    return (
        <div key={reservation._id} className='reservation-card'>

            {/* Favourite Button */}
            {!isFavourite && <AiOutlineHeart onClick={(event)=>{ handelFavouriteItem(event , !isFavourite); addToFavourite(event) }} className='favourite-btn' />}
            {isFavourite && <PiHeartDuotone onClick={(event)=>{ handelFavouriteItem(event , !isFavourite); removeFromFavourite(event) }} className='favourite-btn2' />}

            {/* Reservation Data */}
            <img src={reservation.images[0]} alt="hotel" className="reserv-img" />
            <div className="info-container">
                <h3 className="name">{reservation.title}</h3>
                <p className="location"> {reservation.location}</p>
                <div className="review">
                    <p className="rate">{reservation.rating}</p>
                    {reservation.reviews && reservation.reviews.length > 0 && <p className="no-reviews">{reservation.reviews.length} reviews</p>}
                </div>
                <p className="description">
                    {
                        !viewMore && 
                                <>
                                    {shorterDescription(reservation.description[1])}
                                    <span className='view-more-less-btn' onClick={()=> setViewMore(true)}>more</span>
                                </>
                    }
                    {
                        viewMore &&
                            <>
                                {reservation.description}
                                <span className='view-more-less-btn' onClick={()=> setViewMore(false)}>less</span>
                            </>
                    }
                </p>
                {bookStatus === 'Book Again' && <button className="btn-contain book-btn">{bookStatus}</button>}
                {bookStatus === 'In Progress' && <button className="btn-contain book-btn in-progress">{bookStatus}</button>}
                {bookStatus === 'Cancel' && <button className="btn-contain book-btn cancel">{bookStatus}</button>}
                {bookStatus == null && <button className="btn-contain book-btn">View</button>}
            </div>
        </div>
    );
}

export default ReservationCard;
