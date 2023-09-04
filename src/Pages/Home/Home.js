import React from 'react';
import './home.css'

import plane from '../../Imgs/plane.png'
import places from '../../Imgs/places.png'


const Home = () => {
    return (
        <div className='home'>
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
    );
}

export default Home;
