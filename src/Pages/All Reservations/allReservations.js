import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './allReservation.css'
import axios from 'axios';
import ReservationCard from '../../Components/Reservation_Card/reservationCard';
import { Link, useLocation } from 'react-router-dom';

const AllReservations = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const typeParam = queryParams.get('type')

    const filterRef = useRef(null)

    const [fromPrice, setFromPrice] = useState('')
    const [toPrice, setToPrice] = useState('')
    const [type, setType] = useState('')
    const [rate, setRate] = useState('')

    const [allReservations, setAllReservations] = useState([])
    const [showedData, setShowedData] = useState([])

    const getAllReservations = () => {
        axios.get("https://hotel-app-backend-zztv.onrender.com/allreservations")
            .then(reseponse => {
                setAllReservations(reseponse.data)
                setShowedData(reseponse.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const openCloseFilterMenu = () => {
        filterRef.current.classList.toggle('open')
    }

    const currencyFormat = (num) => {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const clearRadioButtons = (name) => {
        var ele = document.getElementsByName(name);
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;
    }

    const handleFilter = () => {
        axios.defaults.withCredentials = true

        axios.post('https://hotel-app-backend-zztv.onrender.com/filter', { fromPrice: currencyFormat(fromPrice), toPrice: currencyFormat(toPrice), type: type, rate: rate })
            .then(response => {
                setAllReservations(response.data)
                setShowedData(response.data)
            })
    }

    const handleClearFilter = () => {
        setFromPrice('')
        setToPrice('')
        setType('')
        setRate('')
        clearRadioButtons("reservation-type")
        clearRadioButtons("rate")

        getAllReservations()
    }

    const handleSearch = (query) => {
        setShowedData(allReservations.filter(item => item.title.includes(query)))
    }

    const checkRadioButton = (id)=>{
        let btn = document.getElementById(id)
        btn.checked = true
    }

    useEffect(() => {
        if (typeParam) {

            axios.defaults.withCredentials = true

            axios.post('https://hotel-app-backend-zztv.onrender.com/filter', {  type: typeParam})
                .then(response => {
                    setAllReservations(response.data)
                    setShowedData(response.data)
                })
                
            checkRadioButton(typeParam)
        }
        else {
            getAllReservations()
        }
    }, [typeParam])

    return (
        <div className='all-reservation'>
            <div ref={filterRef} className="filters">

                {/* Price Filter */}
                <div className="row-container">
                    <div className="title">Price Filter</div>
                    <AiOutlineCloseCircle onClick={openCloseFilterMenu} className='close-btn' />
                </div>
                <div className="input-container">
                    <input onChange={e => setFromPrice(e.target.value)} type="text" name="from-price" id="from-price" value={fromPrice} placeholder='Min 100$' />
                </div>
                <div className="input-container border-bottom">
                    <input onChange={e => setToPrice(e.target.value)} type="text" name="to-price" id="to-price" value={toPrice} placeholder='Max 9,999$' />
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
                <button onClick={handleFilter} className='btn-contain btn'>Filter</button>
                <button onClick={handleClearFilter} className='btn-outline'>Clear Filters</button>
            </div>

            <div className="reservations">
                <div className='row-container'>
                    <div className="input-container serach-input">
                        <input onChange={e => handleSearch(e.target.value)} type="text" name="from-price" id="from-price" placeholder='Search for your next adventure' />
                    </div>

                    <p onClick={openCloseFilterMenu} className='filter-btn'>Filters</p>
                </div>

                <div className="reservation-container">
                    {
                        showedData &&
                        showedData.map(reservation => (
                            <Link to={`/reservationPage/${reservation._id}`}>
                                <ReservationCard key={reservation._id} reservation={reservation} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default AllReservations;
