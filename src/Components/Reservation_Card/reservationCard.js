import React, { useState } from 'react';
import {AiOutlineHeart ,AiFillHeart} from 'react-icons/ai'
import {PiHeartDuotone} from 'react-icons/pi'
import './reservationCard.css'

const ReservationCard = ({reservation}) => {

    const[viewMore , setViewMore] = useState(false)
    const[isFavourite , setIsFavourite] = useState(false)
    
    const shorterDescription = (description)=>{
        return description.substring(0,240) + "..."
    }

    const handelFavouriteItem = (event , favourite) =>{
        event.preventDefault()
        event.stopPropagation()
        setIsFavourite(favourite)
    }

    return (
        <div key={reservation._id} className='reservation-card'>

            {/* Favourite Button */}
            {!isFavourite && <AiOutlineHeart onClick={(event)=>{ handelFavouriteItem(event , !isFavourite) }} className='favourite-btn' />}
            {isFavourite && <PiHeartDuotone onClick={(event)=>{ handelFavouriteItem(event , !isFavourite) }} className='favourite-btn2' />}

            <img src={reservation.images[0]} alt="hotel" className="reserv-img" />
            <div className="info-container">
                <h3 className="name">{reservation.title}</h3>
                <p className="location"> {reservation.location}</p>
                <div className="review">
                    <p className="rate">{reservation.rating}</p>
                    <p className="no-reviews">20 reviews</p>
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
                <button className="btn-contain book-btn">Book Now</button>
            </div>
        </div>
    );
}

export default ReservationCard;
