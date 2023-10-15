import React, { Component } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './cancelPopup.css'

class CancelPopup extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    openClosePopup = () => {
        this.myRef.current.classList.toggle("open-popup")
    }

    render() {
        return (
            <div ref={this.myRef} className='popup-container'>
                <div className="popup">
                    <AiOutlineCloseCircle onClick={this.openClosePopup} className='close-btn' />
                    <p className='content'>Are you sure you want to cancel your reservation? </p>
                    <button onClick={this.props.handleCancelReservation} className='btn-contain cancel-btn'>Cancel</button>
                </div>
            </div>
        );
    }
}

export default CancelPopup;
