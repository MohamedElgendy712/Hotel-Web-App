import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './allReservation.css'
import axios from 'axios';
import ReservationCard from '../../Components/Reservation_Card/reservationCard';

const AllReservations = () => {

    const filterRef = useRef(null)

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [fromPrice, setFromPrice] = useState('')
    const [toPrice, setToPrice] = useState('')
    const [type, setType] = useState('')
    const [rate, setRate] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const [allReservations, setAllReservations] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/allreservations")
            .then(reseponse => {
                setAllReservations(reseponse.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const openCloseFilterMenu = () => {
        filterRef.current.classList.toggle('open')
    }

    return (
        <div className='all-reservation'>
            <div ref={filterRef} className="filters">

                {/* Date Filter */}
                <div className="row-container">
                    <div className="title">Date Filter</div>
                    <AiOutlineCloseCircle onClick={openCloseFilterMenu} className='close-btn' />
                </div>
                <div className="input-container">
                    <label htmlFor="from-date">From</label>
                    <input onChange={e => setFromDate(e.target.value)} type="date" name="from-date" id="from-date" value={fromDate} placeholder='From Date' />
                </div>
                <div className="input-container border-bottom">
                    <label htmlFor="birth-date">To</label>
                    <input onChange={e => setToDate(e.target.value)} type="date" name="to-date" id="to-date" value={toDate} />
                </div>

                {/* Price Filter */}
                <div className="title">Price Filter</div>
                <div className="input-container">
                    <input onChange={e => setFromPrice(e.target.value)} type="text" name="from-price" id="from-price" value={fromPrice} placeholder='From' />
                </div>
                <div className="input-container border-bottom">
                    <input onChange={e => setToPrice(e.target.value)} type="text" name="to-price" id="to-price" value={toPrice} placeholder='to' />
                </div>

                {/* Type Filter */}
                <div className="title">Type Filter</div>
                <div className="input-radio-container border-bottom">
                    <div className="radio-item">
                        <input onChange={e => setType(e.target.value)} type="radio" id='hotel' name='reservation-type' value="hotel" />
                        <label htmlFor="hotel">Hotel</label>
                    </div>
                    <div className="radio-item">
                        <input onChange={e => setType(e.target.value)} type="radio" id='apartment' name='reservation-type' value="apartment" />
                        <label htmlFor="apartment">Apartment</label>
                    </div>
                </div>

                {/* Rate Filter */}
                <div className="title">Rate Filter</div>
                <div className="input-radio-container border-bottom">
                    <div className="radio-item">
                        <input onChange={e => setRate(e.target.value)} type="radio" id='+9' name='rate' value="9" />
                        <label htmlFor="+9">Superb: 9+</label>
                    </div>
                    <div className="radio-item">
                        <input onChange={e => setRate(e.target.value)} type="radio" id='+8' name='rate' value="8" />
                        <label htmlFor="+8">Very good: 8+</label>
                    </div>
                    <div className="radio-item">
                        <input onChange={e => setRate(e.target.value)} type="radio" id='+7' name='rate' value="7" />
                        <label htmlFor="+7">Good: 7+</label>
                    </div>
                    <div className="radio-item">
                        <input onChange={e => setRate(e.target.value)} type="radio" id='+6' name='rate' value="6" />
                        <label htmlFor="+6">Pleasant: 6+</label>
                    </div>
                </div>


                {/* Filter Buttons */}
                <button className='btn-contain'>Filter</button>
                <button className='btn-outline'>Clear Filters</button>
            </div>

            <div className="reservations">
                <div className='row-container'>
                    <div className="input-container serach-input">
                        <input onChange={e => setSearchValue(e.target.value)} type="text" name="from-price" id="from-price" value={searchValue} placeholder='Search for your next adventure' />
                    </div>

                    <p onClick={openCloseFilterMenu} className='filter-btn'>Filters</p>
                </div>

                <div className="reservation-container">
                    {
                        allReservations &&
                        allReservations.map(reservation => (
                            <ReservationCard key={reservation._id} reservation={reservation} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default AllReservations;
