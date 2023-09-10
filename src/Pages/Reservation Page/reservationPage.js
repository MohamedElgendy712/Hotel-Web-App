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


import './reservationPage.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReservationPage = () => {

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

    const { id } = useParams()

    const [reservation, setReservation] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:3000/getreservationdetails/${id}`)
            .then(response => {
                setReservation(response.data[0])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className='reservation-page'>

            {/* Title & Location */}
            <h2 className="title">{reservation.title}</h2>

            <div className="location">
                <FaLocationDot />
                <p>{reservation.location}</p>
            </div>

            {/* Ration & Number of reviews & price */}
            <div className='price-review-container'>
                <div className="review">
                    <p className="rate">{reservation.rating}</p>
                    {reservation.review && <p className="no-reviews">{reservation.review.length} reviews</p>}
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

            <div className="btns-container">
                <button className='btn-contain'>Reserve</button>
                <button className='btn-contain save-btn'>Save to favourite</button>
            </div>
        </div >
    );
}

export default ReservationPage;

