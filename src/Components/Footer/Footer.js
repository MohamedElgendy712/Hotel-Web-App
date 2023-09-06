import React from 'react';
import {TiSocialFacebook} from 'react-icons/ti'
import {TiSocialInstagram} from 'react-icons/ti'
import {TiSocialTwitter} from 'react-icons/ti'

import './footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="info-links">
                <p>Countries</p>
                <p>Regions</p>
                <p>Cities</p>
                <p>Districts</p>
                <p>Airports</p>
            </div>
            <div className="reservation-links">
                <p>Hotels</p>
                <p>Apartments</p>
                <p>Villas</p>
                <p>Resorts</p>
            </div>
            <div className="support-links">
                <p>Contact Us</p>
                <p>Support</p>
                <p>Call Us (+02) 123456789</p>
                <p>Frequently Q & A</p>
            </div>
            <div className="social-media">
                <TiSocialFacebook />
                <TiSocialInstagram />
                <TiSocialTwitter />
            </div>

        </div>
    );
}

export default Footer;
