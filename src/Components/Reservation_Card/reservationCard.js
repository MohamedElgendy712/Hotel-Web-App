import React, { useState } from 'react';
import hotel from '../../Imgs/hotel.jpg'
import './reservationCard.css'

const ReservationCard = () => {

    const[viewMore , setViewMore] = useState(false)

    const description = "Located in Destin, 90 metres from Miramar Beach and 2.8 km from James Lee Park Public Beach, Majestic Sun 202B offers air conditioning. Featuring sea and lake views, this holiday home also provides guests with free WiFi. Featuring a DVD player, the holiday home has a kitchen with a dishwasher, an oven and a microwave, a living room with a seating area and a dining area, 2 bedrooms, and 2 bathrooms with a bath and a shower. Towels and bed linen are featured in the holiday home."
    
    const shorterDescription = (description)=>{
        return description.substring(0,300) + "..."
    }
    return (
        <div className='reservation-card'>

            <img src={hotel} alt="hotel" className="reserv-img" />
            <div className="info-container">
                <h3 className="name">Majestic Sun</h3>
                <p className="location"> Destin, 32550, United States</p>
                <div className="review">
                    <p className="rate">9.5</p>
                    <p className="no-reviews">20 reviews</p>
                </div>
                <p className="description">
                    {
                        !viewMore && 
                                <>
                                    {shorterDescription(description)}
                                    <span className='view-more-less-btn' onClick={()=> setViewMore(true)}>more</span>
                                </>
                    }
                    {
                        viewMore &&
                            <>
                                {description}
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
